import express from 'express'
import mongoose from 'mongoose'
import workoutsRouter from './routes/workouts'

const PORT = process.env.PORT ? Number(process.env.PORT) : 8000
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/octofit'

const app = express()
app.use(express.json())

app.get('/health', (_req, res) => res.json({ status: 'ok' }))

app.use('/api/workouts', workoutsRouter)

async function start() {
  try {
    await mongoose.connect(MONGO_URI)
    console.log('Connected to MongoDB:', MONGO_URI)
    app.listen(PORT, () => console.log(`Backend listening on http://localhost:${PORT}`))
  } catch (err) {
    console.error('Failed to start server', err)
    process.exit(1)
  }
}

start()
