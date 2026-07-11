function AddTrain() {
  return (
    <section className="card">
      <p className="eyebrow">New train</p>
      <h2>Add a train</h2>
      <form className="stacked-form">
        <label>
          Train name
          <input placeholder="North Star Express" />
        </label>
        <label>
          Route
          <input placeholder="City A → City B" />
        </label>
        <label>
          Departure time
          <input placeholder="08:00" />
        </label>
        <button type="button" className="pill-button primary">Save train</button>
      </form>
    </section>
  );
}

export default AddTrain;
