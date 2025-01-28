import { model, Schema } from "mongoose";

export interface ITask {
  title: string;
  description: string;
  status: 'pending' | 'complete' | 'declined'
}

const taskSchema = new Schema<ITask>({
  title: { type: String, required: true },
  description: { type: String, required: true },
  status: { type: String, required: true, enum: ['pending', 'complete', 'declined'] }
}, { timestamps: true })

const Task = model<ITask>('Task', taskSchema)
export default Task