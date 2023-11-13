import { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import * as yup from 'yup'
import { validation } from '../../shared/middlewares'
import { ICity } from '../../database/models'
import { CitysProvider } from '../../database/provider/citys'


interface IBodyProps extends Omit<ICity, 'id'> {}

const bodyValidation: yup.ObjectSchema<IBodyProps> = yup.object().shape({
  name: yup.string().required().min(3)
})

export const createValidation = validation({
  body: bodyValidation
})

export const create = async (req: Request<{}, {}, IBodyProps>, res: Response) => {

  const result = await CitysProvider.create(req.body)
  if(result instanceof Error){
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: {
        default: result.message
      }
    })
  }

  return res.status(StatusCodes.CREATED).json(result)
}
