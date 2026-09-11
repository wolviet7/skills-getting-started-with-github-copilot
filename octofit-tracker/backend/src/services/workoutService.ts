import { Workout, IWorkout } from '../models/Workout'
import { Types } from 'mongoose'

export async function createWorkout(data: Partial<IWorkout>) {
  const workout = new Workout(data)
  return workout.save()
}

export async function listWorkouts(limit = 50, skip = 0) {
  return Workout.find().sort({ date: -1 }).limit(limit).skip(skip).exec()
}

export async function getWorkoutById(id: string) {
  if (!Types.ObjectId.isValid(id)) return null
  return Workout.findById(id).exec()
}

export async function updateWorkout(id: string, data: Partial<IWorkout>) {
  if (!Types.ObjectId.isValid(id)) return null
  return Workout.findByIdAndUpdate(id, data, { new: true }).exec()
}

export async function deleteWorkout(id: string) {
  if (!Types.ObjectId.isValid(id)) return null
  return Workout.findByIdAndDelete(id).exec()
}
