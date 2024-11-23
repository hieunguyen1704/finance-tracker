import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { generateMagicLink, verifyMagicLink } from './magicLinkService'
import * as UserModel from '../models/user'
import { sendEmail } from '../utils/emailService'
import { JWT_SECRET } from '../config/dotenv'

const TOKEN_EXPIRATION = '30d' // JWT token expiration for login

/**
 * Registers a new user.
 * @param email - The email address of the user to register.
 * @param password - The password for the user's account.
 * @param name - The name of the user.
 * @returns An object containing a message indicating successful registration.
 * @throws Error if the user is already registered.
 */
export const registerUser = async (
  email: string,
  password: string,
  name: string,
) => {
  const existingUser = await UserModel.findUserByEmail(email)

  if (existingUser) {
    throw new Error('User already registered')
  }

  const hashedPassword = await bcrypt.hash(password, 10)

  const user = await UserModel.createUser({
    email,
    password: hashedPassword,
    name,
    confirmed: false,
  })

  await sendConfirmationEmail(user.email, user.id)

  return { message: 'Registration successful. Please confirm your email.' }
}

/**
 * Sends a confirmation email with a magic link to verify the user's email address.
 * @param email - The email address of the user to send the confirmation email to.
 * @param userId - The ID of the user for whom the confirmation email is being sent.
 * @returns An object containing a message indicating the email was sent and the expiration date of the magic link.
 */
export const sendConfirmationEmail = async (email: string, userId: number) => {
  const { token, expiresAt } = await generateMagicLink(userId)

  const confirmationUrl = `${process.env.APP_URL}/api/auth/confirm-email?token=${token}`

  await sendEmail(
    email,
    'Confirm Your Email',
    `
        <h1>Welcome!</h1>
    <p>Thank you for signing up. We're excited to have you on board.</p>
    <p>Click <a href="${confirmationUrl}">here</a> to verify your email address.</p>
    `,
  )

  return { message: 'Confirmation email sent', expiresAt }
}

/**
 * Confirms a user's email address with a magic link.
 * @param token - The magic link token.
 * @returns The confirmed user object.
 * @throws Error if the token is invalid, expired, or already used.
 * @throws Error if the user is not found.
 * @throws Error if the email is already confirmed.
 */
export const confirmEmailWithMagicLink = async (token: string) => {
  const userId = await verifyMagicLink(token)

  const user = await UserModel.findUserById(userId)

  if (!user) {
    throw new Error('User not found')
  }

  if (user.confirmed) {
    throw new Error('Email already confirmed')
  }

  return await UserModel.updateUser(user.id, { confirmed: true })
}

  /**
   * Login with email and password.
   * @param email The email of the user.
   * @param password The password of the user.
   * @returns The user object (excluding password) and an access token.
   * @throws Error if the email or password is invalid.
   * @throws Error if the email is not confirmed.
   */
export const loginWithEmail = async (email: string, password: string) => {
  const user = await UserModel.findUserByEmail(email)

  if (!user) {
    throw new Error('Invalid email or password')
  }

  if (!user.confirmed) {
    throw new Error(
      'Email not confirmed. Please check your inbox for the confirmation link.',
    )
  }

  const isPasswordValid = await bcrypt.compare(password, user.password)
  if (!isPasswordValid) {
    throw new Error('Invalid email or password')
  }

  const accessToken = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, {
    expiresIn: TOKEN_EXPIRATION,
  })

  const { password: _, ...safeUser } = user

  return { ...safeUser, accessToken }
}

/**
 * Resend the confirmation email to the user.
 * @param email - The email of the user.
 * @returns Confirmation email details.
 */
export const resendConfirmationEmail = async (email: string) => {
  const user = await UserModel.findUserByEmail(email)

  if (!user) {
    throw new Error('User not found')
  }

  if (user.confirmed) {
    throw new Error('Email is already confirmed')
  }

  const result = await sendConfirmationEmail(user.email, user.id)

  return result
}
