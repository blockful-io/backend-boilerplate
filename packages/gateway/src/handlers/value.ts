import { Request, RequestHandler, Response } from 'express'
import { GetValueProps, SetValueProps } from '../types'
import { Value } from '../entities'

interface WriteRepository {
  setValue({ key, value }: SetValueProps)
}

export function withSetValue(repo: WriteRepository): RequestHandler {
  return async (req: Request, res: Response) => {
    try {
      const { key, value } = req.body
      await repo.setValue({ key: parseInt(key), value })
      return res.status(201).send()
    } catch (err) {
      return {
        error: { message: 'Unable to set value', status: 400 },
      }
    }
  }
}

interface ReadRepository {
  getValue({ key }: GetValueProps): Promise<Value | null>
}

export function withGetValue(repo: ReadRepository): RequestHandler {
  return async (req: Request, res: Response) => {
    const { key } = req.params
    const value = await repo.getValue({ key: parseInt(key) })
    if (!value) {
      return res.status(404).json({ message: 'value not found' })
    }
    res.status(200).json({ data: value })
  }
}

export type Repository = WriteRepository & ReadRepository
