import { StatusCodes } from 'http-status-codes'
import { testServer } from '../jest.setup'

describe('Citys - DeleteById', () => {

  it('delete record', async () => {

    const res1 = await testServer.post('/citys').send({
      name: 'Almada'
    })

    expect(res1.statusCode).toEqual(StatusCodes.CREATED)

    const resDeleete = await testServer.delete(`/citys/${res1.body}`).send()

    expect(resDeleete.statusCode).toEqual(StatusCodes.NO_CONTENT)
  })
  
  it('Try to delete a record that doesn´t exist', async () => {

    const res1 = await testServer.delete('/citys/99999').send()

    expect(res1.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR)
    expect(res1.body).toHaveProperty('errors.default')
  })
 
})