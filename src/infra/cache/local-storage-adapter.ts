import { SetStorage } from '@/data/protocols/cache/set-storage'

export class LocalStorageAdapter implements SetStorage {
  // eslint-disable-next-line @typescript-eslint/require-await
  async set (key: string, value: any): Promise<void> {
    localStorage.setItem(key, value)
  }
}
