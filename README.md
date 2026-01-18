# Simple Finance Tracker

A full-stack personal finance tracker that allows users to create, view, update, and delete transactions. Built to practice **full-stack development** with **React, TypeScript, Node, and Express**.

## Features

- Create transactions with an **amount**, **category**, and **date**
- View a list of all transactions
- Update or delete transactions (CRUD functionality)
- Connected frontend and backend
- Demonstrates API communication, React state management, and TypeScript types

## Tech Stack

- **Frontend:** React, TypeScript, Vite  
- **Backend:** Node.js, Express, TypeScript  
- **Other:** npm, GitHub for version control  

## Project Structure

finance-tracker/
├── backend/ # Express API server
├── frontend/ # React app
├── README.md
├── package.json
└── tsconfig.json


## Installation

1. Clone the repo:

```
git clone https://github.com/zacgee/simple-finance-tracker.git
```

2. Install dependencies:
```
cd backend
npm install
```
```
cd ../frontend
npm install
```

3. Start the backend:
```
cd backend
npm run dev
```

4. Start the frontend:
```
cd frontend
npm run dev
```

The app will run locally (frontend typically on http://localhost:5173/).

## What I Learned

Connecting a React frontend to an Express backend

TypeScript types for both client and server

CRUD operations and HTTP methods (GET, POST, PUT, DELETE)

Full-stack application structure and project organization

## Future Improvements

Add authentication (login / register)

Add data visualization (charts for spending habits)

Deploy live for public access

Refactor for cleaner code and better TypeScript usage
