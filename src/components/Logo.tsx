import Image from "next/image";

type LogoProps = {
  variant?: "gradient" | "white";
  className?: string;
  width?: number;
  height?: number;
  priority?: boolean;
};

export function Logo({
  variant = "gradient",
  className,
  width = 140,
  height = 28,
  priority = false,
}: LogoProps) {
  const src =
    variant === "white"
      ? "/assets/logotype-white.svg"
      : "/assets/logotype-gradient.svg";

  return (
    <Image
      src={src}
      alt="Solarius"
      width={width}
      height={height}
      className={className}
      priority={priority}
    />
  );
}
