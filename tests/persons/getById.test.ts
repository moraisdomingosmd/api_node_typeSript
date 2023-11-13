import { StatusCodes } from "http-status-codes";
import { testServer } from "../jest.setup";

describe('Persons - Get By Id', () => {

  let cityId: number | undefined = undefined

  beforeAll(async () => {
    const resCity = await testServer.post('/citys').send({
      name: '123Barreiro'
    })

    cityId = resCity.body
  })

  it('Search record by id', async () => {

    const result1 = await testServer.post('/persons').send({
      email: '123moraisdomingosmd@gmail.com',
      firstName: '123Morais',
      secondName: '123Domingos',
      cityId
    })

    expect(result1.statusCode).toEqual(StatusCodes.CREATED)

    const result = await testServer.get(`/persons/${result1.body}`).send()

    expect(result.statusCode).toEqual(StatusCodes.OK)
    expect(result.body).toHaveProperty('email')
  })

  it('Tries to search for a record that does not exist', async () => {

    const result = await testServer.get('/persons/9999').send()

    expect(result.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR)
    expect(result.body).toHaveProperty('errors.default')
  })
})