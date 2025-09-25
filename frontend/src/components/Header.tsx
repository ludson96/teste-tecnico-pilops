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

    </header>
  );
}