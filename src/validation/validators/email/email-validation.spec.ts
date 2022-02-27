import { InvalidFieldError } from "@/validation/errors/invalid-field-error";
import { FieldValidation } from "@/validation/protocols/field-validation";
import { EmailValidation } from "./email-validation";





describe('EmailValidation', () => {
  test('should return error if email is invalid', () => {
    const sut = new EmailValidation('email');
    const error = sut.validate('');

    console.log(new InvalidFieldError());

    expect(error).toEqual(new InvalidFieldError());
  })
})