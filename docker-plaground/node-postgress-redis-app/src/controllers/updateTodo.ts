import { Request, Response, NextFunction } from 'express';
import { prisma } from '@/clients'
import { InventoryUpdateDTOSchema } from '@/validationSchemas'
import { ActionType } from '@prisma/client';

const updateInventory = async (req: Request, res: Response, next: NextFunction) => {
  try {

    // check if inventory exists
    const { id } = req.params
    const inventory = await prisma.inventory.findUnique({
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

    // validate request body
    const parsedBody = InventoryUpdateDTOSchema.safeParse(req.body)
    if (!parsedBody.success) {
      return res.status(400).json({
        status: 'failure',
        statusCode: 400,
        success: false,
        message: 'Invalid Request!',
        errors: parsedBody.error.errors
      })
    }

    // find last history
    const lastHistory = await prisma.history.findFirst({
      where: { inventoryId: id },
      orderBy: { createdAt: 'desc' }
    })

    // calculate new quantity
    let newQuantity = inventory.quantity;
    if (parsedBody.data.actionType === ActionType.IN) {
      newQuantity += parsedBody.data.quantity
    } else {
      newQuantity -= parsedBody.data.quantity
    }

    // update inventory
    const updatedInventory = await prisma.inventory.update({
      where: { id: id },
      data: {
        quantity: newQuantity,
        histories: {
          create: {
            actionType: parsedBody.data.actionType,
            quantityChanged: parsedBody.data.quantity,
            lastQuantity: lastHistory?.newQuantity || 0,
            newQuantity: newQuantity,
          }
        }
      },
      select: {
        id: true,
        quantity: true,
      }
    })

    // send response
    return res.status(200).json({
      status: 'success',
      statusCode: 200,
      success: true,
      message: 'Inventory updated successfully!',
      data: updatedInventory
    })

  } catch (error) {
    next(error)
  }
}

export default updateInventory