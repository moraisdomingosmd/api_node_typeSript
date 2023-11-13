import { StatusCodes } from "http-status-codes";
import { testServer } from "../jest.setup";

describe('Persons - Update By Id', () => {

  let cityId: number | undefined = undefined

  beforeAll(async () => {
    const resCity = await testServer.post('/citys').send({
      name: '123Barreiro'
    })

    cityId = resCity.body
  })

  it('Update record', async () => {

    const result1 = await testServer.post('/persons').send({
      email: '123moraisdomingosmd@gmail.com',
      firstName: '123Morais',
      secondName: '123Domingos',
      cityId
    }) 

    expect(result1.statusCode).toEqual(StatusCodes.CREATED)

    const result = await testServer.put(`/persons/${result1.body}`).send({
      email: '123domingosmorais@gmail.com',
      firstName: '123Domingos',
      secondName: '123Morais',
      cityId
    })

    expect(result.statusCode).toEqual(StatusCodes.NO_CONTENT)
  })

  it('attempts to update a record that does not exist', async () => {

    const result = await testServer.put('/persons/9999').send({
      email: '123moraisdomingosmd@gmail.com',
      firstName: '123Morais',
      secondName: '123Domingos',
      cityId
    })

    expect(result.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR)
    expect(result.body).toHaveProperty('errors.default')
  })
})