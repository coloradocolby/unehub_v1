require('dotenv').config()

const express = require('express')
const db = require('./db/db')
const getEnv = require('./utils/env')
const colors = require('colors')
const app = express()

/**
 * using an IIFE to ensure the database connects first
 * alternative would be connectDB().then, but we'd
 * rather use async-await
 *
 * note the semi-colon, if put here, prettier will leave it be
 */
;(async () => {
  const dbUri = process.env[`MONGO_URI${getEnv()}`]
  await db.connect(dbUri)

  // init middleware
  app.use(express.json({ extended: false }))

  app.get('/', (req, res) => res.send('API running'))

  app.use('/api/users', require('./routes/users'))
  app.use('/api/auth', require('./routes/auth'))
  app.use('/api/profile', require('./routes/profile'))

  const PORT = process.env.PORT || 8000

  app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}\n`.magenta.bold)
    app.emit('READY')
  })
})()

module.exports = app
