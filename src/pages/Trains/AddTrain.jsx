function AddTrain() {
  return (
    <section className="bg-zinc-200 h-screen p-5">
      <div>
        <p className="eyebrow text-red-500 uppercase tracking-widest font-semibold">Train Management</p>
        <h2 className="text-3xl font-bold text-gray-800 mt-2">Add New train</h2>
      </div>
      
      {/* stacked-form  */}
      <form className="space-y-5">
        <div>
      <label className="block text-gray-700 font-medium mb-2">
        Train Name
      </label>

      <input
        type="text"
        placeholder="Nairobi Commuter Express"
        className="w-full border border-gray-800 rounded-lg px-4 py-3"
      />
    </div>

    <div>
      <label className="block text-gray-700 font-medium mb-2">
        Route
      </label>

      <input
        type="text"
        placeholder="City A → City B"
        className="w-full border border-gray-800 rounded-lg px-4 py-3"
      />
    </div>

    <div>
      <label className="block text-gray-700 font-medium mb-2">
        Departure Time
      </label>

      <input
        type="time"
        className="w-full border border-gray-800 rounded-lg px-4 py-3 "
      />
    </div>

    <button
      type="submit"
      className="w-full bg-black hover:bg-red-600 text-white font-semibold py-3 rounded-lg"
    >
      Save Train
    </button>
      </form>
    </section>
  );
}

export default AddTrain;
