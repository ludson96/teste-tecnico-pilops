import { IFlight } from "@/interfaces/IFlight";
import { formatDate } from "@/utils/formatDate";
import { formatBalance } from "@/utils/formatBalance";

export default function Card({ flightsData, className }: { flightsData: IFlight[]; className?: string }) {
  return (
    <section className={className}>
      {/* Lista de Voos */}
      <div className="space-y-[21px]">
        {flightsData.map((flight) => (
          <div key={flight.id} className="bg-[#212121] rounded-[5px] border-[1px] border-[#444444] pt-[16px] pr-[24px] pb-[24px] pl-[24px] grid grid-cols-2 md:grid-cols-5 items-center gap-[24px] font-manrope text-[#FFFFFF] w-[1147px] h-[94px]">

            {/* Coluna 1: Aeronave */}
            <div className="col-span-2 md:col-span-1">
              <p className="font-semibold text-[16px]">{flight.aircraft.name}</p>
              <p className="text-[#E0E0E0] text-[14px] font-normal">Gol Linhas Aéreas (GOL)</p>
            </div>

            {/* Coluna 2: Trajeto */}
            <div className="hidden md:flex flex-col items-center">
              <p className="text-xs text-[#E0E0E0] mb-1">Trajeto</p>
              <div className="flex items-center">
                <span className="text-[14px] text-[#FFFFFF]">{flight.flightData.route.from}</span>
                <div className="w-12 h-0.5 bg-yellow-500 mx-2 rounded-full relative">
                  <div className="w-2.5 h-2.5 bg-yellow-500 rounded-full absolute -left-1 -top-1"></div>
                  <div className="w-2.5 h-2.5 bg-yellow-500 rounded-full absolute -right-1 -top-1"></div>
                </div>
                <span className="text-[14px] text-[#FFFFFF]">{flight.flightData.route.to}</span>
              </div>
            </div>

            {/* Coluna 3: Matrícula */}
            <div className="text-left md:text-center">
              <p className="text-xs text-[#E0E0E0] mb-1">Matrícula</p>
              <p className="text-[16px] font-semibold text-[#FFFFFF]">{flight.aircraft.registration}</p>
            </div>

            {/* Coluna 4: Data */}
            <div className="text-left md:text-center">
              <p className="text-xs text-[#E0E0E0] mb-1">Data</p>
              <p className="text-[16px] text-[#FFFFFF] font-semibold">{formatDate(flight.flightData.date)}</p>
            </div>

            {/* Coluna 5: Saldo */}
            <div className="text-left md:text-center">
              <p className="text-xs text-[#E0E0E0] mb-1">Saldo</p>
              <p className={`font-bold text-[16px] ${flight.flightData.balance >= 0 ? 'text-[#00FF88]' : 'text-[#FF0000]'}`}>
                {formatBalance(flight.flightData.balance)}
              </p>
            </div>

          </div>
        ))}
      </div>
    </section>
  );
}
