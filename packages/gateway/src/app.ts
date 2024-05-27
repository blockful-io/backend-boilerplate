import express, { Application } from 'express'
import cors from 'cors'

import { withSetValue, withGetValue, Repository } from './handlers'

export function NewApp(repo: Repository): Application {
  const app = express()

  app.use(cors())
  app.use(express.json())

  app.post('/values', withSetValue(repo))
  app.get('/values/:key', withGetValue(repo))

  return app
}
