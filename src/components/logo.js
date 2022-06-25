import Image from "next/image";

export const Logo = ({ width, height }) => {
  return <Image src="/logo.png" alt="Logo" width={width} height={height} />;
};
