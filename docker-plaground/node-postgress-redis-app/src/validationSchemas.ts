import { z } from "zod";

export const TodoCreateDTOSchema = z.object({
  title: z.string().min(3).max(255)
})

export type TodoCreateDTO = z.infer<typeof TodoCreateDTOSchema>;

export const TodoUpdateDTOSchema = z.object({
  title: z.string().min(3).max(255).optional(),
  completed: z.boolean().optional()
})

export type TodoUpdateDTO = z.infer<typeof TodoUpdateDTOSchema>;