import { useAddTrain } from "../../hooks";
import TrainForm from "../../components/trains/TrainForm.jsx";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

function AddTrain() {
  const navigate = useNavigate();
  const { mutate, isPending } = useAddTrain();

  const handleAdd = (data) => {
    mutate(data, {
      onSuccess: () => {
        toast.success("Train added successfully");
        navigate("/trains");
      },
      onError: (err) => toast.error(err.message || "Failed to add train"),
    });
  };

  return <TrainForm onAdd={handleAdd} isSubmitting={isPending} />;
}

export default AddTrain;