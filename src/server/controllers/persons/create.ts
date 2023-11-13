import { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import * as yup from 'yup'
import { validation } from '../../shared/middlewares'
import { IPerson } from '../../database/models'
import { PersonProvider } from '../../database/provider/persons'


interface IBodyProps extends Omit<IPerson, 'id'> {}

const bodyValidation: yup.ObjectSchema<IBodyProps> = yup.object().shape({
  email: yup.string().email().required(),
  cityId: yup.number().integer().required().moreThan(0),
  firstName: yup.string().required().min(3),
  secondName: yup.string().required().min(3)
})

export const createValidation = validation({
  body: bodyValidation
})
export const create = async (req: Request<{}, {}, IBodyProps>, res: Response) => {
  
  const result = await PersonProvider.create(req.body)
  if(result instanceof Error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: {
        default: result.message
      }
    })
  }

  return res.status(StatusCodes.CREATED).json(result)
}