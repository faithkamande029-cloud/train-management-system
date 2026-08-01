# Backend integration and mock-data migration audit

Audit date: 2026-07-31

## Local application status

- `npm run lint` passes with zero findings.
- `npm test` passes.
- `npm run build` passes.
- The frontend uses one authentication provider: `src/context/AuthContext.jsx`.
- Local demo auth is used only when `VITE_API_URL` is absent (or `VITE_AUTH_MODE=demo`). A configured API URL uses the API login response and stores its access and refresh tokens.

## Authentication flow

```text
Login form
  |
  +-- demo mode (/api, localhost:3001, or VITE_AUTH_MODE=demo)
  |     -> validate local demo account -> persist user -> protected routes
  |
  +-- production API URL
        -> POST /api/login { email, password }
        -> persist access/refresh tokens + user
        -> Axios adds Authorization: Bearer <access token>
        -> protected routes check the same persisted user
        -> logout clears user and tokens
```

## Files changed by this audit

- Authentication: `src/context/AuthContext.jsx`, `src/context/authContext.js`, `src/hooks/useAuth.js`, `src/hooks/index.js`, `src/routes/AdminRoute.jsx`, and `src/pages/Login/Login.jsx`.
- Schedule CRUD and hook repair: `src/pages/Schedules/ScheduleManagement.jsx`, `src/components/schedule/ScheduleForm.jsx`, `src/components/schedule/ScheduleTable.jsx`, and `src/components/trains/TrainDetails.jsx`.
- Lint cleanup: `src/components/booking/PaymentForm.jsx`, `src/components/booking/SeatSelector.jsx`, `src/components/common/Navbar/Navbar.jsx`, `src/components/schedule/PlatformAssignment.jsx`, `src/pages/Admin/Reports.jsx`, and `src/components/trains/TrainForm.jsx`.
- Configuration and documentation: `.env.example` and this document.
- Removed unreferenced duplicate/legacy contexts, layouts, routes, utility copies, and unused prototype files under `src/components/`, `src/context/`, `src/layouts/`, and `src/pages/Stations/`.

## Verified deployed-backend results

The deployed service's `/health` endpoint returns HTTP 200. The following endpoints all return HTTP 401 without credentials:

| Endpoint | Observed unauthenticated result |
| --- | --- |
| `GET /api/trains` | 401 |
| `GET /api/stations` | 401 |
| `GET /api/schedules` | 401 |
| `GET /api/bookings` | 401 |
| `GET /api/users` | 401 |

`POST /api/login` accepts JSON and returns a validation error when `email` and `password` are absent. Its exact successful response format is not publicly verifiable without valid credentials. The resource response and CORS headers indicate a Flask application served by Gunicorn, but they do **not** establish whether the protection mechanism is a JWT, a Flask session cookie, or another scheme. The existing frontend is prepared for a response shaped as `{ user, accessToken, refreshToken }` and sends `Authorization: Bearer <accessToken>` when a token exists. Confirm this contract with backend source or API documentation before production use.

## CORS finding

The backend currently returns `Access-Control-Allow-Origin: https://train-management-coral.vercel.app` and `Access-Control-Allow-Credentials: true` on ordinary requests. A preflight from `http://localhost:5173` did not return CORS allow headers, so browser requests from local Vite will be blocked.

For a Flask backend using `flask-cors`, the backend owner should use an explicit allowlist—not `*` when credentials are enabled:

```python
from flask_cors import CORS

allowed_origins = [
    "http://localhost:5173",
    "https://train-management-coral.vercel.app",
]

CORS(
    app,
    resources={r"/api/*": {"origins": allowed_origins}},
    supports_credentials=True,
    allow_headers=["Content-Type", "Authorization"],
    methods=["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
)
```

If the backend uses cookies, configure its session cookies for cross-site use (`Secure`, `SameSite=None`) only on HTTPS production origins. If it uses Bearer tokens, credentials/cookies are unnecessary and `withCredentials` can be removed after confirming that choice.

## Mock-data inventory and migration mapping

The in-memory mock contains 5 trains, 4 stations, 4 schedules, 3 bookings, and 3 users. Its data resets whenever `npm run mock` restarts.

| Resource | Mock fields | Import handling | Backend information still required |
| --- | --- | --- | --- |
| Trains | `id`, `name`, `type`, `totalSeats`, `availableSeats`, `status` | Do not import `id` unless the backend explicitly supports externally assigned IDs. Upsert with a backend-approved natural key, preferably a unique train code/name. | Create schema, uniqueness rule, allowed enum values, generated-ID policy. |
| Stations | `id`, `name`, `code`, `city`, `platform` | Do not import `id`; upsert by unique `code`. Confirm whether `platform` is a count, a platform number, or must be named `platformCount`. | Create schema and validation. |
| Schedules | `id`, `trainId`, `fromStation`, `toStation`, `departureTime`, `arrivalTime`, `status`, `platform` | Resolve `trainId` to the newly created backend train ID. Station names may need converting to station IDs. Do not import `id`. | Foreign-key format, date/time format, platform field, status enum. |
| Bookings | `id`, `passengerName`, `email`, `phone`, `trainId`, `scheduleId`, `seatNumber`, `fare`, `status`, route/time fields | Import only after train/schedule IDs are mapped. Preserve the mock ID in an `externalId` field if supported; otherwise use it for idempotency lookup. | Booking create schema, ownership rules, payment requirements, duplicate/seat constraints. |
| Users | `id`, `name`, `email`, `role`, `status` | Do not import mock users as production accounts: the mock has no password hashes, verification state, or consent records. | User provisioning/admin API and secure password/identity process. |

## Idempotent import sequence

1. Obtain a dedicated migration credential with only the required admin permissions.
2. Export and validate the mock arrays against the backend's published create schemas.
3. Upsert stations by `code`; save a `mockStationId -> backendStationId` map.
4. Upsert trains by the backend-approved natural key; save a `mockTrainId -> backendTrainId` map.
5. Transform schedules with those ID maps and upsert them using a deterministic key such as `(train, origin, destination, departure time)`.
6. Import bookings last, using the schedule map and a stable external reference. Never store card details or CVVs.
7. Log every accepted/rejected record, run the script twice in a staging database to prove idempotency, then reconcile record counts before production.

No import script has been created because the backend schemas, unique keys, and authenticated write contract are unavailable. Guessing those values could create duplicate records or corrupt relational links.

## Required backend access

| Required item | Why it is required |
| --- | --- |
| Backend source code or OpenAPI/Swagger documentation | Confirms models, serializers, validation, route methods, and authentication middleware. |
| A non-production admin migration credential or scoped JWT | Required to inspect authenticated schema responses and perform writes without using a personal account. |
| API login success response | Confirms token/cookie mechanism and exactly what the frontend should persist. |
| Staging database/API | Allows the import to be run, repeated, and reconciled safely before production. |
| CORS/configuration access | Required to add the local origin and preserve the production allowlist. |

## Production integration checklist

- [ ] Confirm login success payload and authentication mechanism.
- [ ] Confirm authenticated `GET` and `POST` schemas for trains, stations, schedules, bookings, and users.
- [ ] Enable localhost and production origins with the explicit CORS allowlist above.
- [ ] Configure `VITE_API_URL` to the deployed `/api` URL and restart/rebuild the frontend.
- [ ] Add API-backed registration and password-reset endpoints before enabling those flows in production.
- [ ] Execute the migration in staging and verify idempotency before production.

## Remaining risks and recommended next steps

1. The production API's success login response, token/cookie policy, resource schemas, and role model are unverified. Do not deploy the API-auth mode until these are confirmed.
2. Registration and password reset are deliberately demo-only until matching backend endpoints are implemented; production users receive an explicit message instead of creating browser-only accounts.
3. The production bundle still has a size warning (about 817 kB JavaScript). Add route-level lazy loading before a performance-sensitive release.
4. Supply the backend source/OpenAPI and a staging migration credential, then implement and test the idempotent importer described above.
