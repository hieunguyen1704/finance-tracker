import prisma from '../config/database'

/**
 * Find a user by email.
 * @param email - The email of the user.
 * @returns The user object (excluding password) or null if not found.
 */
export const findUserByEmail = async (email: string) => {
  return prisma.user.findUnique({
    where: { email },
    select: {
      id: true,
      email: true,
      confirmed: true,
      createdAt: true,
      updatedAt: true,
      password: true,
      name: true,
    },
  })
}

export const findUserById = async (id: number) => {
  return prisma.user.findUnique({
    where: { id },
    select: {
      id: true,
      email: true,
      confirmed: true,
      createdAt: true,
      updatedAt: true,
      password: true,
      name: true,
    },
  })
}

/**
 * Create a new user.
 * @param userData - Data to create the user.
 * @returns The created user object (excluding password).
 */
export const createUser = async (userData: {
  email: string
  password: string
  confirmed: boolean
  name: string
}) => {
  const newUser = await prisma.user.create({
    data: userData,
  })

  // Exclude password from the returned object
  const { password, ...safeUser } = newUser
  return safeUser
}

/**
 * Update an existing user.
 * @param userId - The ID of the user to update.
 * @param updateData - Data to update the user.
 * @returns The updated user object (excluding password).
 */
export const updateUser = async (
  userId: number,
  updateData: Partial<{
    email: string
    password: string
    confirmed: boolean
  }>,
) => {
  const updatedUser = await prisma.user.update({
    where: { id: userId },
    data: updateData,
  })

  // Exclude password from the returned object
  const { password, ...safeUser } = updatedUser
  return safeUser
}
