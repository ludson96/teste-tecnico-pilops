import Card from "@/components/Card";
import Header from "@/components/Header";
import { getFlights } from "@/utils/fetch";

const { data: flights } = await getFlights();

export default function Home() {
  return (
    <main className="bg-[#1A1A1A] min-h-screen p-8 md:p-[63px] flex flex-col items-center">

      <Header />

      <div className="w-full max-w-[1147px] mt-24">

        <div className="w-full md:w-[468px] h-auto md:h-[58px] mb-12 font-sora">
          <h2 className="font-bold text-[24px] leading-[110%] text-[#FFFFFF] mb-3 font-sora">Histórico de Voos</h2>
          <p className="font-normal text-[18px] leading-[110%] text-[#E0E0E0] font-sora">Visualize seu histórico completo de voos realizados</p>
        </div>

        <Card flightsData={flights} />
      </div>

    </main>
  );
}
