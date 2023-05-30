"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";

const Logo = () => {
  const router = useRouter();

  return (
    <Image
      src="/logo.png"
      alt="Logo"
      width={150}
      height={150}
      priority
      style={{ width: "auto", height: "auto", objectFit: "contain" }}
      className="cursor-pointer"
      onClick={() => router.push("/")}
    />
  );
};

export default Logo;
