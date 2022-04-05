import faker from 'faker'

import { InvalidFieldError } from '@/validation/errors/invalid-field-error'
import { MinLengthValidation } from './min-length-validation'

const makeSut = (field: string): MinLengthValidation =>
  new MinLengthValidation(field, 5)

describe('MinLengthValidation', () => {
  it('should return error if value is invalid', () => {
    const field = faker.random.word()
    const sut = makeSut(field)
    const error = sut.validate({ [field]: faker.random.alphaNumeric(4) })

    expect(error).toEqual(new InvalidFieldError())
  })

  it('should return falsy if value is valid', () => {
    const field = faker.random.word()
    const sut = makeSut(field)
    const error = sut.validate({ [field]: faker.random.alphaNumeric(6) })

    expect(error).toBeFalsy()
  })

  it('should return falsy if field doesnt exist in schema', () => {
    const sut = makeSut(faker.random.word())
    const error = sut.validate({ [faker.random.word()]: faker.random.alphaNumeric(5) })

    expect(error).toBeFalsy()
  })
})
