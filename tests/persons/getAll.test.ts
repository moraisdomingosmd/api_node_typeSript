import { StatusCodes } from "http-status-codes";
import { testServer } from "../jest.setup";

describe('Persons - Get All', () => {
  let cityId: number | undefined = undefined

  beforeAll(async () => {
    const resCity = await testServer.post('/citys').send({
      name: '123Barreiro'
    })

    cityId = resCity.body
  })

  it('Search All records', async () => {


    const result1 = await testServer.post('/persons').send({
      email: '123moraisdomingosmd@gmail.com',
      firstName: '123Morais',
      secondName: '123Domingos',
      cityId
    })

    expect(result1.statusCode).toEqual(StatusCodes.CREATED)

    const result = await testServer.get('/persons').send()

    expect(Number(result.headers['x-total-count'])).toBeGreaterThan(0)
    expect(result.statusCode).toEqual(StatusCodes.OK)
  })
})