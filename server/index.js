import express from 'express'
import router from './controllers/router.js'
import cors from 'cors'
import errorMiddleware from './middlewares/errorMiddleware.js'

const app = express()

app.use(cors())
app.use(router)
app.use(errorMiddleware)

const port = parseInt(process.env.PORT) || 3001

app.listen(port)
console.info(`server started at port ${port}`)
