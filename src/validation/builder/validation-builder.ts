import { FieldValidation } from "../protocols/field-validation";

import {
  RequiredFieldValidation,
  EmailValidation,
  MinLengthValidation
} from "@/validation/validators";

export class ValidationBuilder {
  private constructor(
    private readonly fieldName,
    private readonly validations: FieldValidation[]
  ) {}

  static field(fieldName: string): ValidationBuilder {
    return new ValidationBuilder(fieldName, []);
  }

  required(): ValidationBuilder {
    this.validations.push(new RequiredFieldValidation(this.fieldName));
    return this;
  }

  email(): ValidationBuilder {
    this.validations.push(new EmailValidation(this.fieldName));
    return this;
  }

  minLength(min: number): ValidationBuilder {
    this.validations.push(new MinLengthValidation(this.fieldName, min));
    return this;
  }

  build(): FieldValidation[] {
    return this.validations;
  }
}
