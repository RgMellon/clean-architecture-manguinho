import React from "react";

import { ValidationComposite } from "@/validation/validators";
import { ValidationBuilder } from "@/validation/builder/validation-builder";

export const makeLoginValidation = (): ValidationComposite => {
  return new ValidationComposite([
    ...ValidationBuilder.field("email").required().email().build(),
    ...ValidationBuilder.field("password").required().minLength(5).build(),
  ]);
};
