import { Knex } from "knex";
import { ETableNames } from "../ETableNames";


export const seed = async (Knex: Knex) => {

  const [{count}] = await Knex(ETableNames.citys).count<[{count: number}]>('* as count')

  if(!Number.isInteger(count) || Number(count) > 0) return

  const citysTeInsert = concelhosDeLisboa.map(NomedoConcelho => ({name: NomedoConcelho}))

  await Knex(ETableNames.citys).insert(citysTeInsert)

}


const concelhosDeLisboa = [
  'Azambuja',
  'Alenquer',
  'Arruda dos Vinhos',
  'Cadaval',
  'Lourinhã',
  'Sobral de Monte Agraço',
  'Torres Vedras',
  'Amadora',
  'Cascais',
  'Lisboa',
  'Loures',
  'Mafra',
  'Odivelas',
  'Oeiras',
  'Sintra',
  'Vila Franca de Xira',
  'Barreiro',
  'Almada',
  'Palmela',
  'Moita',
  'Montijo'
]