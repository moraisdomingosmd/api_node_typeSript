import * as create from './create'
import * as getAll from './getAll'
import * as getById from './getById'
import * as update from './update'
import * as deleteById from './delete'


export const PersonsController = {
  ...create,
  ...getAll,
  ...getById,
  ...update,
  ...deleteById
}