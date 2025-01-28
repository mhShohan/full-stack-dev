import OpenAI from 'openai';
import { eq, ilike } from "drizzle-orm";
import { db } from "./db/index.js";
import { todosTable } from "./db/schema.js";


const getAllTodos = async () => {
  return await db.select().from(todosTable);
};

const createTodo = async (todo) => {
  const result = await db.insert(todosTable).values({ todo });
  return result;
};

const searchTodos = async (search) => {
  return await db.select().from(todosTable).where(ilike(todosTable.todo, search));
};

const deleteTodoById = async (id) => {
  const result = await db.delete(todosTable).where(eq(todosTable.id, id));
  return result;
};




const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const openai = new OpenAI({
  apiKey: OPENAI_API_KEY, // Replace with your OpenAI API key
});

// Define the functions as tools
const tools = [
  {
    type: 'function',
    function: {
      name: 'getAllTodos',
      description: 'Retrieve all todos from the database.',
      parameters: {
        type: 'object',
        properties: {}, // No parameters needed for this function
      },
    },
  },
  {
    type: 'function',
    function: {
      name: 'createTodo',
      description: 'Create a new todo in the database.',
      parameters: {
        type: 'object',
        properties: {
          todo: {
            type: 'string',
            description: 'The todo task to be added.',
          },
        },
        required: ['todo'],
      },
    },
  },
  {
    type: 'function',
    function: {
      name: 'searchTodos',
      description: 'Search for todos based on a keyword or phrase.',
      parameters: {
        type: 'object',
        properties: {
          search: {
            type: 'string',
            description: 'The search term to look for in todos.',
          },
        },
        required: ['search'],
      },
    },
  },
  {
    type: 'function',
    function: {
      name: 'deleteTodoById',
      description: 'Delete a specific todo by its ID.',
      parameters: {
        type: 'object',
        properties: {
          id: {
            type: 'number',
            description: 'The ID of the todo to delete.',
          },
        },
        required: ['id'],
      },
    },
  },
];


async function handleFunctionCall(toolCall) {
  const functionName = toolCall.function.name;
  const args = JSON.parse(toolCall.function.arguments);

  switch (functionName) {
    case 'getAllTodos':
      return await getAllTodos();
    case 'createTodo':
      return await createTodo(args.todo);
    case 'searchTodos':
      return await searchTodos(args.search);
    case 'deleteTodoById':
      return await deleteTodoById(args.id);
    default:
      throw new Error(`Unknown function: ${functionName}`);
  }
}

async function runAssistant(userInput) {
  // Create a thread
  const thread = await openai.beta.threads.create();
  console.log('thread created', thread);
  // Add the user's message to the thread
  const chat = await openai.beta.threads.messages.create(thread.id, {
    role: 'user',
    content: userInput,
  });

  console.log('chat created', chat);

  // Create a run with the assistant
  const run = await openai.beta.threads.runs.create(thread.id, {
    assistant_id: process.env.ASSISTANT_ID,
    tools,
  });

  console.log('run created', run);

  // Poll the run status and handle function calls
  // while (run.status !== 'completed') {
  console.log(`Run status: ${run.status}`);
  await new Promise((resolve) => setTimeout(resolve, 1000)); // Wait for 1 second
  const updatedRun = await openai.beta.threads.runs.retrieve(thread.id, run.id);

  if (updatedRun.status === 'requires_action') {
    const toolCalls = updatedRun.required_action.submit_tool_outputs.tool_calls;

    const toolOutputs = [];
    for (const toolCall of toolCalls) {
      const output = await handleFunctionCall(toolCall);
      console.log('output', output);
      toolOutputs.push({
        tool_call_id: toolCall.id,
        output: JSON.stringify(output),
      });
    }

    // Submit the function outputs
    await openai.beta.threads.runs.submitToolOutputs(thread.id, run.id, {
      tool_outputs: toolOutputs,
    });
  }
  // }

  // Retrieve the final result
  const messages = await openai.beta.threads.messages.list(thread.id);
  return messages.data[0].content;
}

// Example usage
// (async () => {
//   const userInput = 'delete the todo which id is 1';
//   const result = await runAssistant(userInput);
//   console.log(result);
//   process.exit(0);
// })();

export default runAssistant;
