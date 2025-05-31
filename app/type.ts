import { Product as PrismaProduct } from "@prisma/client";
import { z } from "zod";

export interface Product extends PrismaProduct {
  categoryName: string;
}

export interface FormDataType {
  id?: string;
  name: string;
  description: string;
  price: number;
  quantity?: number;
  categoryId?: string;
  categoryName?: string;
  unit?: string;
  imageUrl?: string;
}

export const productSchema = z.object({
  id: z.string().uuid().optional(),
  name: z.string().min(3, "Le nom est obligatoire"),
  description: z.string().min(3, "La description est obligatoire"),
  price: z.number(),
  categoryName: z.string().optional(),
  categoryId: z.string().uuid().optional(),
  unit: z.string().optional(),
  // imageUrl: z.string().min(1, "L'image est obligatoire"),
});

export type ProductFormValues = z.infer<typeof productSchema>;
