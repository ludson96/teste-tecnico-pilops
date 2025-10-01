import Link from "next/link";
import Header from "@/components/Header";
import { getFlightDetails } from "@/api/flights";
import { formatDate } from "@/utils/formatDate";
import { formatCurrency } from "@/utils/formatBalance";
import Image from "next/image";


export default async function FlightDetailsPage({ params }: { params: { id: string } }) {

  // @ts-ignore
  const { id } = await params
  const { aircraft, flightData } = await getFlightDetails(id);

  return (
    <main className="bg-[#1A1A1A] min-h-screen p-8 md:p-[63px] flex flex-col items-center text-white">
      <Header />

      <div className="w-full max-w-[1147px] mt-15">
        <div className="mb-12 flex items-center gap-4">
          <Link href="/flights">
            <Image src="/arrow.svg" alt="Voltar para a lista de voos" width={32} height={32} />
          </Link>
          <span className="text-[#FFFFFF] font-bold text-[24px] font-sora"> Detalhes do voo </span>
        </div>

        {/* Recompensas */}
        <section className="bg-[#212121] rounded-[5px] border-[1px] border-[#444444] pt-4 px-6 pb-8 flex flex-col gap-6">

          {/* Título da Seção */}
          <div className="flex items-center gap-2">
            <Image src="/trophy.svg" alt="Troféu" width={24} height={24} />
            <h3 className="text-white font-bold text-[18px] font-sora">Recompensas</h3>
          </div>

          {/* Itens de Recompensa */}
          <div className="flex flex-col md:flex-row md:justify-between gap-8">

            {/* Ganhos Totais */}
            <div className="flex items-center gap-3">
              <Image src="/coin.svg" alt="Moeda" width={48} height={48} />
              <div>
                <p className="text-gray-400 text-sm uppercase">Ganhos totais</p>
                <p className={`text-3xl font-bold ${flightData.balance >= 0 ? 'text-[#00FF88]' : 'text-[#FF0000]'}`}>
                  {formatCurrency(flightData.balance)}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Image src="/star.svg" alt="Star" width={48} height={48} />
              <div>
                <p className="text-gray-400 text-sm uppercase">XP Conquistado</p>
                <p className="text-3xl font-bold">{flightData.xp}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Image src="/award.svg" alt="Award" width={48} height={48} />
              <div>
                <p className="text-gray-400 text-sm uppercase">Bônus de missão</p>
                <p className="text-3xl font-bold">{flightData.missionBonus * 100}%</p>
              </div>
            </div>

          </div>
        </section>

        {/* Detalhes do voo */}
        <section className="bg-[#212121] rounded-[5px] border-[1px] border-[#444444] pt-[16px] pr-[24px] pb-[24px] pl-[24px] grid grid-cols-2 md:grid-cols-4 items-center gap-[24px] font-manrope text-[#FFFFFF] w-[1147px] h-[94px] mt-[31px]">

          <div className="col-span-2 md:col-span-1">
            <p className="font-semibold text-[16px]">{aircraft.name}</p>
            <p className="text-[#E0E0E0] text-[14px] font-normal">Gol Linhas Aéreas (GOL)</p>
          </div>

          <div className="hidden md:flex flex-col items-center">
            <p className="text-xs text-[#E0E0E0] mb-1">Trajeto</p>
            <div className="flex items-center">
              <span className="text-[14px] text-[#FFFFFF]">{flightData.route.from}</span>
              <div className="w-12 h-0.5 bg-yellow-500 mx-2 rounded-full relative">
                <div className="w-2.5 h-2.5 bg-yellow-500 rounded-full absolute -left-1 -top-1"></div>
                <div className="w-2.5 h-2.5 bg-yellow-500 rounded-full absolute -right-1 -top-1"></div>
              </div>
              <span className="text-[14px] text-[#FFFFFF]">{flightData.route.to}</span>
            </div>
          </div>

          <div className="text-left md:text-center">
            <p className="text-xs text-[#E0E0E0] mb-1">Matrícula</p>
            <p className="text-[16px] font-semibold text-[#FFFFFF]">{aircraft.registration}</p>
          </div>

          <div className="text-left md:text-center">
            <p className="text-xs text-[#E0E0E0] mb-1">Data</p>
            <p className="text-[16px] text-[#FFFFFF] font-semibold">{formatDate(flightData.date)}</p>
          </div>
        </section>
      </div>
    </main>
  );
}
