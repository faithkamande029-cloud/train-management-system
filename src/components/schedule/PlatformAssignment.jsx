import React, { useState } from 'react'
import expressTrain from "../../assets/express-101.jpg";
import nightRail from "../../assets/night-rail.jpg";
import hillLine from "../../assets/hill-line.jpg"

const platforms = [
  { id: 1, name: "1" },
  { id: 2, name: "2" },
  { id: 3, name: "3" },
  { id: 4, name: "4" },
];

export default function PlatformAssignment() {
    const [trains, setTrains] = useState([
        {
          id: 1, 
          train: 'Express 101', 
          departure: '06:30', 
          arrival: '09:15',
          image: expressTrain
        },
        {
          id: 2, 
          train: 'Night Rail', 
          departure: '21:45', 
          arrival: '00:20', 
          image: nightRail 
        },
    ])

    const handlePlatformChange= (id, platform) => {
        const updatedTrains = trains.map((train) => train.id === id ? { ...train, platform } : train
    );
    setTrains(updatedTrains)
    }
  return (
    <div className='bg-gray-200 flex flex-col p-4 rounded-xl text-gray-900'>
      <h2 className='font-bold text-gray-700 text-lg mb-2'>Platform Assigment</h2>
        {trains.map((train) => (
          <div key={train.id} style={{ marginBottom: "20px" }}>
          <p><strong>{train.train}</strong></p>
          <p>Arrival: {train.arrival}</p>
          <p>Departure: {train.departure}</p>

          <select
            value={train.platform}
            
            onChange={(e) =>
              handlePlatformChange(train.id, e.target.value)
            }
          >
            <option value="" className='text-black font-semibold'>Select Platform</option>
            {platforms.map((platform)=> (
                <option key={platform.id} value={platform.name} className='text-black'>
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