import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useTrain } from "../../hooks";
import TrainDetailsComponent from "../../components/trains/TrainDetails";
import Loader from "../../components/common/Loader/Loader";
import { useState } from "react";

function TrainDetailsPage() {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { data: train, isLoading, isError } = useTrain(id);
  const schedule = location.state?.schedule;
  const [favorites, setFavorites] = useState([]);

  const toggleFavorite = (id) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]
    );
  };

  if (isLoading) return <Loader />;

  if (isError || !train) {
    return <section className="mx-auto max-w-3xl px-6 py-16"><p className="rounded-xl border border-red-500/40 bg-red-950/40 p-5 text-red-100">Unable to load this train. Please return to schedules and try again.</p></section>;
  }

  return (
    <TrainDetailsComponent
      train={train}
      schedule={schedule}
      page
      onClose={() => navigate(-1)}
      onBook={() => navigate("/bookings/new", { state: { train, schedule } })}
      favorites={favorites}
      onToggleFavorite={toggleFavorite}
    />
  );
}

export default TrainDetailsPage;
