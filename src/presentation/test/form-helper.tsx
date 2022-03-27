import faker from 'faker'

import { fireEvent, RenderResult } from '@testing-library/react'

export const testChildCount = (sut: RenderResult, field: string, count: number): void => {
  const el = sut.getByTestId(field)
  expect(el.childElementCount).toBe(count)
}

export const testButtonIsDisabled = (
  sut: RenderResult,
  fieldName: string,
  disable: boolean
) => {
  const button = sut.getByTestId(fieldName) as HTMLButtonElement
  expect(button.disabled).toBe(disable)
}

export const testStatusForField = (sut: RenderResult, fieldName: string, validationError?: string): void => {
  const fieldStatus = sut.getByTestId(`${fieldName}-status`)

  if (validationError) {
    expect(fieldStatus.title).toBe(validationError)
    expect(fieldStatus.textContent).toBe('🔴')
    return
  }

  expect(fieldStatus.textContent).toBe('🟢')
  expect(fieldStatus.title).toBe('Tudo certo!')
}

export const populateField = (sut: RenderResult, fieldName: string, value = faker.random.word()): void => {
  const input = sut.getByTestId(fieldName)
  fireEvent.input(input, {
    target: {
      value
    }
  })
}
