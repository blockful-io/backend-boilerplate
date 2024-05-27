import audit from 'express-requests-logger'

import { PostgresRepository } from './repositories/postgres'
import { NewDataSource } from './datasources/postgres'
import { NewApp } from './app'

// eslint-disable-next-line
(async () => {
  const dbUrl = process.env.DATABASE_URL
  if (!dbUrl) {
    throw new Error('DATABASE_URL is required')
  }

  const dbclient = await NewDataSource(dbUrl).initialize()
  const repo = new PostgresRepository(dbclient)

  const app = NewApp(repo)
  app.use(audit())

  const port = process.env.PORT || 3000
  app.listen(port, () => {
    console.log(`Gateway bound to port ${port}.`)
  })
})()
