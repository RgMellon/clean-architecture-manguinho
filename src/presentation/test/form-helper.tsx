import faker from 'faker'

import { fireEvent, screen } from '@testing-library/react'

export const testStatusForField = (fieldName: string, validationError?: string): void => {
  const fieldStatus = screen.getByTestId(`${fieldName}-status`)

  if (validationError) {
    expect(fieldStatus.title).toBe(validationError)
    expect(fieldStatus.textContent).toBe('🔴')
    return
  }

  expect(fieldStatus.textContent).toBe('🟢')
  expect(fieldStatus.title).toBe('Tudo certo!')
}

export const populateField = (fieldName: string, value = faker.random.word()): void => {
  const input = screen.getByTestId(fieldName)
  fireEvent.input(input, {
    target: {
      value
    }
  })
}
