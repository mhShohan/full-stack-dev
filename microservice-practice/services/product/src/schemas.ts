import { Status } from "@prisma/client";
import { z } from "zod";

export const ProductCreateDTOSchema = z.object({
  sku: z.string().min(3).max(15),
  name: z.string().min(3).max(255),
  description: z.string().min(3).max(1000).optional(),
  price: z.number().optional().default(0),
  status: z.nativeEnum(Status).optional().default(Status.DRAFT),
})
