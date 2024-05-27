import 'reflect-metadata'
import { DataSource } from 'typeorm'

import { Value } from '../entities'
import { GetValueProps, SetValueProps } from '../types'

/* The PostgresRepository class provides methods for setting and getting content
hash, address, and text data in a PostgreSQL database. */
export class PostgresRepository {
  private client: DataSource

  constructor(client: DataSource) {
    this.client = client
  }

  async setValue({ key, value }: SetValueProps) {
    await this.client.getRepository(Value).upsert(
      {
        key,
        value,
      },
      { conflictPaths: ['key'], skipUpdateIfNoValuesChanged: true },
    )
  }

  async getValue({ key }: GetValueProps): Promise<Value | null> {
    return await this.client
      .getRepository(Value)
      .createQueryBuilder('value')
      .andWhere('value.key = :key', { key })
      .getOne()
  }
}
