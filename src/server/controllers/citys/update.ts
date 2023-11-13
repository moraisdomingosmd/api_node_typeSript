import { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import * as yup from 'yup'
import { validation } from '../../shared/middlewares'
import { ICity } from '../../database/models'
import { CitysProvider } from '../../database/provider/citys'


interface IParamsProps {
  id?: number,
}

interface IBodyprops extends Omit<ICity, 'id'> {}

const IdProps: yup.ObjectSchema<IParamsProps> = yup.object().shape({
  id: yup.number().integer().required().moreThan(0)
})

const BodyProps: yup.ObjectSchema<IBodyprops> = yup.object().shape({
  name: yup.string().required().min(3)
})

export const updateValidation = validation({
  body: BodyProps,
  params: IdProps
})

export const updateById = async(req: Request<IParamsProps, {}, IBodyprops>, res: Response) => {
  
  if(! req.params.id) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      errors: {
        default: 'O parâmetro id precisar ser informado'
      }
    })
  }

  const result = await CitysProvider.updateById(req.params.id, req.body)
  if(result instanceof Error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: {
        default: result.message
      }
    })
  }

  return res.status(StatusCodes.NO_CONTENT).json(result)
}
