import Image from "next/image";
import { urlFor } from "@/lib/sanity/image";
import type { SanityImage as SanityImageValue } from "@/lib/sanity/types";

interface SanityImageProps {
  value: SanityImageValue;
  width?: number;
  height?: number;
  fill?: boolean;
  className?: string;
  priority?: boolean;
  sizes?: string;
}

export function SanityImage({
  value,
  width = 1200,
  height,
  fill,
  className,
  priority,
  sizes,
}: SanityImageProps) {
  if (!value?.asset) return null;

  const intrinsicHeight = value.asset.metadata?.dimensions?.height;
  const intrinsicWidth = value.asset.metadata?.dimensions?.width;
  const aspectHeight =
    height ??
    (intrinsicHeight && intrinsicWidth
      ? Math.round((width * intrinsicHeight) / intrinsicWidth)
      : Math.round(width / 1.5));

  const url = urlFor(value).width(width).fit("max").url();

  return (
    <Image
      src={url}
      alt={value.alt || ""}
      fill={fill}
      width={fill ? undefined : width}
      height={fill ? undefined : aspectHeight}
      className={className}
      priority={priority}
      sizes={sizes}
      placeholder={value.asset.metadata?.lqip ? "blur" : "empty"}
      blurDataURL={value.asset.metadata?.lqip}
    />
  );
}
