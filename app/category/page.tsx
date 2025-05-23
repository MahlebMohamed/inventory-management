"use client";

import CategoryModal from "@/components/CategoryModal";
import Wrapper from "@/components/Wapper";
import { useUser } from "@clerk/nextjs";
import { useState } from "react";
import { createCategory } from "../actions";
import { toast } from "react-toastify";

export default function Page() {
  const { user } = useUser();
  const email = user?.primaryEmailAddress?.emailAddress as string;

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [editMode, setEditMode] = useState(false);

  function handleCreateCategory() {
    setLoading(true);
    if (email) await createCategory(name, email, description);

    setLoading(false);
    toast.success("Category created successfully");
  }

  return (
    <Wrapper>
      <div>
        <div className="mb-4">
          <CategoryModal
            name={name}
            description={description}
            loading={loading}
            onChangeName={setName}
            onChangeDescription={setDescription}
            onSubmit={() => setLoading(true)}
            editMode={editMode}
          />
        </div>
      </div>
    </Wrapper>
  );
}
