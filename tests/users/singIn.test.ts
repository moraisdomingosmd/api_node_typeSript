import { StatusCodes } from "http-status-codes";
import { testServer } from '../jest.setup'

describe('User - SingIn', () => {
  beforeAll(async () => {
    await testServer.post('/singUp').send({
      name: 'Morais',
      password: '12334566',
      email: 'morais@gmail.com'
    })
  })
  it('Log in', async () => {
    const result = await testServer.post('/signIn').send({
      email: 'morais@gmail.com',
      password: '12334566'
    })
    expect(result.statusCode).toEqual(StatusCodes.OK)
    expect(result.body).toHaveProperty('acessToken')
  })

  it('Wrong password', async () => {
    const result = await testServer.post('/signIn').send({
      email: 'morais@gmail.com',
      password: '334566'
    })
    expect(result.statusCode).toEqual(StatusCodes.UNAUTHORIZED)
    expect(result.body).toHaveProperty('errors.default')
  })

  it('Wrong email', async () => {
    const result = await testServer.post('/signIn').send({
      email: 'morais4@gmail.com',
      password: '12334566'
    })
    expect(result.statusCode).toEqual(StatusCodes.UNAUTHORIZED)
    expect(result.body).toHaveProperty('errors.default')
  })

  it('invalid email format', async () => {
    const result = await testServer.post('/signIn').send({
      email: 'morais',
      password: '12334566'
    })
    expect(result.statusCode).toEqual(StatusCodes.BAD_REQUEST)
    expect(result.body).toHaveProperty('errors.body.email')
  })
})