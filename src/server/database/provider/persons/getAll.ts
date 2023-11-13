import { ETableNames } from "../../ETableNames";
import { Knex } from "../../knex";
import { IPerson } from "../../models";



export const getAll = async (page: number, limit: number, filter: string): Promise<IPerson[] | Error> => {

  try {
    const result = await Knex(ETableNames.persons).select('*')
        .where('firstName', 'like', `%${filter}%`)
          .offset((page -1) * limit).limit(limit)

    return result
  } catch (error) {
    console.log(error)
    return new Error('Erro ao consultar os registros')
  }
}