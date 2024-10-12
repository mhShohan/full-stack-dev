import { PrismaClient } from '@prisma/client'

export const prisma = new PrismaClient()

class PrismaService {
  prisma = prisma
}

export default PrismaService
