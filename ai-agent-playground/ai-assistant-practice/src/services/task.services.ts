import Task, { ITask } from "@/model/Task.model"

class TaskServices {

  async getAll(query: Record<string, unknown> = {}): Promise<ITask[]> {
    const tasks = await Task.find(query)
    return tasks
  }

  async getSingle(id: string): Promise<ITask> {
    const task = await Task.findById(id)
    if (!task) throw new Error("Task not found")
    return task
  }

  async create(payload: ITask) {
    const task = new Task(payload)
    await task.save()
    return task
  }

  async update(id: string, payload: Partial<ITask>) {
    const task = await Task.findByIdAndUpdate(id, payload, { new: true, runValidators: true })
    if (!task) throw new Error("Task not found")
    return task
  }

  async delete(id: string) {
    const task = await Task.findByIdAndDelete(id)
    if (!task) throw new Error("Task not found")
    return task
  }
}

const taskServices = new TaskServices()
export default taskServices