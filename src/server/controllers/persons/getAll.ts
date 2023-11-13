import { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import * as yup from 'yup'
import { validation } from '../../shared/middlewares'
import { PersonProvider } from '../../database/provider/persons'

interface IQueryProps {
  page?: number,
  limit?: number,
  filter?: string
}

const IQuery: yup.ObjectSchema<IQueryProps> = yup.object().shape({
  page: yup.number().moreThan(0),
  limit: yup.number().moreThan(0),
  filter: yup.string()
})

export const getAllValidation = validation({
  query: IQuery
})

export const getAll = async (req: Request<{}, {}, {}, IQueryProps>, res: Response) => {
  const result = await PersonProvider.getAll(req.query.page || 1, req.query.limit || 1, req.query.filter || '')
  const count = await PersonProvider.count(req.query.filter)

  if(result instanceof Error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: {
        default: result.message
      }
    })
  } else if(count instanceof Error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: {
        default: count.message
      }
    })
  }

  res.setHeader('acess-control-expose-headers', 'x-total-count')
  res.setHeader('x-total-count', count)

  return res.status(StatusCodes.OK).json(result)
}