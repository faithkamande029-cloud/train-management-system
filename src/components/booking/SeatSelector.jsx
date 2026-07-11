import React, { useMemo, useState } from 'react'

const SeatSelector = ({
    layout = {
        rows: 10,
        seatsPerRow: 8,
        aiselPosition: 4
    },
    seatTypes = {
        vip: {name: "VIP", price: 4500, rows: [0, 1, 2]},
        economy: {name: "Economy", price: 3500, rows: [3, 4, 5]},        
        regular: {name: "Regular", price: 1500, rows: [6, 7, 8, 9]} 
    },
    bookedSeats = [],
    currency = "Ksh",
    onBookingCompelete = () => {},
    title = "Train Seat selector",
    subtitle = "Select your preferred seats"

}) => {

    const colors = [        
        "yellow",
        "blue",
        "violet",
        "green",
        "red",
        "gray",
        "pink",
        "indigo",
        
    ]
    
    const getSeatType = (row) => {
        const seatTypeEntries = Object.entries(seatTypes);
        
        for(let i = 0; i < seatTypeEntries.length; i++){
            const [type, config] = seatTypeEntries[i];
            
            if(config.rows.includes(row)){
                const color = colors[i % colors.length];
                return {type, color, ...config};
            }
        }
        const [firstType, firstconfig] = seatTypeEntries[0];
        return {type: firstType, color: colors[0], ...firstconfig}
    }

    const initializeSeats = useMemo (() => {
        const seats = [];
        for(let row = 0; row < layout.rows; row++){
            const seatRow = [];
            const seatTypeInfo = getSeatType(row);
            for(let seat = 0; seat < layout.seatsPerRow; seat++){
                const seatId = `${String.fromCharCode(65 + row)}${seat + 1}`; 

                seatRow.push({
                    id: seatId,
                    row, 
                    seat,
                    type: seatTypeInfo?.type || "vip",
                    price: seatTypeInfo?.price || 4500,
                    color: seatTypeInfo?.color || "yellow",
                    status: bookedSeats.includes(seatId) ? "booked" : "available",
                    selected: false,
                })
            }
            seats.push(seatRow);
        }
        return seats
    }, [layout, seatTypes, bookedSeats]);

    const [seats, setSeats] = useState(initializeSeats);
    const [selectedSeats, setSelectedSeats] = useState([]);

    const getColorClass = (colorName) => {
        const colorMap = {
            yellow: "bg-yellow-100 border-yellow-300 text-yellow-800 hover:yellow-200",
            blue: "bg-blue-100 border-blue-300 text-blue-800 hover:bg-blue-200",
            violet: "bg-violet-200 border-violet-400 text-violet-800 hover:bg-violet-200",
            green: "bg-green-100 border-green-300 text-green-800 hover:bg-green-200",            
            red: "bg-red-100 border-red-300 text-red-800 hover:red-200",
            gray: "bg-gray-100 border-gray-300 text-gray-800 hover:gray-200 ",
            pink: "bg-pink-100 border-pink-300 text-pinl-800 hover:pink-200",
            indigo: "bg-indigo-100 border-indigo-300 text-indigo-800 hover:indigo-200",
            
        }
        return colorMap[colorName] || colorMap.blue;

    }

    const getSeatClassName = (seat) => {
        const baseClass =
         "w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 m-1 rounded-t-lg border-2 cursor-pointer transition-all duration-200 flex item-center justify-center text-xs sm:text-sm font-bold border-blue-300 text-blue-800 bg-blue-200";

        // more condition
        if (seat.status === "booked"){
            return `${baseClass} bg-gray-400 border-gray-500 text-gray-600 cursor-not-found`
        }
        if (seat.selected){
            return `${baseClass} bg-green-400 border-green-500 text-white transform scale-110`
        } 
        return `${baseClass} ${getColorClass(seat.color)}`
    };

    // handles the seat logic
    const handelSeatClick = (rowindex, seatIndex) => {
        const seat = seats[rowindex][seatIndex];
        if (seat.status === "booked") return;

        const isCurrentlySelected = seat.selected;
        setSeats((prevSeats) => {
            return prevSeats.map((row, rIdx) => 
                row.map((s, sIdx)=> {
                    if (rIdx === rowindex && sIdx === seatIndex){
                        return{ ...s, selected: !s.selected}
                    }
                return s;
                })
            );
        })
        if (isCurrentlySelected) {
            setSelectedSeats((prev) => prev.filter((s) => s.id !== seat.id))
        } else {
            setSelectedSeats((prev) => [...prev, seat]);
        }
    };

    const renderSeatSection = (seatRow, startIndex, endIndex) => {
        return <div className='flex'>
            {seatRow.slice(startIndex, endIndex).map((seat, index) =>{
                return (
                <div 
                    className={getSeatClassName(seat)} 
                    key={seat.id}
                    title={`${seat.id} -${
                        getSeatType(seat.row)?.name || "Regular"
                    } - ${currency}${seat.price}`}
                    onClick={() => handelSeatClick(seat.row, startIndex + index)}
                >
                    {startIndex + index + 1}
                </div>)
            })}
        </div>

    };
    const uniqueSeatTypes = Object.entries(seatTypes).map(([type, config],index) => {
        return {
            type, 
            color: colors[index % colors.length],
            ...config,
        }
    })

    const getTotalPrice = () => {
        return selectedSeats.reduce((total, seat) => total + seat.price, 0)
    };

    const handleBooking = () => {
        if(selectedSeats.length === 0){
            alert("Please select at least one seat")
        }
        setSeats((prevSeats) => {
            return prevSeats.map((row) => 
                row.map((seat)=> {
                    if (selectedSeats.some((selected) => selected.id === seat.id)){
                        return{ ...seat, status: "booked", selected: false}
                    }
                    return seat;
                })
            );
        });
        onBookingCompelete({
            seats: selectedSeats,
            totalPrice: getTotalPrice(),
            seatIds: selectedSeats.map((seat) => seat.id),
        });
        alert(
            `Successfully booked 
            ${selectedSeats.length                
            }seat(s) for ${currency}${getTotalPrice()}`
        );
        setSelectedSeats([]);
    }

  return (
    <div className='w-full min-h-screen bg-gray-50 p-4'>
        {/* title */}
        <div className='max-w-6xl mx-auto bg-white rounded-lg shadow-lg p-3'>
            <h1 className='text-2xl font-bold lg:text-3xl text-center mb-2 text-gray-800'>{title}</h1>
            <p className='text-gray-600 mb-3 text-center'>{subtitle}</p>
            {/* screen */}
            <div className='mb-4'>
                <div className='w-full h-4 bg-linear-to-r from-red-400 via-amber-300 t0-amber-100 mb-2 shadow-inner rounded-lg'/>
                <p className='text-center text-sm text-gray-500 font-medium mb-6'>SCREEN</p>
            </div>
         
            {/* seat map*/}
            <div className='mb-6 overflow-x-auto'>
                <div className='flex flex-col items-center min-w-max'>
                    {seats.map((row, rowindex) => {
                        return (
                            <div key={rowindex} className='flex items-center mb-2'>
                                <span className='w-8 text-center font-bold text-gray-600 mr-4'>
                                    {String.fromCharCode(65 + rowindex)}
                                </span>
                                {renderSeatSection(row, 0, layout.aiselPosition)}
                                {/* aisle */}
                                <div className='w-8'></div>
                                {renderSeatSection(row, layout.aiselPosition, layout.seatsPerRow)}
                            </div> 
                        )
                    })}
                </div>
            </div>
            {/* legend */}
            <div className='flex flex-wrap justify-center gap-6 mb-6 p-4 bg-gray-50 rounded-lg'>
                {uniqueSeatTypes.map(seatType => {
                    return (
                        <div key={seatType.type} className='flex items-center'>
                            <div className={`w-6 h-6 border-2 rounded-t-lg mr-2 ${
                                getColorClass(seatType.color) || "bg-blue-100 border-blue-300"
                                }`}
                            ></div>
                            <span className='text-sm'>
                                {seatType.name}: ({currency}{seatType.price})
                            </span>            
                        </div>
                    );
                })};
                <div className='flex items-center gap-2'>
                    <div className='w-6 h-6 bg-green-400 border-2 border-green-500 rounded-t-lg mr-r'></div>
                    <span className='text-sm'>Selected</span>
                </div>
                <div className='flex items-center gap-2'>
                    <div className='w-6 h-6 bg-gray-400 border-2 border-gray-600 rounded-t-lg mr-r'></div>
                    <span className='text-sm'>Booked</span>
                </div>
            </div>
            {/* booking summary */}
            <div className='bg-gray-50 rounded-lg p-4 mb-4'>
                <h3 className='font-bold text-lg mb-2'>Booking</h3>
                {selectedSeats.length > 0 ? (
                    <div>
                        <div className='mb-2'>
                            <p className='mb-2'>
                                Selected Seats: {" "}
                            <span>
                                {selectedSeats.map((s) => s.id).join(",")}
                            </span>
                            </p>    
                            <p>
                                Number of seats:{" "}
                                <span>{selectedSeats.length}</span>
                            </p>
                        </div>
                        
                        <p className='text-xl font-bold text-amber-600'>
                            Total: {currency}
                            {getTotalPrice()}
                        </p>
                    </div>
                ) :(
                    <p className='text-gray-500'>No seats Selected</p>
                )}
            </div>
            {/* Booking button */}            
            <button 
                onClick={handleBooking}
                disabled={selectedSeats.length == 0}
                className={`w-full py-3 px-6 rounded-lg font-bold text-lg transition-all duration-200 ${
                    selectedSeats.length > 0 
                    ? "bg-linear-to-r from-red-600 via-amber-500 to-yellow-300 hover:from-red-700 text-white transform hover:scale-105"
                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                }`}
            >
                {selectedSeats.length > 0 
                    ?` Book ${
                        selectedSeats.length
                    } Seat(s) - ${currency}${getTotalPrice()}`
                    :"Select Seat to Book"
                }
            </button>
            
        </div>
    </div>
  )
}

export default SeatSelector