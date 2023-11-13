import { StatusCodes } from 'http-status-codes'
import { testServer } from '../jest.setup'

describe('Citys - Create', () => {
  it('Create records', async () => {

    const res1 = await testServer.post('/citys').send({
      name: 'Almada'
    })

    expect(res1.statusCode).toEqual(StatusCodes.CREATED)
    expect(typeof res1.body).toEqual('number')
  })

  it('Tries to create a record with a short name', async () => {

    const res1 = await testServer.post('/citys').send({
      name: 'Al'
    })

    expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST)
    expect(res1.body).toHaveProperty('errors.body.name')
  })

}) 