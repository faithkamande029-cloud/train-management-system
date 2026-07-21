function AddTrain() {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    route: '',
    departureTime: '',
    image: '',
  });

  if (user?.role !== 'admin') {
    return (
      <section className="min-h-screen bg-zinc-200 p-5">
        <div className="rounded-2xl bg-white p-6 shadow-sm">
          <p className="text-sm font-semibold uppercase tracking-widest text-red-500">Access denied</p>
          <h2 className="mt-2 text-3xl font-bold text-gray-800">Only administrators can add trains.</h2>
        </div>
      </section>
    );
  }

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <section className="min-h-screen bg-zinc-200 p-5">
      <div>
        <p className="text-sm font-semibold uppercase tracking-widest text-red-500">Train Management</p>
        <h2 className="mt-2 text-3xl font-bold text-gray-800">Add New train</h2>
      </div>

      <form className="mt-6 space-y-5 rounded-2xl bg-white p-6 shadow-sm" onSubmit={handleSubmit}>
        <div>
          <label className="mb-2 block font-medium text-gray-700">Train Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Nairobi Commuter Express"
            className="w-full rounded-lg border border-gray-800 px-4 py-3"
          />
        </div>

        <div>
          <label className="mb-2 block font-medium text-gray-700">Route</label>
          <input
            type="text"
            name="route"
            value={formData.route}
            onChange={handleChange}
            placeholder="City A → City B"
            className="w-full rounded-lg border border-gray-800 px-4 py-3"
          />
        </div>

        <div>
          <label className="mb-2 block font-medium text-gray-700">Departure Time</label>
          <input
            type="time"
            name="departureTime"
            value={formData.departureTime}
            onChange={handleChange}
            className="w-full rounded-lg border border-gray-800 px-4 py-3"
          />
        </div>

        <div>
          <label className="mb-2 block font-medium text-gray-700">Train Image URL</label>
          <input
            type="url"
            name="image"
            value={formData.image}
            onChange={handleChange}
            placeholder="https://example.com/train.jpg"
            className="w-full rounded-lg border border-gray-800 px-4 py-3"
          />
          <div className="mt-3 overflow-hidden rounded-xl border border-gray-200">
            <img
              src={formData.image || placeholderImage}
              alt="Train preview"
              className="h-48 w-full object-cover"
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full rounded-lg bg-black py-3 font-semibold text-white transition hover:bg-red-600"
        >
          Save Train
        </button>
      </form>
    </section>
  );
}

export default AddTrain;
