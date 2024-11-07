import { prisma } from '@/clients'
import { Request, Response, NextFunction } from 'express'

const getAllInventories = async (req: Request, res: Response, next: NextFunction) => {
  try {

    const query = req.query

    const inventories = await prisma.inventory.findMany({
      where: query
    })

    res.status(200).json({
      status: 'success',
      statusCode: 200,
      success: true,
      message: 'All inventories fetched successfully!',
      data: inventories
    })

  } catch (error) {
    next(error)
  }
}


export default getAllInventories