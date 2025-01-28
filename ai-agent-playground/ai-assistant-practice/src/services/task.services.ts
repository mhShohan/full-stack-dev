import Task, { ITask } from "@/model/Task.model"

class TaskServices {

  async getAllTasks(query: Record<string, unknown> = {}): Promise<ITask[]> {
    const tasks = await Task.find(query)
    return tasks
  }

  async getTaskById(id: string): Promise<ITask> {
    const task = await Task.findById(id)
    if (!task) throw new Error("Task not found")
    return task
  }

  async createTask(payload: ITask) {
    const task = new Task(payload)
    await task.save()
    return task
  }

  async updateTask(id: string, payload: Partial<ITask>) {
    const task = await Task.findByIdAndUpdate(id, payload, { new: true, runValidators: true })
    if (!task) throw new Error("Task not found")
    return task
  }

  async deleteTask(id: string) {
    const task = await Task.findByIdAndDelete(id)
    if (!task) throw new Error("Task not found")
    return task
  }
}

const taskServices = new TaskServices()
export default taskServices