import config from '@/utils/config';
import OpenAI from 'openai';
import { tools } from './tools';

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
        tools: [tools()],
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

      if (run.status === 'requires_action') {
        const toolCalls = run.required_action.submit_tool_calls;

        const toolOutputs = toolCalls.tool_calls.map((call) => {
          if (call.function.name === 'generate_image') {
            // Parse function arguments
            const args = JSON.parse(call.function.arguments);

            // Simulate image generation (replace with actual image generation logic)
            return {
              tool_call_id: call.id,
              output: JSON.stringify({
                image_url: `generated_image_for_${args.prompt}`,
                style: args.style || 'default',
                resolution: args.resolution || '1024x1024',
              }),
            };
          }
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
  async generateImage(userPrompt) {
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
}

module.exports = AssistantAPI;
