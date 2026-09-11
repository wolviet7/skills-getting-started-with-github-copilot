import { Schema, model, Document } from 'mongoose'

export interface IWorkout extends Document {
  name: string
  duration: number
  calories?: number
  date: Date
  notes?: string
  createdAt: Date
}

const WorkoutSchema = new Schema<IWorkout>({
  name: { type: String, required: true },
  duration: { type: Number, required: true },
  calories: { type: Number },
  date: { type: Date, required: true },
  notes: { type: String },
  createdAt: { type: Date, default: () => new Date() }
})

export const Workout = model<IWorkout>('Workout', WorkoutSchema)
