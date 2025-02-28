Air Quality Monitoring Application

A full-stack application for visualizing air quality data.

Prerequisites

*   Node.js (v18+)
    
*   npm
    

Getting Started

Backend Setup

1.  Navigate to the backend folder:
    ```command
    cd backend
    ```
1.  Install dependencies:
    ```command
    npm install
    ```
2.  Place your CSV file named air-quality-data.csv in the backend directory.
    
3.  Start the backend server:
    ```command
    npm run dev
    ```
The backend will:

*   Create SQLite database
    
*   Load CSV data (first run only)
    
*   Start server on port 5000
    

Frontend Setup

1.  Navigate to the frontend folder:
    
    ```command
    cd frontend
    ```

2.  Install dependencies:
    ```command
    npm install
    ```
3.  Start the development server:
    ```command
    npm run dev
    ```
The frontend will be available at [http://localhost:5173](http://localhost:5173).

Features

*   Interactive time series charts for different air quality parameters
    
*   Date range filtering
    
*   Responsive design
    
*   Real-time data updates
    

Tech Stack

Backend:

*   Node.js
    
*   Express.js
    
*   SQLite
    
*   Knex.js
    

Frontend:

*   React
    
*   TypeScript
    
*   Recharts
    
*   Material UI
    

Important Notes

1.  The backend will automatically create the database and load data on the first run.
    
2.  The frontend will connect to the backend at http://localhost:5000/api/data.
    
3.  Date pickers use Material UI's DatePicker component.
    
4.  Charts are responsive and update automatically when parameters change.