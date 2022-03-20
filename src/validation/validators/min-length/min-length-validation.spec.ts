import faker from 'faker'

import { InvalidFieldError } from '@/validation/errors/invalid-field-error'
import { MinLengthValidation } from './min-length-validation'

const makeSut = (minValidation: number): MinLengthValidation =>
  new MinLengthValidation(faker.database.column(), minValidation)

describe('MinLengthValidation', () => {
  it('should return error if value is invalid', () => {
    const sut = makeSut(3)
    const error = sut.validate('')

    expect(error).toEqual(new InvalidFieldError())
  })

  it('should return falsy if value is valid', () => {
    const sut = makeSut(5)
    const error = sut.validate('12345')

    expect(error).toBeFalsy()
  })
})
