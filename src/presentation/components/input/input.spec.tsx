import React from 'react'
import { fireEvent, render } from '@testing-library/react'

import Context from '@/presentation/contexts/form/form-context'
import { InputBase } from '..'

const makeSut = () => {
  return render(
    <InputBase name="field" state={{}} setState={null} />
  )
}

describe('Input Component', () => {
  test('Should begin with readOnly', () => {
    const sut = makeSut()

    const input = sut.getByTestId('field') as HTMLInputElement

    expect(input.readOnly).toBe(true)
  })

  test('Should remove  readOnly on focus', () => {
    const sut = makeSut()

    const input = sut.getByTestId('field') as HTMLInputElement

    fireEvent.focus(input)
    expect(input.readOnly).toBe(false)
  })
})
