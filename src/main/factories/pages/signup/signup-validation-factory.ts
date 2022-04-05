import { ValidationComposite } from '@/validation/validators'
import { ValidationBuilder } from '@/validation/builder/validation-builder'

export const makeSignUpValidator = (): ValidationComposite => {
  return new ValidationComposite([
    ...ValidationBuilder.field('name').required().build(),
    ...ValidationBuilder.field('email').required().email().build(),
    ...ValidationBuilder.field('password').required().minLength(5).build(),
    ...ValidationBuilder.field('passwordConfirmation').required().minLength(5).build()
  ])
}
