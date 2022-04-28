import express from 'express'
import router from './controllers/router.js'
import cors from 'cors'

const app = express()

app.use(cors())
app.use(router)

const port = parseInt(process.env.PORT) || 3001

app.listen(port)
console.info(`server started at port ${port}`)
