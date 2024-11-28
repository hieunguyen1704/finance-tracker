import prisma from '../config/database'

export const getAllCategories = async () => {
  return await prisma.category.findMany({
    select: {
      id: true,
      name: true,
      createdAt: true,
      updatedAt: true,
    },
  })
}
