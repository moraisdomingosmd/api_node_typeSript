import { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import * as yup from 'yup'
import { validation } from '../../shared/middlewares'
import { CitysProvider } from '../../database/provider/citys'

interface IQueryProps {
  id?: number,
  page?: number,
  limit?: number,
  filter?: string
}

const queryParams: yup.ObjectSchema<IQueryProps> = yup.object().shape({
  id: yup.number().integer().default(0),
  page: yup.number().moreThan(0),
  limit: yup.number().moreThan(0),
  filter: yup.string()
})

export const getAllValidation = validation({
  query: queryParams
})

export const getAll = async (req: Request<{}, {}, {}, IQueryProps>, res: Response) => {
  const result = await CitysProvider.getAll(req.query.page || 1, req.query.limit || 7, req.query.filter || '', Number(req.query.id));
  const count = await CitysProvider.count(req.query.filter)


 
  if(result instanceof Error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: {
        default: result.message
      }
    })
  } 
 
  else if(count instanceof Error) {
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