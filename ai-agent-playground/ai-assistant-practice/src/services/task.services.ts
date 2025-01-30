import Task, { ITask } from '@/model/Task.model';

class TaskServices {
  async getAll(query: Record<string, unknown> = {}): Promise<ITask[]> {
    const queryParams: any = {};

    if (query.title) {
      queryParams.title = { $regex: query.title, $options: 'i' };
    }

    if (query.id) {
      queryParams._id = query.id;
    }

    if (query.status) {
      queryParams.status = query.status;
    }

    console.log(queryParams);

    const tasks = await Task.find(queryParams);
    return tasks;
  }

  async getSingle(id: string): Promise<ITask> {
    const task = await Task.findById(id);
    if (!task) throw new Error('Task not found');
    return task;
  }

  async create(payload: ITask) {
    const task = new Task(payload);
    await task.save();
    return task;
  }

  async update(id: string, payload: Partial<ITask & { id: string }>) {
    delete payload.id;

    const task = await Task.findByIdAndUpdate(id, payload, { new: true, runValidators: true });
    if (!task) throw new Error('Task not found');
    return task;
  }

  async delete(id: string) {
    const task = await Task.findByIdAndDelete(id);
    if (!task) throw new Error('Task not found');
    return task;
  }
}

const taskServices = new TaskServices();
export default taskServices;
