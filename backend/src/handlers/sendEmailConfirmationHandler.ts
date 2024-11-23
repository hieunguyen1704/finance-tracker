import { sendConfirmationEmail } from '../services/authService'

export interface SendConfirmationEmailMessage {
  email: string
  userId: number
}

export const processSendConfirmationEmail = async (
  message: SendConfirmationEmailMessage,
) => {
  const { email, userId } = message
  const result = await sendConfirmationEmail(email, userId)
  console.log(result)
}
