import config from '@/utils/config';
import OpenAI from 'openai';
import { tools } from './tools';
import handleToolCalls from './handleToolCalls';

const functionDefinitions = [
  {
    name: 'findUsers',
    description: 'Search for users in the database based on criteria',
    parameters: {
      type: 'object',
      properties: {
        name: { type: 'string', description: 'Name of the user' },
        age: { type: 'number', description: 'Age of the user' },
        email: { type: 'string', description: 'Email of the user' },
      },
    },
  },
  {
    name: 'createUser',
    description: 'Create a new user in the database',
    parameters: {
      type: 'object',
      required: ['name', 'email'],
      properties: {
        name: { type: 'string', description: 'Name of the user' },
        email: { type: 'string', description: 'Email of the user' },
        age: { type: 'number', description: 'Age of the user' },
      },
    },
  },
  {
    name: 'updateUser',
    description: 'Update an existing user in the database',
    parameters: {
      type: 'object',
      required: ['userId'],
      properties: {
        userId: { type: 'string', description: 'MongoDB _id of the user' },
        name: { type: 'string', description: 'New name of the user' },
        email: { type: 'string', description: 'New email of the user' },
        age: { type: 'number', description: 'New age of the user' },
      },
    },
  },
  {
    name: 'deleteUser',
    description: 'Delete a user from the database',
    parameters: {
      type: 'object',
      required: ['userId'],
      properties: {
        userId: { type: 'string', description: 'MongoDB _id of the user' },
      },
    },
  },
];

class AssistantAPI {
  openai: any;
  assistantId: string;

  constructor() {
    this.openai = new OpenAI({ apiKey: config.openApiKey });
    this.assistantId = config.assistantId!;
  }

  // Method to create a thread with function calling
  async createThread(userPrompt) {
    try {
      // Create thread
      const thread = await this.openai.beta.threads.create();

      // Add user message
      await this.openai.beta.threads.messages.create(thread.id, {
        role: 'user',
        content: userPrompt,
      });

      // Create run with function tools
      const run = await this.openai.beta.threads.runs.create(thread.id, {
        assistant_id: this.assistantId,
        tools: [...tools()],
      });

      return { thread, run };
    } catch (error) {
      console.error('Error creating thread:', error);
      throw error;
    }
  }

  // Method to handle function call
  async handleFunctionCall(threadId, runId) {
    try {
      // Retrieve run to check status and function calls
      const run = await this.openai.beta.threads.runs.retrieve(threadId, runId);

      console.log('run', run);
      console.log('run', run.tools);

      if (run.status === 'completed') {
        const toolCalls = run.required_action.submit_tool_calls;

        const toolOutputs = toolCalls.tool_calls.map((call) => {
          const result = handleToolCalls(call);

          return {
            tool_call_id: call.id,
            output: JSON.stringify({
              data: result,
            }),
          };
          // if (call.function.name === 'generate_image') {
          //   // Parse function arguments
          //   const args = JSON.parse(call.function.arguments);

          //   // Simulate image generation (replace with actual image generation logic)
          //   return {
          //     tool_call_id: call.id,
          //     output: JSON.stringify({
          //       image_url: `generated_image_for_${args.prompt}`,
          //       style: args.style || 'default',
          //       resolution: args.resolution || '1024x1024',
          //     }),
          //   };
          // }
        });

        // Submit tool outputs
        await this.openai.beta.threads.runs.submitToolOutputs(threadId, runId, {
          tool_outputs: toolOutputs,
        });
      }

      return run;
    } catch (error) {
      console.error('Error handling function call:', error);
      throw error;
    }
  }

  // Complete conversation method
  async generate(userPrompt) {
    const { thread, run } = await this.createThread(userPrompt);

    // Wait and check run status
    let currentRun = run;
    while (currentRun.status !== 'completed') {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      currentRun = await this.handleFunctionCall(thread.id, run.id);
    }

    // Retrieve final messages
    const messages = await this.openai.beta.threads.messages.list(thread.id);
    return messages;
  }

  async runAssistant(userInput) {
    // Create a thread
    const thread = await this.openai.beta.threads.create();
    console.log('thread created', thread);
    // Add the user's message to the thread
    const chat = await this.openai.beta.threads.messages.create(thread.id, {
      role: 'user',
      content: userInput,
    });

    console.log('chat created', chat);

    // Create a run with the assistant
    const run = await this.openai.beta.threads.runs.create(thread.id, {
      assistant_id: config.assistantId,
      tools,
    });

    console.log('run created', run);

    // Poll the run status and handle function calls
    // while (run.status !== 'completed') {
    console.log(`Run status: ${run.status}`);
    await new Promise((resolve) => setTimeout(resolve, 1000)); // Wait for 1 second
    const updatedRun = await this.openai.beta.threads.runs.retrieve(thread.id, run.id);
    while (updatedRun.status === 'queued') {
      if (updatedRun.status === 'requires_action') {
        const toolCalls = updatedRun.required_action.submit_tool_outputs.tool_calls;

        const toolOutputs: any = [];
        for (const toolCall of toolCalls) {
          const output = await handleToolCalls(toolCall);
          console.log('output', output);

          toolOutputs.push({
            tool_call_id: toolCall.id,
            output: JSON.stringify(output),
          });
        }

        // Submit the function outputs
        await this.openai.beta.threads.runs.submitToolOutputs(thread.id, run.id, {
          tool_outputs: toolOutputs,
        });
      }
    }
    // }

    // Retrieve the final result
    const messages = await this.openai.beta.threads.messages.list(thread.id);
    return messages.data[0].content;
  }

  async newAssistant(prompt) {
    // const assistant = await this.openai.beta.assistants.create({
    //   model: 'gpt-4o',
    //   instructions:
    //     'You are an assistant to database query and mutation. When user give you the prompt then understand the prompt and operate with data base',
    //   tools: tools(),
    // });

    // const thread = await this.openai.beta.threads.create({});
    // const message = await this.openai.beta.threads.messages.create(thread.id, {
    //   role: 'user',
    //   content: prompt,
    // });

    const completion = await this.openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [{ role: 'user', content: prompt }],
      tools: tools(),
      store: true,
    });

    const toolCalls = completion.choices[0].message.tool_calls;

    const result = await handleToolCalls(toolCalls[0]);

    return {
      // completion: toolCalls,
      result,
      // assistant,
      // thread,
      // message
    };
  }
}

const assistantAPI = new AssistantAPI();
export default assistantAPI;
