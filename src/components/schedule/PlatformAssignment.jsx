import React, { useState } from 'react'
import expressTrain from "../../assets/express-101.jpg";
import nightRail from "../../assets/night-rail.jpg";
import hillLine from "../../assets/hill-line.jpg"
import { tr } from 'zod/v4/locales';

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
      <table>
        <thead >
          <tr className="bg-zinc-700">
            <th scope='col' className='text-left p-4 w-50 font-medium'>Train name</th>
            <th scope='col' className='text-left p-4 w-50 font-medium'>Arrival</th>
            <th scope='col' className='text-left p-4 w-50 font-medium'>Select</th>
          </tr>
        </thead>
        <tbody>
          {trains.map((train) => (
          <tr>
          <td key={train.id} style={{ marginBottom: "20px" }}>
          <td><strong>{train.train}</strong></td>
          <td>Arrival: {train.arrival}</td>
          <td>Departure: {train.departure}</td>
          
          <td>
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
          </td>

          {train.platform && (
            <p>Assigned to Platform {train.platform}</p>
          )}
          </td>
          </tr>  
          ))}          

        </tbody>
      </table>
      
        
    </div>
  );
}