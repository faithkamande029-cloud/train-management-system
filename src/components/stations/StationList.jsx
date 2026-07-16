import { useState, useMemo } from "react";
import StationCard from "./StationCard";
import { ITEMS_PER_PAGE } from "../../utils/constants";

const StationList = ({ stations, favorites, onToggleFavorite, loading }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(stations.length / ITEMS_PER_PAGE);
  const paginated = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return stations.slice(start, start + ITEMS_PER_PAGE);
  }, [stations, currentPage]);

  if (loading) {
    return (
      <section className="max-w-7xl mx-auto py-16 px-4">
        <h2 className="text-3xl font-bold mb-8 text-white">All Stations</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[...Array(6)].map((_, i) => <div key={i} className="bg-gray-800 rounded-2xl h-64 animate-pulse" />)}
        </div>
      </section>
    );
  }

  if (stations.length === 0) {
    return (
      <section className="max-w-7xl mx-auto py-16 px-4">
        <h2 className="text-3xl font-bold mb-8 text-white">All Stations</h2>
        <p className="text-center text-gray-400 py-16">No stations found. Add a station to get started.</p>
      </section>
    );
  }

  return (
    <section className="max-w-7xl mx-auto py-16 px-4">
      <h2 className="text-3xl font-bold mb-8 text-white">All Stations</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {paginated.map((station) => (
          <StationCard
            key={station.id}
            station={station}
            onToggleFavorite={onToggleFavorite}
            isFavorite={favorites.includes(station.id)}
          />
        ))}
      </div>
      {totalPages > 1 && (
        <div className="flex justify-center gap-3 mt-10">
          <button disabled={currentPage === 1} onClick={() => setCurrentPage((p) => p - 1)} className="px-4 py-2 border border-gray-700 rounded-lg disabled:opacity-50 hover:bg-gray-800 text-gray-300">Previous</button>
          <span className="px-4 py-2 text-gray-400">Page {currentPage} of {totalPages}</span>
          <button disabled={currentPage === totalPages} onClick={() => setCurrentPage((p) => p + 1)} className="px-4 py-2 border border-gray-700 rounded-lg disabled:opacity-50 hover:bg-gray-800 text-gray-300">Next</button>
        </div>
      )}
    </section>
  );
};

export default StationList;