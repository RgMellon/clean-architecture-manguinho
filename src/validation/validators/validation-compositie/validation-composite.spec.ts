import { FieldValidation } from "@/validation/protocols/field-validation";
import { FieldValidationSpy } from "../test/mock-field-validation";
import { ValidationComposite } from "./validation-composite";

describe('ValidationComposite', () => {
  test('Should return error if any validation fails', () => {
    const fieldValidationSpyWithSucess = new FieldValidationSpy("any_field");
    const fieldValidationSpyWithError = new FieldValidationSpy("any_field");

    fieldValidationSpyWithError.error = new Error('any_message');
    
    const sut = new ValidationComposite([
      fieldValidationSpyWithSucess,
      fieldValidationSpyWithError,
    ]);

    const error = sut.validate('any_field', 'any_value')
    expect(error).toBe("any_message");
  })
})