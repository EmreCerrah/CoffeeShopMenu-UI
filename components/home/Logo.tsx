import Image from "next/image";

const LOGO_PATH = "/resources/LABIANCO_LOGO.webp";
const LOGO_ALT = "Labianco Logo";

export const Logo = () => {
  return (
    <div 
    className="relative w-60 h-60 mx-auto mb-8 animate-pulse" 
  >
    <Image
      src={LOGO_PATH}
      alt={LOGO_ALT}
      fill
      className="object-cover rounded-full"
      priority
      sizes="(max-width: 240px) 100vw, 240px"
      quality={90}
    />
  </div>
  );
};