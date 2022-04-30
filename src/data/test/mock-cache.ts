import { SetStorage } from '../protocols/cache/set-storage'
import { GetStorage } from '../protocols/cache/get-storage'

import faker from 'faker'

export class SetStorageSpy implements SetStorage {
  key: string
  value: any
  set (key: string, value: any): void {
    this.key = key
    this.value = value
  }
}

export class GestStorageSpy implements GetStorage {
  key: string;
  value = faker.random.objectElement()

  get (key: string): any {
    this.key = key
    return this.value
  }
}
