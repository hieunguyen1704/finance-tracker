import nodemailer from 'nodemailer'
import dotenv from 'dotenv'
import {
  EMAIL_FROM,
  MAILTRAP_HOST,
  MAILTRAP_PASSWORD,
  MAILTRAP_PORT,
  MAILTRAP_USER,
} from '../../config/dotenv'

dotenv.config()

const transporter = nodemailer.createTransport({
  host: MAILTRAP_HOST,
  port: parseInt(MAILTRAP_PORT || '587'),
  secure: false, // use TLS
  auth: {
    user: MAILTRAP_USER,
    pass: MAILTRAP_PASSWORD,
  },
})

export const sendEmail = async (to: string, subject: string, html: string) => {
  try {
    const info = await transporter.sendMail({
      from: EMAIL_FROM,
      to,
      subject,
      html,
    })
    console.log('Email sent: ' + info.response)
  } catch (error) {
    console.error('Error sending email: ', error)
  }
}
