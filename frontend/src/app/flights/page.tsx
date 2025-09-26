"use client";

import { useState, useEffect, useRef, useCallback } from 'react';
import Card from "@/components/Card";
import Header from "@/components/Header";
import { getFlights } from "@/utils/fetch";
import { IFlight } from '@/interfaces/IFlight';

export default function Home() {
  const [flights, setFlights] = useState<IFlight[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const observer = useRef<IntersectionObserver | null>(null);

  const loadMoreFlights = useCallback(async () => {
    if (isLoading || !hasMore) return;
    setIsLoading(true);
    const nextPage = page + 1;
    const newFlightsData = await getFlights(nextPage);
    setFlights((prevFlights) => [...prevFlights, ...newFlightsData.data]);
    setPage(nextPage);
    setHasMore(newFlightsData.data.length > 0);
    setIsLoading(false);
  }, [page, isLoading, hasMore]);

  useEffect(() => {
    const fetchInitialFlights = async () => {
      setIsLoading(true);
      const initialFlights = await getFlights(1);
      setFlights(initialFlights.data);
      setHasMore(initialFlights.data.length > 0);
      setIsLoading(false);
    };
    fetchInitialFlights();
  }, []);

  const lastFlightElementRef = useCallback((node: HTMLElement | null) => {
    if (isLoading) return;
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        loadMoreFlights();
      }
    });
    if (node) observer.current.observe(node);
  }, [isLoading, hasMore, loadMoreFlights]);

  return (
    <main className="bg-[#1A1A1A] min-h-screen p-8 md:p-[63px] flex flex-col items-center">

      <Header />

      <div className="w-full max-w-[1147px] mt-24">
        <div className="w-full md:w-[468px] h-auto md:h-[58px] mb-12 font-sora">
          <h2 className="font-bold text-[24px] leading-[110%] text-[#FFFFFF] mb-3 font-sora">Histórico de Voos</h2>
          <p className="font-normal text-[18px] leading-[110%] text-[#E0E0E0] font-sora">Visualize seu histórico completo de voos realizados</p>
        </div>

        <Card flightsData={flights} lastFlightRef={lastFlightElementRef} />

        {isLoading && <p className="text-center text-yellow-500 mt-8">Carregando mais voos...</p>}
        {!hasMore && flights.length > 0 && <p className="text-center text-gray-400 mt-8">Você chegou ao fim.</p>}
      </div>

    </main>
  );
}
