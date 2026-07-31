import { useTrains } from "../../hooks";
import TrainListComponent from "../../components/trains/TrainList";
import { useState } from "react";

function TrainListPage() {
  const { data: trains, isLoading, isError, error } = useTrains();
  const [favorites, setFavorites] = useState([]);

  const toggleFavorite = (id) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]
    );
  };

  return (
    <>
      {isError && (
        <section className="max-w-7xl mx-auto py-16 px-4" role="alert">
          <h2 className="text-3xl font-bold mb-4 text-white">All Trains</h2>
          <p className="rounded-lg border border-red-500/40 bg-red-950/40 p-4 text-red-200">
            Unable to load trains. Check that the API is running and allows this frontend origin.
            {error?.message ? ` (${error.message})` : ""}
          </p>
        </section>
      )}
      {!isError && (
        <TrainListComponent
          trains={trains || []}
          loading={isLoading}
          favorites={favorites}
          onToggleFavorite={toggleFavorite}
        />
      )}
    </>
  );
}

export default TrainListPage;
