import { ETableNames } from "../../ETableNames";
import { Knex } from "../../knex";
import { IUser } from "../../models";
import { PasswordCrypto } from '../../../shared/services'


export const create = async (users: Omit<IUser, 'id'>): Promise<number | Error> => {

  try {
    
    const hashedPassword = await PasswordCrypto.hasPassword(users.password)
 
    const [result] = await Knex(ETableNames.users).insert({...users, password: hashedPassword}).returning('id')

    if(typeof result === 'object') {
      return result.id
    } else if(typeof result === 'number') {
      return result
    }

    return new Error('Erro ao cadastrar o registro')
  } catch (error) {
    console.log(error)
    return new Error('Erro ao cadastrar o registro')
  }
}