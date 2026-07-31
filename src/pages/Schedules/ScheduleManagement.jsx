import { useAuth } from "../../hooks/useAuth";
import { useState } from "react";
import ScheduleTable from "../../components/schedule/ScheduleTable";
import PlatformAssignment from "../../components/schedule/PlatformAssignment";
import ScheduleForm from "../../components/schedule/ScheduleForm";
import expressTrain from "../../assets/express-101.jpg";
import nightRail from "../../assets/night-rail.jpg";
import hillLine from "../../assets/hill-line.jpg"
import Button from "../../components/common/Button/Button";
import { useAddSchedule, useDeleteSchedule, useSchedules, useUpdateSchedule } from "../../hooks";
import { toast } from "react-hot-toast";

const passengerSchedules = [
  {
    id: 1, 
    train: 'Express 101', 
    departure: '06:30', 
    arrival: '09:15',
    platform: '3', 
    image: expressTrain
  },
  {
    id: 2, 
    train: 'Night Rail', 
    departure: '21:45', 
    arrival: '00:20', 
    platform: '1',
    image: nightRail 
  },
  {
    id: 3,
    train: 'Hill Line',
    departure: '07:45',
    arrival: '13:10',
    platform: '2',
    image: hillLine
  }
];

function ScheduleManagement() {
  const { user } = useAuth();
  const isAdmin = user?.role === "admin";
  const { data: schedules = [], isLoading, isError, error } = useSchedules();
  const addSchedule = useAddSchedule();
  const updateSchedule = useUpdateSchedule();
  const deleteSchedule = useDeleteSchedule();
  const [editingSchedule, setEditingSchedule] = useState(null);


  const handleSaveSchedule = (data) => {
    const payload = { ...data, trainId: Number(data.trainId) };
    const mutation = editingSchedule ? updateSchedule : addSchedule;
    const mutationInput = editingSchedule ? { id: editingSchedule.id, data: payload } : payload;
    mutation.mutate(mutationInput, {
      onSuccess: () => {
        toast.success(editingSchedule ? "Schedule updated" : "Schedule added");
        setEditingSchedule(null);
      },
      onError: (requestError) => toast.error(requestError.response?.data?.message || "Unable to save schedule"),
    });
  };
  const handleDeleteSchedule = (id) => {
    deleteSchedule.mutate(id, {
      onSuccess: () => toast.success("Schedule deleted"),
      onError: (requestError) => toast.error(requestError.response?.data?.message || "Unable to delete schedule"),
    });
  };

  return (
    <section className="min-h-screen bg-zinc-100 px-6 py-8 text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl space-y-6">
        <div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-6 shadow-2xl shadow-black/40 sm:p-8">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-red-500">
            {isAdmin ? "Schedule management" : "Train schedules"}
          </p>
          <h2 className="mt-2 text-3xl font-bold text-white">Upcoming train schedules</h2>
          <p className="mt-2 max-w-2xl text-base text-zinc-400">
            Coordinate departures, arrivals and platform assignments.
          </p>
        </div>

        {isAdmin ? (
          <>
            <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
              <div>
                <ScheduleForm
                  key={editingSchedule?.id ?? "new"}
                  onAdd={handleSaveSchedule}
                  initialData={editingSchedule}
                  onCancel={() => setEditingSchedule(null)}
                  isSubmitting={addSchedule.isPending || updateSchedule.isPending}
                />
              </div>

              <div>
                <PlatformAssignment />
              </div>
            </div>

            <div className="rounded-3xl border border-zinc-800 bg-zinc-900/80 p-4 shadow-2xl shadow-black/40 sm:p-6">
              <ScheduleTable
                schedules={schedules}
                loading={isLoading}
                onEdit={setEditingSchedule}
                onDelete={handleDeleteSchedule}
              />
            </div>
            {isError && <p className="rounded-lg bg-red-950/60 p-4 text-red-200">Unable to load schedules: {error.message}</p>}
          </>
        ):(
          <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {passengerSchedules.map((schedule) => (
              <div 
              key={schedule.id}
              className="border border-zinc-400 rounded-lg overflow-hidden bg-zinc-300"
              >
                <img 
                  src={schedule.image} 
                  alt={schedule.train} 
                  className=" h-100 w-full object-cover"
                />
                <div className="p-5 text-center tracking-widest">
                  <h3 className="text-xl font-bold text-zinc-800">
                    {schedule.train}
                  </h3>
                  <p className="text-zinc-500 mt-2">
                    Depature: {schedule.departure}
                  </p>
                  <p className="text-red-800 font-bold">
                    Arrival: {schedule.arrival}
                  </p>
                  <p className=" text-zinc-500">
                    Platform: {schedule.platform}
                  </p>
                  <Button className="mt-5 w-full rounded-lg py-2 font-bold hover:bg-red-800 transition text-lg">
                    Book Ticket
                  </Button>
                </div>

              </div>
            ))}
          </div>
          </>
        )}
      </div>
    </section>
  );
}

export default ScheduleManagement;
