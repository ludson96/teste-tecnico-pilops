import Image from "next/image";

export default function Header() {
  return (
    <header>

      <Image
        src="/logo-pilops.svg"
        alt="Pilops Logo"
        width={292}
        height={89.27070617675781}
        className="mx-auto"
      />

      <div className="w-[468px] h-[58px] absolute top-[214px] left-[66px] font-sora">

        <h2 className="font-bold text-[24px] leading-[110.00000000000001%] text-[#FFFFFF] mb-3">Histórico de Voos</h2>

        <p className="font-normal text-[18px] leading-[110.00000000000001%] text-[#E0E0E0]">Visualize seu histórico completo de voos realizados</p>

      </div>

    </header>
  );
}
// background: #E0E0E0;
