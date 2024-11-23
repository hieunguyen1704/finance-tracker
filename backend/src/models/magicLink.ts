import prisma from '../config/database'

export const createMagicLink = async (
  userId: number,
  token: string,
  expiresAt: Date,
) => {
  return await prisma.magicLink.create({
    data: {
      userId,
      token,
      expiresAt,
    },
  })
}

export const findMagicLinkByToken = async (token: string) => {
  return await prisma.magicLink.findUnique({
    where: { token },
  })
}

export const markMagicLinkAsUsed = async (id: number) => {
  return await prisma.magicLink.update({
    where: { id },
    data: { isUsed: true },
  })
}

export const deleteExpiredLinks = async () => {
  return await prisma.magicLink.deleteMany({
    where: {
      expiresAt: { lt: new Date() },
      isUsed: false,
    },
  })
}
