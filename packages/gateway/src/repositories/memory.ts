import { Value } from '../entities'
import { GetValueProps, SetValueProps } from '../types'

/* The `InMemoryRepository` is a repository implementation that
stores domains, addresses, and texts in memory and provides methods for changing values
for testing purposes. */
export class InMemoryRepository {
  private values: Map<number, Value>

  constructor() {
    this.values = new Map()
  }

  clear() {
    this.values.clear()
  }

  setValues(values: Value[]) {
    this.values = values.reduce((map, addr) => {
      map.set(addr.key, addr)
      return map
    }, new Map())
  }

  async setValue({ key, value }: SetValueProps): Promise<void> {
    const existing = this.values.get(key)
    if (existing) {
      throw new Error('duplicated key')
    }
    this.values.set(key, { key, value })
  }

  async getValue({ key }: GetValueProps): Promise<Value | null> {
    return this.values.get(key) || null
  }
}
