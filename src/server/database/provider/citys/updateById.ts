import { ETableNames } from "../../ETableNames";
import { Knex } from "../../knex";
import { ICity } from "../../models";



export const updateById = async (id: number, city: Omit<ICity, 'id'>): Promise<void | Error> => {
  try {
    const result = await Knex(ETableNames.citys).update(city)
    .where('id', '=', id)

    if(result > 0) return

    return new Error('Erro ao atualizar o registro')
  } catch (error) {
    console.log(error)
    return new Error('Erro ao atualizar o registro')
  }
}