import { atom } from 'recoil'

export const loginState = atom({
  key: 'loginState',
  default: {
    isLoading: false,
    isFormInvalid: true,
    emailError: '',
    passwordError: '',
    mainError: '',
    email: '',
    password: ''
  }
})
