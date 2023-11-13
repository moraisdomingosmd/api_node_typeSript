import { compare, genSalt, hash } from "bcryptjs"

const SALT_RANDOMS = 9

const hasPassword = async (password: string) => {
  const saltGenerated = await genSalt(SALT_RANDOMS)

  return await hash(password, saltGenerated)
  
}

const verifyPassword = async (password: string, hashedPassword: string) => {
  return await compare(password, hashedPassword)
}

export const PasswordCrypto = {
  hasPassword,
  verifyPassword
}