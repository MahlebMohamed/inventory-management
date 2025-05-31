"use server";

import prisma from "@/lib/prisma";
import { FormDataType, Product } from "../type";
import { getAssociations } from "./category.actions";

export async function createProduct(formData: FormDataType, email: string) {
  try {
    const {
      id,
      name,
      description,
      price,
      categoryId,
      unit = "",
      imageUrl = "",
    } = formData;
    if (!id || !name || !categoryId || !email)
      throw new Error("Missing required fields");

    const association = await getAssociations(email);
    if (!association) throw new Error("Association not found");

    await prisma.product.create({
      data: {
        name,
        description,
        price: Number(price),
        categoryId,
        unit,
        imageUrl,
        associationId: association.id,
      },
    });
  } catch (error) {
    console.error(error);
  }
}

export async function updateProduct(formData: FormDataType, email: string) {
  try {
    const { id, name, description, price, imageUrl = "" } = formData;
    if (!id || !name || !email) throw new Error("Missing required fields");

    const association = await getAssociations(email);
    if (!association) throw new Error("Association not found");

    await prisma.product.update({
      where: { id, associationId: association.id },
      data: {
        name,
        description,
        price: Number(price),
        imageUrl,
      },
    });
  } catch (error) {
    console.error(error);
  }
}

export async function deleteProduct(id: string, email: string) {
  if (!id || !email) return;

  try {
    const association = await getAssociations(email);
    if (!association) throw new Error("Association not found");

    await prisma.product.delete({
      where: { id, associationId: association.id },
    });
  } catch (error) {
    console.error(error);
  }
}

export async function readProducts(
  email: string,
): Promise<Product[] | undefined> {
  if (!email) return;

  try {
    const association = await getAssociations(email);
    if (!association) throw new Error("Association not found");

    const products = await prisma.product.findMany({
      where: { associationId: association.id },
      include: { category: true },
    });

    return products.map((product) => ({
      ...product,
      categoryName: product.category?.name,
    }));
  } catch (error) {
    console.error(error);
  }
}

export async function readProductById(
  id: string,
  email: string,
): Promise<Product | undefined> {
  if (!id || !email) return;

  try {
    const association = await getAssociations(email);
    if (!association) throw new Error("Association not found");

    const product = await prisma.product.findUnique({
      where: { id, associationId: association.id },
      include: { category: true },
    });

    if (!product) throw new Error("Product not found");

    return {
      ...product,
      categoryName: product.category?.name,
    };
  } catch (error) {
    console.error(error);
  }
}
