import faker from 'faker'

import { fireEvent, screen } from '@testing-library/react'

export const testChildCount = (field: string, count: number): void => {
  const el = screen.getByTestId(field)
  expect(el.childElementCount).toBe(count)
}

export const testButtonIsDisabled = (
  fieldName: string,
  disable: boolean
) => {
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
  const button = screen.getByTestId(fieldName) as HTMLButtonElement
  expect(button.disabled).toBe(disable)
}

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

export const testIfElementExists = (fieldName: string): void => {
  const el = screen.getByTestId(fieldName)
  expect(el).toBeTruthy()
}

export const testElementText = (fieldName: string, text: string): void => {
  const el = screen.getByTestId(fieldName)
  expect(el.textContent).toBe(text)
}
