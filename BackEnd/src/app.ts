import express, { json } from 'express'
import logger from './models/error/logger';
import responder from './models/error/responder';
import notFound from './models/not-found';
import teamsRouter from './routers/teams'
import meetingsRouter from './routers/meetings'
import config from 'config'
import sequelize from './db/sequelize';
import cors from 'cors'

const app = express()

const port = config.get<number>('app.port')
const appName = config.get<string>('app.name')

app.use(cors())

app.use(json())

app.use('/teams', teamsRouter)
app.use('/meetings', meetingsRouter)

app.use(notFound)

app.use(logger)
app.use(responder)

sequelize.sync({ force: process.argv[2] === 'sync' })

app.listen(port, () => console.log(`${appName} started on port ${port}`))