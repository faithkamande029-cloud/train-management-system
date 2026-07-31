import { useTrains } from "../../hooks";
import TrainListComponent from "../../components/trains/TrainList";
import { useState } from "react";

function TrainListPage() {
  const { data: trains, isLoading } = useTrains();
  const [favorites, setFavorites] = useState([]);

  const toggleFavorite = (id) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]
    );
  };

  return (
    <TrainListComponent
      trains={trains || []}
      loading={isLoading}
      favorites={favorites}
      onToggleFavorite={toggleFavorite}
    />
  );
}

export default TrainListPage;