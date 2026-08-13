## Backend (in progress)

A minimal Express server foundation lives in `server/`. It runs independently of the frontend and does not yet connect to it.

To run it:

\`\`\`
cd server
npm install
cp .env.example .env
npm run dev
\`\`\`

Health check: `GET http://localhost:5000/api/health`