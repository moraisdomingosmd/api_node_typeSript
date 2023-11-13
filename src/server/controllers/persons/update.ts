import { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import * as yup from 'yup'
import { validation } from '../../shared/middlewares'
import { PersonProvider } from '../../database/provider/persons'
import { IPerson } from '../../database/models'

interface IBodyprops extends Omit<IPerson, 'id'> {}
interface IParamsProps {
  id?: number
}

const IdProps: yup.ObjectSchema<IParamsProps> = yup.object().shape({
  id: yup.number().integer().required().moreThan(0)
})

const IBody: yup.ObjectSchema<IBodyprops> = yup.object().shape({
  email: yup.string().required().email(),
  firstName: yup.string().required().min(3),
  secondName: yup.string().required().min(3),
  cityId: yup.number().integer().required().moreThan(0)
})

export const updateValidation = validation({
  params: IdProps,
  body: IBody
})

export const update = async (req: Request<IParamsProps, {}, IBodyprops>, res: Response) => {
  
  if(! req.params.id) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      errors: {
        default: 'O parâmetro id precisar ser informado'
      }
    })
  }

  const result = await PersonProvider.updateById(req.body, req.params.id)
  if(result instanceof Error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: {
        default: result.message
      }
    })
  }

  return res.status(StatusCodes.NO_CONTENT).json(result)
}