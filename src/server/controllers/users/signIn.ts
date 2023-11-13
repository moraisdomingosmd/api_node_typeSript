import { Request, Response } from "express"
import * as yup from 'yup'
import { IUser } from "../../database/models"
import { validation } from "../../shared/middlewares"
import { UsersProvider } from "../../database/provider/users"
import { StatusCodes } from "http-status-codes"
import { JWTService, PasswordCrypto } from "../../shared/services"


interface IBoodyProps extends Omit<IUser, 'id' | 'name'> {}

const IBody: yup.ObjectSchema<IBoodyProps> = yup.object().shape({
  email: yup.string().required().email(),
  password: yup.string().required().min(6)
})

export const singInValidation = validation({
  body: IBody
})


export const singIn = async (req: Request<{}, {}, IBoodyProps>, res: Response) => {
  const { email, password } = req.body

  const result = await UsersProvider.getByEmail(email)

  if(result instanceof Error) {
    return res.status(StatusCodes.UNAUTHORIZED).json({
      errors: {
        default: 'Email ou senha são invalidos'
      }
    })
  }

  const passwordMatch = await PasswordCrypto.verifyPassword(password, result.password)

  if(!passwordMatch) {
    return res.status(StatusCodes.UNAUTHORIZED).json({
      errors: {
        default: 'Email ou senha são invalidos'
      }
    })
  } else {

    const acessToken = JWTService.sign({id: result.id})

    if(acessToken === 'JWT_SECRET_NOT_FOUND') {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json( {
        errors: {
          default: 'Erro ao gerar o token de acesso'
        }
      })
    }

    return res.status(StatusCodes.OK).json({
      acessToken
    })
  }

}