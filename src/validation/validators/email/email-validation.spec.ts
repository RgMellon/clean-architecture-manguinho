import faker from 'faker'

import { InvalidFieldError } from '@/validation/errors/invalid-field-error'
import { EmailValidation } from './email-validation'

const makeSut = (field: string): EmailValidation => new EmailValidation(field)

describe('EmailValidation', () => {
  test('should return error if email is invalid', () => {
    const field = faker.random.word()

    const sut = makeSut(field)
    const error = sut.validate({ [field]: faker.random.word() })

    expect(error).toEqual(new InvalidFieldError())
  })

  test('should return falsy if emails is valid', () => {
    const field = faker.random.word()
    const sut = makeSut(field)
    const error = sut.validate({ [field]: faker.internet.email() })

    expect(error).toBeFalsy()
  })

  test('should return falsy if emails is empty', () => {
    const field = faker.random.word()
    const sut = makeSut(field)
    const error = sut.validate({ [field]: '' })

    expect(error).toBeFalsy()
  })
})
