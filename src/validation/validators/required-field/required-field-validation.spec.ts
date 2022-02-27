import faker from 'faker';

import { RequiredFieldError } from "@/validation/errors/required-field-error";
import { RequiredFieldValidation } from "./required-field-validation"


const makeSut = (): RequiredFieldValidation =>
  new RequiredFieldValidation(faker.random.word());

describe('RequiredFieldValidation', () => {
  test('Should return error if field is empty', () => {
    const sut = makeSut();
    const error = sut.validate('')
    expect(error).toEqual(new RequiredFieldError())
  })

  test("Should return falsy if field is note empty", () => {
    const sut = makeSut();
    const error = sut.validate(faker.random.word());
    expect(error).toBeFalsy();
  });
})