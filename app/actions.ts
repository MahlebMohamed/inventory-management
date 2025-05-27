"use server";

import prisma from "@/lib/prisma";
import { Category } from "@prisma/client";

export async function checkAndAddAssociation(email: string, name: string) {
  if (!email) return;

  try {
    const existingAssociation = await prisma.association.findUnique({
      where: {
        email,
      },
    });

    if (!existingAssociation && name) {
      await prisma.association.create({
        data: {
          email,
          name,
        },
      });
    }
  } catch (error) {
    console.error(error);
  }
}

export async function getAssociations(email: string) {
  if (!email) return;

  try {
    const associations = await prisma.association.findUnique({
      where: {
        email,
      },
    });

    return associations;
  } catch (error) {
    console.error(error);
  }
}

export async function createCategory(
  name: string,
  email: string,
  description?: string,
) {
  if (!name) return;

  try {
    const association = await getAssociations(email);
    if (!association) throw new Error("Association not found");

    await prisma.category.create({
      data: {
        name,
        description: description || "",
        associationId: association.id,
      },
    });
  } catch (error) {
    console.error(error);
  }
}

export async function updateCategory(
  id: string,
  name: string,
  email: string,
  description: string,
) {
  if (!id) return;

  try {
    const association = await getAssociations(email);
    if (!association) throw new Error("Association not found");

    await prisma.category.update({
      where: { id, associationId: association.id },
      data: {
        name,
        description,
        associationId: association.id,
      },
    });
  } catch (error) {
    console.error(error);
  }
}

export async function deleteCategory(id: string, email: string) {
  if (!id || !email) return;

  try {
    const association = await getAssociations(email);
    if (!association) throw new Error("Association not found");

    await prisma.category.delete({
      where: { id, associationId: association.id },
    });
  } catch (error) {
    console.error(error);
  }
}

export async function readCategories(
  email: string,
): Promise<Category[] | undefined> {
  if (!email) return;

  try {
    const association = await getAssociations(email);
    if (!association) throw new Error("Association not found");

    const categories = await prisma.category.findMany({
      where: { associationId: association.id },
    });

    return categories;
  } catch (error) {
    console.error(error);
  }
}
