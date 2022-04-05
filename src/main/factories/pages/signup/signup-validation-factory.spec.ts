import { ValidationBuilder } from '@/validation/builder/validation-builder'
import { ValidationComposite } from '@/validation/validators'
import { makeSignUpValidator } from './signup-validation-factory'

describe('SignUpValidationFactory', () => {
  test('Should compose ValidationComposite with correct validations', () => {
    const composite = makeSignUpValidator()

    expect(composite).toEqual(new ValidationComposite([
      ...ValidationBuilder.field('name').required().build(),
      ...ValidationBuilder.field('email').required().email().build(),
      ...ValidationBuilder.field('password').required().minLength(5).build(),
      ...ValidationBuilder.field('passwordConfirmation').required().minLength(5).build()
    ]))
  })
})
