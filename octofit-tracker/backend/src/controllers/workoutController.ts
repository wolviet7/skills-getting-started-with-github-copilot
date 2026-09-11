import { Request, Response } from 'express'
import * as service from '../services/workoutService'

export async function create(req: Request, res: Response) {
  try {
    const created = await service.createWorkout(req.body)
    return res.status(201).json(created)
  } catch (err) {
    console.error(err)
    return res.status(500).json({ error: 'Failed to create workout' })
  }
}

export async function list(req: Request, res: Response) {
  try {
    const limit = Math.min(Number(req.query.limit) || 50, 200)
    const skip = Number(req.query.skip) || 0
    const items = await service.listWorkouts(limit, skip)
    return res.json(items)
  } catch (err) {
    console.error(err)
    return res.status(500).json({ error: 'Failed to list workouts' })
  }
}

export async function getById(req: Request, res: Response) {
  try {
    const item = await service.getWorkoutById(req.params.id)
    if (!item) return res.status(404).json({ error: 'Not found' })
    return res.json(item)
  } catch (err) {
    console.error(err)
    return res.status(500).json({ error: 'Failed to retrieve workout' })
  }
}

export async function update(req: Request, res: Response) {
  try {
    const updated = await service.updateWorkout(req.params.id, req.body)
    if (!updated) return res.status(404).json({ error: 'Not found' })
    return res.json(updated)
  } catch (err) {
    console.error(err)
    return res.status(500).json({ error: 'Failed to update workout' })
  }
}

export async function remove(req: Request, res: Response) {
  try {
    const deleted = await service.deleteWorkout(req.params.id)
    if (!deleted) return res.status(404).json({ error: 'Not found' })
    return res.status(204).send()
  } catch (err) {
    console.error(err)
    return res.status(500).json({ error: 'Failed to delete workout' })
  }
}
