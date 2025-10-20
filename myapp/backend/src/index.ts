import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
dotenv.config()

const app = express()
app.use(cors())
app.use(express.json())

const PORT = Number(process.env.PORT) || 4000

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok' })
})

app.get('/api/greeting', (req, res) => {
  const name = (req.query.name as string) || 'world'
  res.json({ message: `Hello, ${name}!` })
})

app.listen(PORT, () => {
  console.log(`API listening on http://localhost:${PORT}`)
})
