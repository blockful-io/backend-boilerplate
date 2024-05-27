import { describe, it, expect, beforeAll, afterEach } from 'vitest'
import { Application } from 'express'
import request from 'supertest'

import { NewApp } from '../src/app'
import { InMemoryRepository } from '../src/repositories'

describe('API', () => {
  let app: Application, repo: InMemoryRepository

  beforeAll(() => {
    repo = new InMemoryRepository()
    app = NewApp(repo)
    app.listen(3000)
  })

  afterEach(async () => await repo.clear())

  it('should create value', async () => {
    const key = 1
    const value = 'value'

    await request(app)
      .post('/values')
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .send({
        key,
        value,
      })

    const actual = await repo.getValue({ key })
    expect(actual).toEqual({ key, value })
  })

  it('should read value', async () => {
    const key = 1
    const value = 'value'

    repo.setValues([
      {
        key,
        value,
      },
    ])

    const actual = await request(app)
      .get(`/values/${key}`)
      .set('Accept', 'application/json')

    expect(actual.body?.data).toEqual({ key, value })
  })
})
