import React, { useContext } from 'react'
import Context from '@/presentation/contexts/form/form-context'

type Props = {
  text: string
  state: any
};

const SubmitButton: React.FC<Props> = ({ text, state }: Props) => {
  return (

    <button
      data-testid="submit"
      disabled={state.isFormInvalid}
      type="submit"
    >
      {text}
    </button>

  )
}

export default SubmitButton
