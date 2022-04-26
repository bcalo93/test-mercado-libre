import express from 'express'

const app = express()
app.use('/items', (req, res, next) => {
  res.json({ user: 'pepe' }).status(201)
})
app.listen(3002)
console.info('server started at port 3001')
