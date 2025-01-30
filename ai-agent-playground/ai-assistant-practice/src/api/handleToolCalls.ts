import taskServices from '@/services/task.services';

async function handleToolCalls(toolCall) {
  const functionName = toolCall.function.name;
  const args = JSON.parse(toolCall.function.arguments);

  let data;

  console.log('--------------toolCall----------------------');
  console.log(toolCall);
  console.log('--------------toolCall----------------------');

  switch (functionName) {
    case 'create_task':
      data = await taskServices.create(args);
      break;
    case 'get_all_tasks':
      data = await taskServices.getAll(args);
      break;
    case 'get_single_task':
      data = await taskServices.getSingle(args.id);
      break;
    case 'update_task':
      data = await taskServices.update(args.id, args);
      break;
    case 'delete_task':
      data = await taskServices.delete(args.id);
      break;
    default:
      data = [];
      break;
  }

  return data;
}

export default handleToolCalls;
