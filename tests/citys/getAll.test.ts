import { StatusCodes } from 'http-status-codes'
import { testServer } from '../jest.setup'

describe('Citys - GetAll', () => {

  it('Search all records', async () => {

    const res1 = await testServer.post('/citys').send({
      name: 'Almada'
    })

    expect(res1.statusCode).toEqual(StatusCodes.CREATED)

    const resGet = await testServer.get('/citys').send()

    expect(Number(resGet.headers['x-total-count'])).toBeGreaterThan(0)
    expect(resGet.statusCode).toEqual(StatusCodes.OK)

  })
  
 
})