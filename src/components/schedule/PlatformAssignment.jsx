import React, { useState } from 'react'

export default function () {
    const [train, setTrain] = useState([
        {
        id: 1,
        name: "Express A",
        arrival: "09:00",
        departure: "09:20",
        platform: "",
        },
        {
        id: 2,
        name: "Local B",
        arrival: "09:15",
        departure: "09:35",
        platform: "",
        },
    ])

    const handlePlatformChange= (id, platform) => {
        const updatedTrains = trains.map((train) => train.id === id ? { ...train, platform } : train
    );
    setTrain(updatedTrains)
    }
  return (
    <div>
        <h2>Platform Assigment</h2>
        {train.map((train) => (
          <div key={train.id} style={{ marginBottom: "20px" }}>
          <p><strong>{train.name}</strong></p>
          <p>Arrival: {train.arrival}</p>
          <p>Departure: {train.departure}</p>

          <select
            value={train.platform}
            onChange={(e) =>
              handlePlatformChange(train.id, e.target.value)
            }
          >
            <option value="">Select Platform</option>
            {platforms.map((platform)=> (
                <option key={platform.id} value={platform.name}>
                    {platform.name}
                </option>
            ))}
          </select>

          {train.platform && (
            <p>Assigned to Platform {train.platform}</p>
          )}
        </div>  
        ))}
    </div>
  );
}