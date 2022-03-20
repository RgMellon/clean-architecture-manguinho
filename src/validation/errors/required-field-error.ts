export class RequiredFieldError extends Error {
  constructor () {
    super('Campo obrigatótorio')
    this.name = 'RequiredFieldError'
  }
}
