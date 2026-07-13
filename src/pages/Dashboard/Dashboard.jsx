import { Chart as ChartJS,ArcElement,Tooltip,Legend, } from "chart.js";
import { Pie } from "react-chartjs-2";
import { data } from "react-router-dom";

ChartJS.register(ArcElement, Tooltip, Legend)

const metrics = [
  {
    label: "Upcoming Trips",
    value: "3",
  },
  {
    label: "Completed Trips",
    value: "15",
  },
  {
    label: "Confirmed Tickets",
    value: "6",
  },
  {
    label: "Pending Bookings",
    value: "2",
  },
];

const pieData = {
  labels: ["Upcoming","Completed","Confirmed", "Pending"],
  datasets: [
    {
      data: [3, 15, 6, 2],
      backgroundColor: [
        "#ef4444",
        "#333333",        
        "#f08080",        
        "#52525b"
      ],
      borderColor: [        
        "#52525b",
        "#dc2626",
        "#52525b",
        "#ffcccb"
      ],
      borderWidth: 1,
    },
  ],
};

function Dashboard() {
  return (
    <section className="bg-zinc-300 h-screen p-8">
      <Pie data={pieData}/>

      <div className="mb-8">
        <p className="text-red-500 uppercase font-semibold tracking-widest">
          Operations Overview
        </p>

        <h2 className="text-3xl font-bold text-gray-800 mt-2">
          Today at a Glance
        </h2>

        <p className="text-gray-500 mt-2">
          Monitor today's railway activities and performance.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

        {metrics.map((item) => (
          <article
            key={item.label}
            className="bg-zinc-700 border rounded-xl p-6"
          >
            <h3 className=" text-white text-4xl font-bold">
              {item.value}
            </h3>

            <p className="text-red-400 font-medium mt-2">
              {item.label}
            </p>
          </article>
        ))}

      </div>

</section>
  );
}

export default Dashboard;
