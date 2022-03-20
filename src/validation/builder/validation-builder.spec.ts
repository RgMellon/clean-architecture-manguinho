import faker from 'faker'

import {
  EmailValidation,
  MinLengthValidation,
  RequiredFieldValidation
} from '@/validation/validators'

import { ValidationBuilder } from './validation-builder'

describe('ValidationBuilder', () => {
  test('Should return RequiredFieldValidation', () => {
    const field = faker.database.column()
    const validations = ValidationBuilder.field(field).required().build()

    expect(validations).toEqual([new RequiredFieldValidation(field)])
  })

  test('Should return EmailValidation', () => {
    const field = faker.database.column()
    const validations = ValidationBuilder.field(field).email().build()

    expect(validations).toEqual([new EmailValidation(field)])
  })

  test('Should return MinLengthValidation', () => {
    const length = faker.random.number()

    const field = faker.database.column()
    const validations = ValidationBuilder.field(field).minLength(length).build()

    expect(validations).toEqual([new MinLengthValidation(field, length)])
  })

  test('Should return a list of validations', () => {
    const length = faker.random.number()
    const field = faker.database.column()

    const validations = ValidationBuilder.field(field)
      .minLength(length)
      .email()
      .required()
      .build()

    expect(validations).toEqual([
      new MinLengthValidation(field, length),
      new EmailValidation(field),
      new RequiredFieldValidation(field)
    ])
  })
})
