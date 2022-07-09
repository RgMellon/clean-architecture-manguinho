import React from 'react'

import Styles from './input-style.scss'

type Props = React.DetailedHTMLProps<
React.InputHTMLAttributes<HTMLInputElement>,
HTMLInputElement
> & {
  state: any
  setState: any
};

const Input: React.FC<Props> = ({ state, setState, ...props }: Props) => {
  // eslint-disable-next-line react/prop-types
  const error = state[props.name + 'Error']

  const enableInput = (event: React.FocusEvent<HTMLInputElement>): void => {
    event.target.readOnly = false
  }

  const getStatus = (): string => {
    if (error) {
      return '🔴'
    }
    return '🟢'
  }

  const getTitle = (): string => {
    if (error) {
      return error
    }

    return 'Tudo certo!'
  }

  function handleChange (event: React.FocusEvent<HTMLInputElement>): void {
    setState({
      ...state,
      [event.target.name]: event.target.value
    })
  }

  return (
    <div className={Styles.inputWrap}>
      <input
        {...props}
        // eslint-disable-next-line react/prop-types
        data-testid={props.name}
        readOnly
        onFocus={enableInput}
        onChange={handleChange}
      />
      <span
        // eslint-disable-next-line react/prop-types
        data-testid={`${props.name}-status`}
        title={getTitle()}
        className={Styles.status}
      >
        {getStatus()}
      </span>
    </div>
  )
}

export default Input
