// src/App.js

import React from 'react';
import './App.css'; // Global styles for the entire application
import Dashboard from './components/Dashboard'; // Import the Dashboard component

function App() {
    return (
        <div className="App">
            <Dashboard /> {/* Render the Dashboard component */}
        </div>
    );
}

export default App;
