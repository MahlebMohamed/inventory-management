import { Avatar, AvatarImage } from "@/components/ui/avatar";

interface ProductImageProps {
  src: string;
  alt: string;
  heihtClass?: string;
  widthClass?: string;
}

export default function ProductImage({
  src,
  alt,
  heihtClass,
  widthClass,
}: ProductImageProps) {
  return (
    <Avatar className={`${heihtClass} ${widthClass}`}>
      <AvatarImage
        src={src}
        alt={alt}
        className="object-cover"
        height={500}
        width={500}
      />
    </Avatar>
  );
}
