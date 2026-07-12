const metrics = [
  { label: 'Active trains', value: '24' },
  { label: 'Passengers today', value: '1,482' },
  { label: 'Open bookings', value: '318' },
  { label: 'Delayed services', value: '5' },
];

function Dashboard() {
  return (
    <section className="bg-zinc-300 h-screen p-8">

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
