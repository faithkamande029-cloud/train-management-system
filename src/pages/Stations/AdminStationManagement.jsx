import { useState } from "react";
import { useStations, useAddStation, useUpdateStation, useDeleteStation } from "../../hooks";
import StationList from "../../components/stations/StationList";
import StationForm from "../../components/stations/StationForm";
import Modal from "../../components/common/Modal/Modal";
import Button from "../../components/common/Button/Button";
import { toast } from "react-hot-toast";

function AdminStationManagement() {
  console.log("AdminStationManagement rendered");

  const { data: stations, isLoading, isError, error } = useStations();

  console.log("stations:", stations);
  console.log("loading:", isLoading);
  console.log("error:", error);

  const addStation = useAddStation();
  const updateStation = useUpdateStation();
  const deleteStation = useDeleteStation();

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingStation, setEditingStation] = useState(null);
  const [favorites, setFavorites] = useState([]);

  const toggleFavorite = (id) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]
    );
  };

  const handleAdd = (data) => {
    addStation.mutate(data, {
      onSuccess: () => {
        toast.success("Station added successfully");
        setIsFormOpen(false);
      },
      onError: (err) => toast.error(err.message || "Failed to add station"),
    });
  };

  const handleUpdate = (data) => {
    if (!editingStation) return;
    updateStation.mutate(
      { id: editingStation.id, data },
      {
        onSuccess: () => {
          toast.success("Station updated successfully");
          setIsFormOpen(false);
          setEditingStation(null);
        },
        onError: (err) => toast.error(err.message || "Failed to update station"),
      }
    );
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this station?")) {
      deleteStation.mutate(id, {
        onSuccess: () => toast.success("Station deleted successfully"),
        onError: (err) => toast.error(err.message || "Failed to delete station"),
      });
    }
  };

  const openEditForm = (station) => {
    setEditingStation(station);
    setIsFormOpen(true);
  };

  return (
    
    <div className="space-y-3 px-6 py-5">
      <div className="flex justify-between items-center px-3 py-3">
        <div className="flex flex-col">
          <p className=" uppercase tracking-widest font-bold text-xl">Station Management</p>
          <h2 className="text-xl text-zinc-600 font-bold mt-2">All Stations</h2>
        </div>
        <Button onClick={() => { setEditingStation(null); setIsFormOpen(true); }}>
          Add Station
        </Button>
      </div>

      <StationList
        stations={isError ? [] : stations || []}
        loading={isLoading}
        favorites={favorites}
        onToggleFavorite={toggleFavorite}
        onEdit={openEditForm}
        onDelete={handleDelete}
      />

      {isError && (
        <p className="mx-3 rounded-lg border border-red-500/40 bg-red-950/40 p-4 text-red-200" role="alert">
          Unable to load stations. Check that the API is running and allows this frontend origin.
          {error?.message ? ` (${error.message})` : ""}
        </p>
      )}

      <Modal
        isOpen={isFormOpen}
        onClose={() => { setIsFormOpen(false); setEditingStation(null); }}
        title={editingStation ? "Edit Station" : "Add Station"}
      >
        <StationForm
          onAdd={handleAdd}
          onUpdate={handleUpdate}
          initialData={editingStation}
          isSubmitting={addStation.isPending || updateStation.isPending}
          isEditing={!!editingStation}
        />
      </Modal>
    </div>
  );
}

export default AdminStationManagement;
