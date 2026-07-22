import { useAuth } from "../../context/AuthContext";
import ScheduleTable from "../../components/schedule/ScheduleTable";
import PlatformAssignment from "../../components/schedule/PlatformAssignment";
import ScheduleForm from "../../components/schedule/ScheduleForm";
import expressTrain from "../../assets/express-101.jpg";
import nightRail from "../../assets/night-rail.jpg";
import hillLine from "../../assets/hill-line.jpg"

const schedules = [
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


  const handleAddSchedule = () => {
    // Logic to add a new schedule
    console.log("Add Schedule button clicked", newSchedule);
  }
  const handleDeleteSchedule = (id) => {
    // Logic to delete a schedule
    console.log("Delete Schedule button clicked", id);
  };

  return (
    <section className="min-h-screen bg-zinc-100 px-6 py-8 text-white sm:px-8 lg:px-10">
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

        {isAdmin && (
          <>
            <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
              <div>
                <ScheduleForm onAdd={handleAddSchedule} isSubmitting={false} />
              </div>

              <div>
                <PlatformAssignment />
              </div>
            </div>

            <div className="rounded-3xl border border-zinc-800 bg-zinc-900/80 p-4 shadow-2xl shadow-black/40 sm:p-6">
              <ScheduleTable
                schedules={schedules}
                loading={false}
                onDelete={handleDeleteSchedule}
              />
            </div>
          </>
        )}
      </div>
    </section>
  );
}

export default ScheduleManagement;
