import { Request, Response, NextFunction, RequestHandler } from 'express';
import { prisma } from '@/clients'
import { InventoryCreateDTOSchema } from '@/validationSchemas'

const createInventory = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // validate request body
    const parsedBody = InventoryCreateDTOSchema.safeParse(req.body)
    if (!parsedBody.success) {
      return res.status(400).json({
        status: 'failure',
        statusCode: 400,
        success: false,
        message: 'Invalid Request!',
        errors: parsedBody.error.errors
      })
    }

    // create inventory
    const inventory = await prisma.inventory.create({
      data: {
        ...parsedBody.data, histories: {
          create: {
            actionType: 'IN',
            quantityChanged: parsedBody.data.quantity,
            lastQuantity: 0,
            newQuantity: parsedBody.data.quantity,
          }
        }
      },
      select: {
        id: true,
        quantity: true,
      }
    })

    // send response
    return res.status(201).json({
      status: 'success',
      statusCode: 201,
      success: true,
      message: 'Inventory created successfully!',
      data: inventory
    })

  } catch (error) {
    next(error)
  }
}

export default createInventory