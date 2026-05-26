import Image from "next/image";

/** aproch.org images skip the optimizer to avoid upstream timeouts and preserve source quality. */
export default function GalleryImage({ src, alt, className }) {
  return (
    <Image
      src={src}
      alt={alt}
      width={800}
      height={800}
      quality={90}
      sizes="(max-width: 600px) 100vw, (max-width: 1200px) 50vw, 280px"
      className={className}
      unoptimized={src.includes("aproch.org")}
    />
  );
}
