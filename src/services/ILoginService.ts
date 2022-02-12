export default interface ILogin {
  login(username: string, password: string): Promise<boolean>

  
}