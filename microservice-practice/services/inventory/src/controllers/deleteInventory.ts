import { prisma } from '@/prisma'
import { NextFunction, Request, Response } from 'express'

const deleteInventory = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params
    const inventory = await prisma.inventory.delete({
      where: { id: id }
    })

    if (!inventory) {
      return res.status(404).json({
        status: 'failure',
        statusCode: 404,
        success: false,
        message: 'Inventory not found!'
      })
    }

    return res.status(200).json({
      status: 'success',
      statusCode: 200,
      message: 'Inventory deleted!',
      success: true,
    })
  } catch (error) {
    next(error)
  }
}

export default deleteInventory