import { Request, Response } from "express"
import * as yup from 'yup'
import { IUser } from "../../database/models"
import { validation } from "../../shared/middlewares"
import { UsersProvider } from "../../database/provider/users"
import { StatusCodes } from "http-status-codes"


interface IBoodyProps extends Omit<IUser, 'id'> {}

const IBody: yup.ObjectSchema<IBoodyProps> = yup.object().shape({
  email: yup.string().required().email(),
  name: yup.string().required().min(3),
  password: yup.string().required().min(6)
})

export const singUpValidation = validation({
  body: IBody
})


export const singUp = async (req: Request<{}, {}, IBoodyProps>, res: Response) => {
  const result = await UsersProvider.create(req.body)

  if(result instanceof Error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: {
        default: result.message
      }
    })
  }

  return res.status(StatusCodes.CREATED).json(result)
}