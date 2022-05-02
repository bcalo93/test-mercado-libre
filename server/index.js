import express from 'express'
import router from './controllers/router.js'
import cors from 'cors'
import error from './middlewares/errorMiddleware.js'
import normalizeResponse from './middlewares/normalizeResponseMiddleware.js'

const app = express()

app.use(cors())
app.use(router)

app.use(normalizeResponse)
app.use(error)

const port = parseInt(process.env.PORT) || 3001

app.listen(port)
console.info(`server started at port ${port}`)
