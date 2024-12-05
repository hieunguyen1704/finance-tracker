import {
  createMagicLink,
  findMagicLinkByToken,
  markMagicLinkAsUsed,
  deleteExpiredLinks,
} from '../models/magicLink.model'
import crypto from 'crypto'

/**
 * Generate a new magic link for the given email.
 * @param email The email address to generate the magic link for.
 * @returns An object containing the token and expiration date of the magic link.
 */
export const generateMagicLink = async (userId: number) => {
  // Generate a secure random token
  const token = crypto.randomBytes(32).toString('hex')

  // Set the expiration time to 24 hours from now
  const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000)

  // Save the magic link details in the database
  await createMagicLink(userId, token, expiresAt)

  return { token, expiresAt }
}

/**
 * Verify a magic link by token.
 * @param token The token to verify.
 * @returns The email associated with the magic link if valid.
 * @throws Error if the token is invalid, expired, or already used.
 */
export const verifyMagicLink = async (token: string) => {
  // Find the magic link by token
  const magicLink = await findMagicLinkByToken(token)

  if (!magicLink) {
    throw new Error('Magic link not found')
  }

  if (magicLink.isUsed) {
    throw new Error('Magic link already used')
  }

  if (magicLink.expiresAt < new Date()) {
    throw new Error('Magic link expired')
  }

  // Mark the magic link as used
  await markMagicLinkAsUsed(magicLink.id)

  return magicLink.userId
}

/**
 * Clean up expired magic links.
 * @returns The count of deleted magic links.
 */
export const cleanupExpiredLinks = async () => {
  const result = await deleteExpiredLinks()
  return result.count
}
