import test from "node:test";
import assert from "node:assert/strict";
import { normalizeSchedule } from "./useSchedules.js";

test("normalizes snake_case schedule payloads to the camelCase shape used by the UI", () => {
  const normalized = normalizeSchedule(
    {
      id: 7,
      name: "Morning Express",
      train_id: 1,
      from_station_id: 2,
      to_station_id: 3,
      departure_time: "08:00:00",
      arrival_time: "12:30:00",
      status: "scheduled",
      platform: 4,
    },
    [{ id: 1, name: "Express 1" }],
    [
      { id: 2, name: "Central Station" },
      { id: 3, name: "Westlands" },
    ],
  );

  assert.equal(normalized.trainId, 1);
  assert.equal(normalized.trainName, "Express 1");
  assert.equal(normalized.fromStation, "Central Station");
  assert.equal(normalized.toStation, "Westlands");
  assert.equal(normalized.departureTime, "08:00");
  assert.equal(normalized.arrivalTime, "12:30");
  assert.equal(normalized.platform, 4);
});
