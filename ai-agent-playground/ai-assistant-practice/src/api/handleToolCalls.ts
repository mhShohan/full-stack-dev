import taskServices from '@/services/task.services';

async function handleToolCalls(toolCall) {
  const functionName = toolCall.function.name;
  const args = JSON.parse(toolCall.function.arguments);

  console.log('--------------toolCall----------------------');
  console.log(toolCall);
  console.log('--------------toolCall----------------------');

  switch (functionName) {
    case 'create_task':
      return await taskServices.create(args.todo);
    case 'get_all_tasks':
      return await taskServices.getAll(args.todo);
    case 'get_single_task':
      return await taskServices.getSingle(args.search);
    case 'update_task':
      return await taskServices.update(args.id, args.todo);
    case 'delete_task':
      return await taskServices.delete(args.id);
    default:
      throw new Error(`Unknown function: ${functionName}`);
  }
}

export default handleToolCalls;
