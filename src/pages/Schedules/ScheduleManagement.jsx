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
    <section className="flex flex-col p-5 bg-zinc-400 min-h-screen">
      <div className="justify-between items-center">
        <div className="mb-4">
          {/* eyebrow */}
          <p className="uppercase text-2xl font-bold ">{isAdmin ? "Schedule management" : "Train schedules"}</p>
          <h2 className="">Upcoming train schedules</h2>

        </div>
      
        {isAdmin && (
          <>           
            <div className="grid grid-cols-2 gap-6"  >
              <div className="mb-8">
                <ScheduleForm
                  onAdd={handleAddSchedule}
                  isSubmitting={false}
                />
              </div>

              <div className="mb-8">
                <PlatformAssignment />
              </div>
            </div>
            <ScheduleTable
            schedules={schedules}
            loading={false}
            onDelete={handleDeleteSchedule}
            />
          </>
          )}
      </div>
      
      
      
    </section>
  );
}

export default ScheduleManagement;
