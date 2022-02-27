import faker from 'faker';

import { InvalidFieldError } from "@/validation/errors/invalid-field-error";
import { FieldValidation } from "@/validation/protocols/field-validation";
import { EmailValidation } from "./email-validation";

describe('EmailValidation', () => {
  test('should return error if email is invalid', () => {
    const sut = new EmailValidation('email');
    const error = sut.validate(faker.random.word());

    expect(error).toEqual(new InvalidFieldError());
  })


   test("should return falsy if emails is valid", () => {
     const sut = new EmailValidation("email");
     const error = sut.validate(faker.internet.email());
    
     expect(error).toBeFalsy();
   });
})