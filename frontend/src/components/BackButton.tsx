"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";

export default function BackButton() {
  const router = useRouter();

  return (
    <button
      type="button"
      onClick={() => router.back()}
      aria-label="Voltar para a página anterior"
      className="transition-transform duration-200 ease-in-out hover:scale-110 cursor-pointer"
    >
      <Image src="/arrow.svg" alt="Seta para voltar" width={32} height={32} />
    </button>
  );
}