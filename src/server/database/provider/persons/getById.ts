import { ETableNames } from "../../ETableNames";
import { Knex } from "../../knex";
import { IPerson } from "../../models";



export const getById = async (id: Number): Promise<IPerson | Error> => {

  try {
    const result = await Knex(ETableNames.persons).select('*')
      .where('id', '=', id).first()

      if(result) return result

      return new Error('Registro não encontrado')
    
  } catch (error) {
    console.log(error)
    return new Error('Erro ao consultar registro')
  }

}