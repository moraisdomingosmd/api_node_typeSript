import { ETableNames } from "../../ETableNames";
import { Knex } from "../../knex";
import { IPerson } from "../../models";



export const updateById = async (persons: Omit<IPerson, 'id'>, id: number): Promise<void | Error> => {
  
  try {
    
    const result = await Knex(ETableNames.persons).update(persons)
      .where('id', '=', id)

      if(result > 0) return 

      return new Error('Erro ao atualizar o registro')
  } catch (error) {
    console.log(error)
    return new Error('Erro ao atualizar o registro')
  }
}