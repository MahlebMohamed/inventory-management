"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Pencil } from "lucide-react";
import { useState } from "react";

interface CategoryModalProps {
  title?: string;
  name: string;
  description: string;
  loading: boolean;
  onChangeName: (name: string) => void;
  onChangeDescription: (description: string) => void;
  onSubmit: () => void;
}

export default function CategoryModal({
  title,
  name,
  description,
  loading,
  onChangeName,
  onChangeDescription,
  onSubmit,
}: CategoryModalProps) {
  const [open, setOpen] = useState(false);

  async function handleSubmit() {
    await onSubmit();
    setOpen(false);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">{title ? title : <Pencil />}</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input
              id="name"
              className="col-span-3"
              defaultValue={name}
              onChange={(e) => onChangeName(e.target.value)}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="description" className="text-right">
              Description
            </Label>
            <Input
              id="description"
              className="col-span-3"
              defaultValue={description}
              onChange={(e) => onChangeDescription(e.target.value)}
            />
          </div>
        </div>
        {
          <DialogFooter>
            <Button type="submit" disabled={loading} onClick={handleSubmit}>
              {loading ? "Saving..." : "Save changes"}
            </Button>
          </DialogFooter>
        }
      </DialogContent>
    </Dialog>
  );
}
