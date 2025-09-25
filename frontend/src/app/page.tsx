import Card from "@/components/Card";
import Header from "@/components/Header";
import { getFlights } from "../utils/fetch";

const { data: flights } = await getFlights();


export default function Home() {
  return (
    <main className="bg-[#1A1A1A] min-h-screen p-[63px] flex flex-col">

      <Header />

      <div className="w-[468px] h-[58px] font-sora mt-24">

        <h2 className="font-bold text-[24px] leading-[110.00000000000001%] text-[#FFFFFF] mb-3">Histórico de Voos</h2>

        <p className="font-normal text-[18px] leading-[110.00000000000001%] text-[#E0E0E0]">Visualize seu histórico completo de voos realizados</p>

      </div>

      <div className="flex justify-center">
        <Card flightsData={flights} className="mt-12" />
      </div>

    </main>
  );
}
