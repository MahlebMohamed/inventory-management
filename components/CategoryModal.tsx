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

interface CategoryModalProps {
  name: string;
  description: string;
  loading: boolean;
  onChangeName: (name: string) => void;
  onChangeDescription: (description: string) => void;
  onSubmit: () => void;
  editMode?: boolean;
}

export default function CategoryModal({
  name,
  description,
  loading,
  onChangeName,
  onChangeDescription,
  onSubmit,
  editMode,
}: CategoryModalProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Create Category</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {editMode ? "Edit Category" : "Create Category"}
          </DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input
              id="name"
              className="col-span-3"
              value={name}
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
              value={description}
              onChange={(e) => onChangeDescription(e.target.value)}
            />
          </div>
        </div>
        {
          <DialogFooter>
            <Button type="submit" disabled={loading} onClick={onSubmit}>
              {loading ? "Saving..." : "Save changes"}
            </Button>
          </DialogFooter>
        }
      </DialogContent>
    </Dialog>
  );
}
