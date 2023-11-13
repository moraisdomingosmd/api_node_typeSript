import { StatusCodes } from 'http-status-codes'
import { testServer } from '../jest.setup'

describe('Citys - UpdateById', () => {

  it('Update record', async () => {

    const res1 = await testServer.post('/citys').send({
      name: 'Almada'
    })

    expect(res1.statusCode).toEqual(StatusCodes.CREATED)

    const resUpdate = await testServer.put(`/citys/${res1.body}`).send({
      name: 'Amadora'
    })

    expect(resUpdate.statusCode).toEqual(StatusCodes.NO_CONTENT)
  })

  it('Attempts to update a record that does not exist', async () => {

    const res1 = await testServer.put('/citys/99999').send({
      name: 'Amadora'
    })

    expect(res1.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR)
    expect(res1.body).toHaveProperty('errors.default')
  })
  
 
})