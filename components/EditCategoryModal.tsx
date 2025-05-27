import CategoryModal from "@/components/CategoryModal";
import { Category } from "@prisma/client";
import { useState } from "react";

interface EditCategoryModalProps {
  category: Category;
  loading: boolean;
  onUpdate: (id: string, name: string, description: string) => Promise<void>;
}

export default function EditCategoryModal({
  category,
  loading,
  onUpdate,
}: EditCategoryModalProps) {
  const [name, setName] = useState(category.name);
  const [description, setDescription] = useState(category.description);

  async function handleSubmit() {
    await onUpdate(category.id, name, description);
  }

  return (
    <CategoryModal
      name={name}
      description={description}
      loading={loading}
      onChangeName={setName}
      onChangeDescription={setDescription}
      onSubmit={handleSubmit}
    />
  );
}
