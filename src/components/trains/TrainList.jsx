import { useState, useMemo } from "react";
import TrainCard from "./TrainCard";
import TrainDetails from "./TrainDetails";
import { ITEMS_PER_PAGE } from "../../utils/constants";

const TrainList = ({ trains, favorites, onToggleFavorite, loading }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedTrain, setSelectedTrain] = useState(null);

  const totalPages = Math.ceil(trains.length / ITEMS_PER_PAGE);
  const paginated = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return trains.slice(start, start + ITEMS_PER_PAGE);
  }, [trains, currentPage]);

  if (loading) {
    return (
      <section className="mx-auto max-w-7xl px-6 py-16">
        <h2 className="text-3xl font-bold mb-8 text-slate-900">All Trains</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="bg-zinc-600 rounded-2xl h-64 animate-pulse" />
          ))}
        </div>
      </section>
    );
  }

  if (trains.length === 0) {
    return (
      <section className="mx-auto max-w-7xl px-6 py-16">
        <h2 className="text-3xl font-bold mb-8 text-white">All Trains</h2>
        <p className="text-center text-gray-400 py-16">No trains found. Add a train to get started.</p>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-7xl px-6 py-4">
      <h2 className="text-2xl font-bold mb-7 text-slate-900 bg-slate-100 p-2 rounded-lg text-center mt-2">All Trains</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {paginated.map((train) => (
          <TrainCard
            key={train.id}
            train={train}
            onSelect={setSelectedTrain}
            onToggleFavorite={onToggleFavorite}
            isFavorite={favorites.includes(train.id)}
          />
        ))}
      </div>

      {totalPages > 1 && (
        <div className="flex justify-center gap-3 mt-10">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((p) => p - 1)}
            className="px-4 py-2 border border-zinc-600 rounded-lg disabled:opacity-50  hover:bg-red-800 text-zinc-300"
          >
            Previous
          </button>
          <span className="px-4 py-2 text-zinc-400">Page {currentPage} of {totalPages}</span>
          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((p) => p + 1)}
            className="px-4 py-2 border border-zinc-600 rounded-lg disabled:opacity-50 hover:bg-red-800 text-zinc-300"
          >
            Next
          </button>
        </div>
      )}

      {selectedTrain && (
        <TrainDetails
          train={selectedTrain}
          onClose={() => setSelectedTrain(null)}
          favorites={favorites}
          onToggleFavorite={onToggleFavorite}
        />
      )}
    </section>
  );
};

export default TrainList;
