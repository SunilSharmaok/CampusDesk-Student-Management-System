# CampusDesk – Student Management System

A MERN-style student administration project using React, Express, MongoDB and REST APIs.

## Features
- Dashboard statistics: total students, unique courses, sections and filtered results
- Student CRUD: create, list, edit and delete
- Search by registration ID, name, course, section or email
- Filter by course and academic year
- Export filtered student records to CSV
- Form validation, duplicate registration-ID protection and success/error feedback
- Responsive layout for desktop and mobile
- Existing MongoDB records are retained; email, phone and year are optional additions

## Requirements
- Node.js and npm
- MongoDB Community Server running locally, or update `database/studentDB.js` to use your own MongoDB URI

## Run locally on Windows

### 1. Backend
Open PowerShell in the project root (the folder containing `index.js`):

```powershell
npm install
node index.js
```

The API runs at `http://localhost:5000`.
MongoDB uses `mongodb://localhost:27017/userDB` by default.

### 2. Frontend
Open a second PowerShell window:

```powershell
cd client
npm install --legacy-peer-deps
$env:NODE_OPTIONS="--openssl-legacy-provider"
npm start
```

Open `http://localhost:3000`.

This project uses an older Create React App / Webpack toolchain. The `NODE_OPTIONS` setting is a compatibility workaround for newer Node.js releases. Keep it in the terminal session used to start the frontend.

## REST API
- `GET /students` – list records
- `POST /students` – create a student
- `PATCH /students/:id` – update a student
- `PUT /students/:id` – update a student
- `DELETE /students/:id` – delete a student

Example student JSON:
```json
{
  "regId": 2026001,
  "name": "Aarav Sharma",
  "course": "B.E. CSE",
  "section": "716-B",
  "year": "2nd Year",
  "email": "aarav@example.com",
  "phone": "9876543210"
}
```

## Important notes
- Never commit real database credentials, passwords or private API keys to a public repository.
- The original upstream project is distributed under the licence included in `LICENSE`. Keep that notice when redistributing.
- This enhanced version adds dashboard UI, filtering, CSV export, validation and update functionality.
