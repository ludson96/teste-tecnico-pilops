import { IFlight } from "@/interfaces/IFlight";

export default function Card({ flightsData, className }: { flightsData: IFlight[]; className?: string }) {
  return (
    <section className={className}>
      {/* Lista de Voos */}
      <div className="space-y-[21px]">
        {flightsData.map((flight, index) => (
          <div key={index} className="bg-[#212121] rounded-[5px] border-[1px] border-[#444444] pt-[16px] pr-[24px] pb-[24px] pl-[24px] grid grid-cols-2 md:grid-cols-5 items-center gap-[24px]">

            {/* Coluna 1: Aeronave */}
            <div className="col-span-2 md:col-span-1">
              <p className="font-bold text-lg">{flight.aircraft.name}</p>
              <p className="text-sm text-gray-400">Gol Linhas Aéreas (GOL)</p>
            </div>

            {/* Coluna 2: Trajeto */}
            <div className="hidden md:flex flex-col items-center">
              <p className="text-xs text-gray-400 mb-1">Trajeto</p>
              <div className="flex items-center">
                <span className="font-mono">{flight.flightData.route.from}</span>
                <div className="w-12 h-0.5 bg-yellow-500 mx-2 rounded-full relative">
                  <div className="w-2.5 h-2.5 bg-yellow-500 rounded-full absolute -left-1 -top-1"></div>
                  <div className="w-2.5 h-2.5 bg-yellow-500 rounded-full absolute -right-1 -top-1"></div>
                </div>
                <span className="font-mono">{flight.flightData.route.to}</span>
              </div>
            </div>

            {/* Coluna 3: Matrícula */}
            <div className="text-left md:text-center">
              <p className="text-xs text-gray-400 mb-1">Matrícula</p>
              <p className="font-semibold font-mono">{flight.aircraft.registration}</p>
            </div>

            {/* Coluna 4: Data */}
            <div className="text-left md:text-center">
              <p className="text-xs text-gray-400 mb-1">Data</p>
              <p className="font-semibold">{flight.flightData.date}</p>
            </div>

            {/* Coluna 5: Saldo */}
            <div className="text-left md:text-center">
              <p className="text-xs text-gray-400 mb-1">Saldo</p>
              <p className={`font-bold text-lg ${flight.flightData.balance >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                {flight.flightData.balance >= 0 ? `P$ ${flight.flightData.balance.toFixed(2)}` : `-P$ ${Math.abs(flight.flightData.balance).toFixed(2)}`}
              </p>
            </div>

          </div>
        ))}
      </div>
    </section>
  );
}
