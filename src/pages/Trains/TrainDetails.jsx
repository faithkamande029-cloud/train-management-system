import { useParams } from "react-router-dom";
import { useTrain } from "../../hooks";
import TrainDetailsComponent from "../../components/trains/TrainDetails";
import Loader from "../../components/common/Loader/Loader";
import { useState } from "react";

function TrainDetailsPage() {
  const { id } = useParams();
  const { data: train, isLoading } = useTrain(id);
  const [favorites, setFavorites] = useState([]);

  const toggleFavorite = (id) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]
    );
  };

  if (isLoading) return <Loader />;

  return (
    <TrainDetailsComponent
      train={train}
      onClose={() => window.history.back()}
      favorites={favorites}
      onToggleFavorite={toggleFavorite}
    />
  );
}

export default TrainDetailsPage;