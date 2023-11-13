import { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import * as yup from 'yup'
import { validation } from '../../shared/middlewares'
import { PersonProvider } from '../../database/provider/persons'

interface IParamsProps {
  id?: number
}

const queryParams: yup.ObjectSchema<IParamsProps> = yup.object().shape({
  id: yup.number().integer().required().moreThan(0)
})

export const getByValidation = validation({
  params: queryParams
})

export const getById = async (req: Request<IParamsProps>, res: Response) => {

  if(! req.params.id) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      errors: {
        default: 'O parâmetro id precisar ser informado'
      }
    })
  }

  const result = await PersonProvider.getById(req.params.id)
  if(result instanceof Error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: {
        default: result.message
      }
    })
  }

  return res.status(StatusCodes.OK).json(result)
}