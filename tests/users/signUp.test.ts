import { StatusCodes } from "http-status-codes";
import { testServer } from '../jest.setup'


describe('User - SingUp', () => {
  it('Register user 1', async () => {
    const result = await testServer.post('/singUp').send({
      email: '123moraisdomingosmd@gmail.com',
      name: '123Morais Domingos',
      password: '1234567'
    })

    expect(result.statusCode).toEqual(StatusCodes.CREATED)
    expect(typeof result.body).toEqual('number')
  })

  it('Error when registering a user with duplicate email', async () => {
    const result = await testServer.post('/singUp').send({
      email: '11moraisdomingosmd@gmail.com',
      name: '12Morais Domingos',
      password: '1222567'
    })

    expect(result.statusCode).toEqual(StatusCodes.CREATED)
    expect(typeof result.body).toEqual('number')

    const result1 = await testServer.post('/singUp').send({
      email: '11moraisdomingosmd@gmail.com',
      name: '14Morais Domingos',
      password: '1234567'
    })

    expect(result1.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR)
    expect(result1.body).toHaveProperty('errors.default')
  })

  it('Error when registering a user without email', async () => {
    const result = await testServer.post('/singUp').send({
      /* email: '00moraisdomingosmd@gmail.com', */
      name: '00Morais Domingos',
      password: '00234567'
    })

    expect(result.statusCode).toEqual(StatusCodes.BAD_REQUEST)
    expect(result.body).toHaveProperty('errors.body.email')
  })

  it('Error when registering a user without name', async () => {
    const result = await testServer.post('/singUp').send({
      email: '000moraisdomingosmd@gmail.com',
      /* name: '00Morais Domingos', */
      password: '02234567'
    })

    expect(result.statusCode).toEqual(StatusCodes.BAD_REQUEST)
    expect(result.body).toHaveProperty('errors.body.name')
  })

  it('Error when registering a user without password', async () => {
    const result = await testServer.post('/singUp').send({
      email: '001moraisdomingosmd@gmail.com',
      name: '020Morais Domingos',
      /* password: '00234567' */
    })

    expect(result.statusCode).toEqual(StatusCodes.BAD_REQUEST)
    expect(result.body).toHaveProperty('errors.body.password')
  })

  it('Error when registering a user with invalid email', async () => {
    const result = await testServer.post('/singUp').send({
      email: 'moraisdomingosmd',
      name: '030Morais Domingos',
      password: '05234567'
    })

    expect(result.statusCode).toEqual(StatusCodes.BAD_REQUEST)
    expect(result.body).toHaveProperty('errors.body.email')
  })
})