import { Knex } from '../../knex'
import { ICity } from "../../models"
import { ETableNames } from "../../ETableNames"


export const create = async (city: Omit<ICity, 'id'>): Promise<Number | Error> => {

  try {
    const [result] = await Knex(ETableNames.citys).insert(city).returning('id')

    if(typeof result === 'object') {
      return result.id
    }
    else {
      return result
    }    
    
  } catch (error) {
    console.log(error)
    return Error('Erro ao cadastrar o registro')
  }
}