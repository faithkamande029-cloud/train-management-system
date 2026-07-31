/**
 * Generate seat labels e.g. A1, A2 ... B1, B2
 * @param {number} totalSeats - Total number of seats to generate
 * @returns {string[]} Array of seat IDs
 */
export function generateSeats(totalSeats = 50) {
  const seats = [];
  const rows = "ABCDEFGHIJ".split("");
  let count = 0;

  for (const row of rows) {
    for (let num = 1; num <= 10; num++) {
      if (count >= totalSeats) break;
      seats.push(`${row}${num}`);
      count++;
    }
    if (count >= totalSeats) break;
  }
  return seats;
}

/**
 * Group seats by row for display
 * e.g. { A: ["A1", "A2", ...], B: ["B1", "B2", ...] }
 */
export function groupSeatsByRow(seats) {
  return seats.reduce((acc, seat) => {
    const row = seat[0];
    if (!acc[row]) acc[row] = [];
    acc[row].push(seat);
    return acc;
  }, {});
}

/**
 * Check if a seat is available
 */
export function isSeatAvailable(seat, bookedSeats = []) {
  return !bookedSeats.includes(seat);
}

/**
 * Count available seats
 */
export function countAvailableSeats(totalSeats, bookedSeats = []) {
  return Math.max(0, totalSeats - bookedSeats.length);
}

/**
 * Get seat row and number from seat ID e.g. "A12" → { row: "A", number: 12 }
 */
export function parseSeatId(seatId) {
  const match = seatId.match(/^([A-Z]+)(\d+)$/);
  if (!match) throw new Error(`Invalid seat ID: ${seatId}`);
  return { row: match[1], number: parseInt(match[2], 10) };
}

/**
 * Generate seat matrix for visual layout
 * @param {number} rows - Number of rows
 * @param {number} seatsPerRow - Seats per row
 * @param {string[]} bookedSeats - List of booked seat IDs
 * @returns {Array<Array<{id: string, row: number, seat: number, status: string}>>}
 */
export function generateSeatMatrix(rows = 10, seatsPerRow = 8, bookedSeats = []) {
  const matrix = [];
  for (let row = 0; row < rows; row++) {
    const rowData = [];
    for (let seat = 0; seat < seatsPerRow; seat++) {
      const id = `${String.fromCharCode(65 + row)}${seat + 1}`;
      rowData.push({
        id,
        row,
        seat,
        status: bookedSeats.includes(id) ? "booked" : "available",
        selected: false,
      });
    }
    matrix.push(rowData);
  }
  return matrix;
}