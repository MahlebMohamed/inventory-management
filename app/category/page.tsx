"use client";

import CategoryModal from "@/components/CategoryModal";
import Wrapper from "@/components/Wapper";
import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import {
  createCategory,
  deleteCategory,
  readCategories,
  updateCategory,
} from "../actions";
import { toast } from "react-toastify";
import { Category } from "@prisma/client";
import EmptyState from "@/components/EmptyState";
import EditCategoryModal from "@/components/EditCategoryModal";
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";

export default function Page() {
  const { user } = useUser();
  const email = user?.primaryEmailAddress?.emailAddress as string;

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState<Category[] | null>([]);

  async function loadCategories() {
    if (email) {
      const data = await readCategories(email);
      if (data) setCategories(data);
    }
  }

  async function handleCreateCategory() {
    setLoading(true);
    if (email) await createCategory(name, email, description);

    await loadCategories();

    setLoading(false);
    toast.success("Category created successfully");
  }

  async function handleUpdateCategory(
    id: string,
    name: string,
    description: string,
  ) {
    if (!id) return;

    setLoading(true);
    if (email) await updateCategory(id, name, email, description);

    await loadCategories();

    setLoading(false);
    setName("");
    setDescription("");
    toast.success("Category edition successfully");
  }

  async function handleDeleteCategory(id: string) {
    if (!id) return;

    setLoading(true);
    if (email) await deleteCategory(id, email);

    await loadCategories();

    setLoading(false);
    toast.success("Category deleted successfully");
  }

  useEffect(() => {
    loadCategories();
  }, [email]);

  return (
    <Wrapper>
      <div>
        <div className="mb-8">
          <CategoryModal
            title="Create Category"
            name={name}
            description={description}
            loading={loading}
            onChangeName={setName}
            onChangeDescription={setDescription}
            onSubmit={handleCreateCategory}
          />
        </div>

        {categories?.length === 0 ? (
          <EmptyState
            IconComponent="Group"
            message="You don't have any category yet"
          />
        ) : (
          <>
            {categories?.map((category) => (
              <div
                key={category.id}
                className="border-primary hover:bg-muted mb-5 flex cursor-pointer items-center justify-between gap-2 rounded-3xl border-2 px-6 py-4"
              >
                <div className="flex items-center gap-2">
                  <strong className="text-xl">{category.name}</strong>
                  <p className="text-sm">{category.description}</p>
                </div>
                <div className="flex gap-2">
                  <EditCategoryModal
                    category={category}
                    loading={loading}
                    onUpdate={handleUpdateCategory}
                  />
                  <Button
                    variant={"destructive"}
                    onClick={() => handleDeleteCategory(category.id)}
                  >
                    <Trash className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </>
        )}
      </div>
    </Wrapper>
  );
}
