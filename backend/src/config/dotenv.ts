import dotenv from 'dotenv'

dotenv.config()

export const JWT_SECRET = process.env.JWT_SECRET!
export const MAILTRAP_USER = process.env.MAILTRAP_USER!
export const MAILTRAP_PASSWORD = process.env.MAILTRAP_PASSWORD!
export const MAILTRAP_HOST = process.env.MAILTRAP_HOST!
export const MAILTRAP_PORT = process.env.MAILTRAP_PORT!
export const EMAIL_FROM = process.env.EMAIL_FROM!
export const APP_URL = process.env.APP_URL!
