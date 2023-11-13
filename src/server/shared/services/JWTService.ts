import * as jwt from 'jsonwebtoken'

interface IJWTDate {
    id: number
}

const sign = (data: IJWTDate): string | 'JWT_SECRET_NOT_FOUND' => {

  if(!process.env.JWT_SECRET) return 'JWT_SECRET_NOT_FOUND'

  return jwt.sign(data, process.env.JWT_SECRET, {
    expiresIn: '24h'
  })
}

const verify = (token: string): IJWTDate | 'INVALID_TOKEN'  | 'JWT_SECRET_NOT_FOUND'=> {
  if(!process.env.JWT_SECRET) return 'JWT_SECRET_NOT_FOUND'

  try {
    
    const decoded = jwt.verify(token, process.env.JWT_SECRET)

    if(typeof decoded === 'string') {
      return 'INVALID_TOKEN'
    } 
    
    return decoded as IJWTDate
  } catch (error) {
    console.log(error)
    return 'INVALID_TOKEN'
  }


  
}

export const JWTService = {
  sign,
  verify
}