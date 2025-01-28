import config from "@/utils/config";
import OpenAI from 'openai';

class AssistantAPI {
  openai: any;
  assistantId: string;

  constructor() {
    this.openai = new OpenAI({ apiKey: config.openApiKey });
    this.assistantId = config.assistantId!;
  }

  // Function to generate image creation tools
  getImageGenerationTools() {
    return {
      type: 'function',
      function: {
        name: 'generate_image',
        description: 'Generate an image based on a prompt',
        parameters: {
          type: 'object',
          properties: {
            prompt: {
              type: 'string',
              description: 'Detailed description of the image to generate'
            },
            style: {
              type: 'string',
              enum: ['photorealistic', 'digital art', 'cartoon', 'sketch'],
              description: 'Optional style of the image'
            },
            resolution: {
              type: 'string',
              enum: ['1024x1024', '512x512', '256x256'],
              description: 'Image resolution'
            }
          },
          required: ['prompt']
        }
      }
    };
  }

  // Method to create a thread with function calling
  async createThread(userPrompt) {
    try {
      // Create thread
      const thread = await this.openai.beta.threads.create();

      // Add user message
      await this.openai.beta.threads.messages.create(thread.id, {
        role: 'user',
        content: userPrompt
      });

      // Create run with function tools
      const run = await this.openai.beta.threads.runs.create(thread.id, {
        assistant_id: this.assistantId,
        tools: [this.getImageGenerationTools()]
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
      const run = await this.openai.beta.threads.runs.retrieve(
        threadId,
        runId
      );

      if (run.status === 'requires_action') {
        const toolCalls = run.required_action.submit_tool_calls;

        const toolOutputs = toolCalls.tool_calls.map(call => {
          if (call.function.name === 'generate_image') {
            // Parse function arguments
            const args = JSON.parse(call.function.arguments);

            // Simulate image generation (replace with actual image generation logic)
            return {
              tool_call_id: call.id,
              output: JSON.stringify({
                image_url: `generated_image_for_${args.prompt}`,
                style: args.style || 'default',
                resolution: args.resolution || '1024x1024'
              })
            };
          }
        });

        // Submit tool outputs
        await this.openai.beta.threads.runs.submitToolOutputs(
          threadId,
          runId,
          { tool_outputs: toolOutputs }
        );
      }

      return run;
    } catch (error) {
      console.error('Error handling function call:', error);
      throw error;
    }
  }

  // Complete conversation method
  async generateImage(userPrompt) {
    const { thread, run } = await this.createThread(userPrompt);

    // Wait and check run status
    let currentRun = run;
    while (currentRun.status !== 'completed') {
      await new Promise(resolve => setTimeout(resolve, 1000));
      currentRun = await this.handleFunctionCall(thread.id, run.id);
    }

    // Retrieve final messages
    const messages = await this.openai.beta.threads.messages.list(thread.id);
    return messages;
  }
}

module.exports = AssistantAPI;

// Usage example
// async function main() {
//   const assistant = new AssistantAPI(process.env.OPENAI_API_KEY);
//   const imageMessages = await assistant.generateImage('Create a sunset over mountains');
//   console.log(imageMessages);
// }

// main().catch(console.error);