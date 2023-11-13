import { StatusCodes } from "http-status-codes";
import { testServer } from "../jest.setup";

describe('Persons - Create', () => {

  let cityId: number | undefined = undefined

  beforeAll(async () => {
    const resCity = await testServer.post('/citys').send({
      name: '123Barreiro'
    })

    cityId = resCity.body
  })

  it('Create recond', async () => {
    
    const result = await testServer.post('/persons').send({
      email: '123moraisdomingosmd@gmail.com',
      firstName: '123Morais',
      secondName: '123Domingos',
      cityId
    })

    expect(result.statusCode).toEqual(StatusCodes.CREATED)
    expect(typeof result.body).toEqual('number')
  })
  
  it('Try creating a record with incomplete data', async () => {

    const result = await testServer.post('/persons').send({
      email: '123moraisdomingos@gmail.com',
      firstName: '123Morais',
      secondName: '123Domingos',
      cityId: 0
    })

    expect(result.statusCode).toEqual(StatusCodes.BAD_REQUEST)
    expect(result.body).toHaveProperty('errors.body.cityId')
  })
})