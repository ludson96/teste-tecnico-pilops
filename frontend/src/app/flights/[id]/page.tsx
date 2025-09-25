import Link from "next/link";
import Header from "@/components/Header";
import { getFlightDetails } from "@/utils/fetch";
import { formatDate } from "@/utils/formatDate";
import { formatBalance } from "@/utils/formatBalance";
import Image from "next/image";


export default async function FlightDetailsPage({ params }: { params: { id: string } }) {

  const { aircraft, flightData } = await getFlightDetails(params.id);

  return (
    <main className="bg-[#1A1A1A] min-h-screen p-8 md:p-[63px] flex flex-col items-center text-white">
      <Header />

      <div className="w-full max-w-[1147px] mt-15">
        <div className="mb-12">
          <Link href="/" className="flex items-center gap-4">
            <Image src="/arrow.svg" alt="Arrow" width={32} height={32} />
            <span className="text-[#FFFFFF] font-bold text-[24px] font-sora"> Detalhes do voo </span>
          </Link>
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
                <p className={`text-3xl font-bold ${flightData.balance >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                  {formatBalance(flightData.balance)}
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
        <section className="mt-6 bg-zinc-900 rounded-lg p-6 flex flex-col gap-4">
          <div>
            <p className="font-semibold">{aircraft.name}</p>
            <p className="text-gray-400 text-sm">Gol Linhas Aéreas (GOL)</p>
          </div>

          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
            <div>
              <p className="text-gray-400 text-sm">Trajeto</p>
              <p className="font-semibold">{flightData.route.from} → {flightData.route.to}</p>
            </div>
            <div>
              <p className="text-gray-400 text-sm">Matrícula</p>
              <p className="font-semibold">{aircraft.registration}</p>
            </div>
            <div>
              <p className="text-gray-400 text-sm">Data</p>
              <p className="font-semibold">{formatDate(flightData.date)}</p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
