import * as create  from './create'
import * as getAll from './getAll'
import * as getByID from './getById'
import * as update from './update'
import * as deleteById from './delete'

export const CidadeController = {
  ...create,
  ...getAll,
  ...getByID,
  ...update,
  ...deleteById
}