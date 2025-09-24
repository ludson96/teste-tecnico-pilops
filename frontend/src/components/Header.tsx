import Image from "next/image";

export default function Header() {
  return (
    <header className="text-center py-12">

      <Image
        src="/logo-pilops.svg"
        alt="Pilops Logo"
        width={197.43}
        height={57.47}
        className="mx-auto"
      />

      <p className="font-manrope font-normal text-[15px] leading-[140%]">Your virtual pilot career for Flight Simulator</p>

      <h2 className="text-4xl font-bold">Histórico de Voos</h2>

      <p className="text-gray-400 mt-2 mb-8">Visualize seu histórico completo de voos realizados</p>

    </header>
  );
}

// font-family: Manrope;
