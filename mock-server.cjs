const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// ─── Root route – prevents 404 on / ───────────────────────────

app.get('/', (req, res) => {
  res.json({ message: 'Mock API is running', endpoints: ['/login', '/trains', '/stations', '/schedules', '/bookings', '/users'] });
});

// ─── In-memory data ──────────────────────────────────────────

let trains = [
  { id: 1, name: 'Express 101', type: 'express', totalSeats: 200, availableSeats: 156, status: 'active' },
  { id: 2, name: 'Night Rail', type: 'intercity', totalSeats: 150, availableSeats: 89, status: 'active' },
  { id: 3, name: 'Hill Line', type: 'regional', totalSeats: 100, availableSeats: 45, status: 'maintenance' },
  { id: 4, name: 'Coastal Express', type: 'express', totalSeats: 180, availableSeats: 102, status: 'active' },
  { id: 5, name: 'Freight Hauler', type: 'freight', totalSeats: 50, availableSeats: 50, status: 'inactive' }
];

let stations = [
  { id: 1, name: 'Central Station', code: 'CTL', city: 'Nairobi', platform: 4 },
  { id: 2, name: 'Mombasa Terminal', code: 'MBA', city: 'Mombasa', platform: 3 },
  { id: 3, name: 'Kisumu Port', code: 'KSM', city: 'Kisumu', platform: 2 },
  { id: 4, name: 'Nakuru Junction', code: 'NKR', city: 'Nakuru', platform: 2 }
];

let schedules = [
  { id: 1, trainId: 1, fromStation: 'Central Station', toStation: 'Mombasa Terminal', departureTime: '06:30', arrivalTime: '09:15', status: 'on-time', platform: 3 },
  { id: 2, trainId: 2, fromStation: 'Central Station', toStation: 'Kisumu Port', departureTime: '21:45', arrivalTime: '00:20', status: 'on-time', platform: 1 },
  { id: 3, trainId: 3, fromStation: 'Nakuru Junction', toStation: 'Central Station', departureTime: '08:00', arrivalTime: '10:30', status: 'delayed', platform: 2 },
  { id: 4, trainId: 4, fromStation: 'Mombasa Terminal', toStation: 'Central Station', departureTime: '14:00', arrivalTime: '16:45', status: 'on-time', platform: 4 }
];

let bookings = [
  { id: 'BK-1001', passengerName: 'John Doe', email: 'john@example.com', phone: '0712345678', trainId: 1, scheduleId: 1, seatNumber: 'A12', fare: 1500, status: 'confirmed', fromStation: 'Central Station', toStation: 'Mombasa Terminal', departureTime: '06:30' },
  { id: 'BK-1002', passengerName: 'Jane Smith', email: 'jane@example.com', phone: '0723456789', trainId: 2, scheduleId: 2, seatNumber: 'B07', fare: 1200, status: 'pending', fromStation: 'Central Station', toStation: 'Kisumu Port', departureTime: '21:45' },
  { id: 'BK-1003', passengerName: 'Bob Johnson', email: 'bob@example.com', phone: '0734567890', trainId: 3, scheduleId: 3, seatNumber: 'C03', fare: 800, status: 'confirmed', fromStation: 'Nakuru Junction', toStation: 'Central Station', departureTime: '08:00' }
];

let users = [
  { id: 1, name: 'Admin User', email: 'admin@railms.com', role: 'admin', status: 'active' },
  { id: 2, name: 'John Manager', email: 'manager@railms.com', role: 'manager', status: 'active' },
  { id: 3, name: 'Jane Agent', email: 'agent@railms.com', role: 'agent', status: 'pending' }
];

let nextTrainId = 6;
let nextStationId = 5;
let nextScheduleId = 5;
let nextBookingId = 1004;
let nextUserId = 4;

// ─── Helper functions ─────────────────────────────────────────

const findIndex = (arr, id) => arr.findIndex(item => item.id == id);

// ─── Auth ──────────────────────────────────────────────────────

app.post('/login', (req, res) => {
  const { email } = req.body;
  const user = users.find(u => u.email === email);
  if (!user) {
    return res.status(401).json({ message: 'User not found' });
  }
  res.json({
    user: { ...user },
    accessToken: 'fake-jwt-token',
    refreshToken: 'fake-refresh-token'
  });
});

app.get('/me', (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Unauthorized' });
  res.json({ id: 1, name: 'Admin User', email: 'admin@railms.com', role: 'admin' });
});

app.post('/refresh', (req, res) => {
  res.json({ accessToken: 'new-fake-token', refreshToken: 'new-fake-refresh' });
});

app.post('/logout', (req, res) => {
  res.status(200).json({ message: 'Logged out' });
});

// ─── CRUD: Trains ─────────────────────────────────────────────

app.get('/trains', (req, res) => res.json(trains));

app.get('/trains/:id', (req, res) => {
  const train = trains.find(t => t.id == req.params.id);
  if (!train) return res.status(404).json({ message: 'Train not found' });
  res.json(train);
});

app.post('/trains', (req, res) => {
  const newTrain = { id: nextTrainId++, ...req.body };
  trains.push(newTrain);
  res.status(201).json(newTrain);
});

app.put('/trains/:id', (req, res) => {
  const idx = findIndex(trains, req.params.id);
  if (idx === -1) return res.status(404).json({ message: 'Train not found' });
  trains[idx] = { ...trains[idx], ...req.body };
  res.json(trains[idx]);
});

app.delete('/trains/:id', (req, res) => {
  const idx = findIndex(trains, req.params.id);
  if (idx === -1) return res.status(404).json({ message: 'Train not found' });
  trains.splice(idx, 1);
  res.status(204).send();
});

// ─── CRUD: Stations ────────────────────────────────────────────

app.get('/stations', (req, res) => res.json(stations));
app.get('/stations/:id', (req, res) => {
  const station = stations.find(s => s.id == req.params.id);
  if (!station) return res.status(404).json({ message: 'Station not found' });
  res.json(station);
});

app.post('/stations', (req, res) => {
  const newStation = { id: nextStationId++, ...req.body };
  stations.push(newStation);
  res.status(201).json(newStation);
});

app.put('/stations/:id', (req, res) => {
  const idx = findIndex(stations, req.params.id);
  if (idx === -1) return res.status(404).json({ message: 'Station not found' });
  stations[idx] = { ...stations[idx], ...req.body };
  res.json(stations[idx]);
});

app.delete('/stations/:id', (req, res) => {
  const idx = findIndex(stations, req.params.id);
  if (idx === -1) return res.status(404).json({ message: 'Station not found' });
  stations.splice(idx, 1);
  res.status(204).send();
});

// ─── CRUD: Schedules ───────────────────────────────────────────

app.get('/schedules', (req, res) => res.json(schedules));
app.get('/schedules/:id', (req, res) => {
  const schedule = schedules.find(s => s.id == req.params.id);
  if (!schedule) return res.status(404).json({ message: 'Schedule not found' });
  res.json(schedule);
});

app.post('/schedules', (req, res) => {
  const newSchedule = { id: nextScheduleId++, ...req.body };
  schedules.push(newSchedule);
  res.status(201).json(newSchedule);
});

app.put('/schedules/:id', (req, res) => {
  const idx = findIndex(schedules, req.params.id);
  if (idx === -1) return res.status(404).json({ message: 'Schedule not found' });
  schedules[idx] = { ...schedules[idx], ...req.body };
  res.json(schedules[idx]);
});

app.patch('/schedules/:id', (req, res) => {
  const idx = findIndex(schedules, req.params.id);
  if (idx === -1) return res.status(404).json({ message: 'Schedule not found' });
  schedules[idx] = { ...schedules[idx], ...req.body };
  res.json(schedules[idx]);
});

app.delete('/schedules/:id', (req, res) => {
  const idx = findIndex(schedules, req.params.id);
  if (idx === -1) return res.status(404).json({ message: 'Schedule not found' });
  schedules.splice(idx, 1);
  res.status(204).send();
});

// ─── CRUD: Bookings ────────────────────────────────────────────

app.get('/bookings', (req, res) => res.json(bookings));
app.get('/bookings/:id', (req, res) => {
  const booking = bookings.find(b => b.id == req.params.id);
  if (!booking) return res.status(404).json({ message: 'Booking not found' });
  res.json(booking);
});

app.post('/bookings', (req, res) => {
  const newBooking = { id: `BK-${nextBookingId++}`, ...req.body };
  bookings.push(newBooking);
  res.status(201).json(newBooking);
});

app.put('/bookings/:id', (req, res) => {
  const idx = bookings.findIndex(b => b.id == req.params.id);
  if (idx === -1) return res.status(404).json({ message: 'Booking not found' });
  bookings[idx] = { ...bookings[idx], ...req.body };
  res.json(bookings[idx]);
});

app.delete('/bookings/:id', (req, res) => {
  const idx = bookings.findIndex(b => b.id == req.params.id);
  if (idx === -1) return res.status(404).json({ message: 'Booking not found' });
  bookings.splice(idx, 1);
  res.status(204).send();
});

// ─── CRUD: Users ───────────────────────────────────────────────

app.get('/users', (req, res) => res.json(users));
app.get('/users/:id', (req, res) => {
  const user = users.find(u => u.id == req.params.id);
  if (!user) return res.status(404).json({ message: 'User not found' });
  res.json(user);
});

app.post('/users', (req, res) => {
  const newUser = { id: nextUserId++, ...req.body };
  users.push(newUser);
  res.status(201).json(newUser);
});

app.put('/users/:id', (req, res) => {
  const idx = users.findIndex(u => u.id == req.params.id);
  if (idx === -1) return res.status(404).json({ message: 'User not found' });
  users[idx] = { ...users[idx], ...req.body };
  res.json(users[idx]);
});

app.delete('/users/:id', (req, res) => {
  const idx = users.findIndex(u => u.id == req.params.id);
  if (idx === -1) return res.status(404).json({ message: 'User not found' });
  users.splice(idx, 1);
  res.status(204).send();
});

// ─── Start ──────────────────────────────────────────────────────

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Mock API running on http://localhost:${PORT}`);
  console.log('Login: POST /login');
  console.log('CRUD endpoints available for trains, stations, schedules, bookings, users');
});