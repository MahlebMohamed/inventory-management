import { icons } from "lucide-react";

interface EmptyStateProps {
  IconComponent: keyof typeof icons;
  message: string;
}

export default function EmptyState({
  IconComponent,
  message,
}: EmptyStateProps) {
  const SelectedIcon = icons[IconComponent];

  return (
    <div className="my-20 flex w-full flex-col items-center justify-center">
      <div className="wiggle-animation">
        <SelectedIcon strokeWidth={1} className="text-primary h-30 w-30" />
      </div>
      <p className="text-sm">{message}</p>
    </div>
  );
}
