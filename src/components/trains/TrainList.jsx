// src/components/trains/TrainList.jsx

import { useState } from "react";
import TrainCard from "./TrainCard";
import TrainDetails from "./TrainDetails";

const TrainList = ({ trains, favorites, onToggleFavorite, loading }) => {
  const [currentPage, setCurrentPage]     = useState(1);
  const [selectedTrain, setSelectedTrain] = useState(null);
  const itemsPerPage = 6;
  const totalPages   = Math.ceil(trains.length / itemsPerPage);
  const paginated    = trains.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  if (loading) {
    return (
      <section className="max-w-7xl mx-auto py-16 px-4">
        <h2 className="text-3xl font-bold mb-8 text-white">All Trains</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="bg-gray-800 rounded-2xl h-64 animate-pulse" />
          ))}
        </div>
      </section>
    );
  }

  if (trains.length === 0) {
    return (
      <section className="max-w-7xl mx-auto py-16 px-4">
        <h2 className="text-3xl font-bold mb-8 text-white">All Trains</h2>
        <p className="text-center text-gray-400 py-16">
          No trains found. Add a train to get started.
        </p>
      </section>
    );
  }

  return (
    <section className="max-w-7xl mx-auto py-16 px-4">
      <h2 className="text-3xl font-bold mb-8 text-white">All Trains</h2>
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
            className="px-4 py-2 border border-gray-700 rounded-lg disabled:opacity-50 hover:bg-gray-800 text-gray-300"
          >
            Previous
          </button>
          <span className="px-4 py-2 text-gray-400">
            Page {currentPage} of {totalPages}
          </span>
          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((p) => p + 1)}
            className="px-4 py-2 border border-gray-700 rounded-lg disabled:opacity-50 hover:bg-gray-800 text-gray-300"
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