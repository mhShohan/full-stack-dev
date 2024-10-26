import { prisma } from "@/prisma";
import { ProductCreateDTOSchema } from "@/schemas";
import { NextFunction, Request, Response } from "express";
import axios from 'axios'
import config from "@/config";

const createProduct = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // validate request body
    const parsedBody = ProductCreateDTOSchema.safeParse(req.body)
    if (!parsedBody.success) {
      return res.status(400).json({
        status: 'failure',
        statusCode: 400,
        success: false,
        message: 'Invalid Request!',
        errors: parsedBody.error.errors
      })
    }

    // check if product with sku already exists
    const existingProduct = await prisma.product.findUnique({
      where: {
        sku: parsedBody.data.sku
      }
    })
    if (existingProduct) {
      return res.status(400).json({
        status: 'failure',
        statusCode: 400,
        success: false,
        message: 'Product with SKU already exists!',
      })
    }

    // create product
    const product = await prisma.product.create({
      data: parsedBody.data
    })

    console.log('product created', product.id)

    // create inventory for this product
    const { data: inventory } = await axios.post(config.inventoryUrl + '/inventories', {
      productId: product.id,
      sku: product.sku,
    })

    console.log('inventory created', inventory.data.id)

    // update the product and store the inventory id
    const updatedProduct = await prisma.product.update({
      where: { id: product.id },
      data: { inventoryId: inventory.data.id }
    })


    return res.status(201).json({
      status: 'success',
      statusCode: 201,
      success: true,
      message: 'Product created successfully!',
      data: updatedProduct
    })
  } catch (error) {
    console.log('product', error)
    next(error)
  }
}


export default createProduct;