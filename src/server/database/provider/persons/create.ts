import { ETableNames } from "../../ETableNames";
import { Knex } from "../../knex";
import { IPerson } from "../../models";



export const create = async (person: Omit<IPerson, 'id'>): Promise<Number | Error> => {
  try {
    const [result] = await Knex(ETableNames.persons).insert(person).returning('id')

    if(typeof result === 'object') {
      return result.id
    } else {
      return result
    }

  } catch (error) {
    console.log(error)
    return new Error('Erro ao cadastrar o registro')
  }
}