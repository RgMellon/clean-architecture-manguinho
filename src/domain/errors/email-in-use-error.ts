export class EmailInUsError extends Error {
  constructor () {
    super('Esse e-mail já está em uso')
    this.name = 'EmailInUsError'
  }
}
