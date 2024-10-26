import config from "@/config";
import { prisma } from "@/prisma";
import axios from "axios";
import { NextFunction, Request, Response } from "express";

const getSingleProducts = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params
    const product = await prisma.product.findUnique({
      where: { id: id }
    })

    if (!product) {
      return res.status(404).json({
        status: 'failure',
        statusCode: 404,
        success: false,
        message: 'Product not found!',
      })
    }

    // if product has no inventory
    if (product.inventoryId === null) {
      // create inventory for this product
      const { data: inventory } = await axios.post(config.inventoryUrl + '/inventories', {
        productId: product.id,
        sku: product.sku,
      })

      console.log('inventory created', inventory.data.id)

      // update the product and store the inventory id
      await prisma.product.update({
        where: { id: product.id },
        data: { inventoryId: inventory.data.id }
      })

      return res.status(200).json({
        status: 'success',
        statusCode: 200,
        success: true,
        message: 'Product fetched successfully!',
        data: {
          ...product,
          inventoryId: inventory.id,
          stock: inventory.stock || 0,
          stockStatus: inventory.quantity > 0 ? 'in stock' : 'out of stock'
        }
      })
    }

    // if product has inventory
    const { data: inventory } = await axios.get(config.inventoryUrl + '/inventories/' + product.inventoryId)

    return res.status(200).json({
      status: 'success',
      statusCode: 200,
      success: true,
      message: 'Products fetched successfully!',
      data: {
        ...product,
        inventoryId: inventory.data.id,
        stock: inventory.data.stock || 0,
        stockStatus: inventory.data.quantity > 0 ? 'in stock' : 'out of stock'
      }
    })

  } catch (error) {
    next(error)
  }
}

export default getSingleProducts;