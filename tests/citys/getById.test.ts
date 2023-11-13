import { StatusCodes } from 'http-status-codes'
import { testServer } from '../jest.setup'

describe('Citys - GetById', () => {

  it('Search record by id', async () => {

    const res1 = await testServer.post('/citys').send({
      name: 'Almada'
    })

    expect(res1.statusCode).toEqual(StatusCodes.CREATED)

    const resGetBy = await testServer.get(`/citys/${res1.body}`).send()

    expect(resGetBy.statusCode).toEqual(StatusCodes.OK)
    expect(resGetBy.body).toHaveProperty('name')
  })

  it('Tries to search for a record that does not exist', async () => {

    const res1 = await testServer.get('/citys/99999').send()

    expect(res1.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR)
    expect(res1.body).toHaveProperty('errors.default')
  })
  
 
})