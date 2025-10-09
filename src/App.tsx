import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import TimesheetsPage from './pages/TimesheetsPage';
import TimesheetDetailPage from './pages/TimesheetDetailPage';
import { makeServer } from './mock/server';

// Start the mock server in development
if (process.env.NODE_ENV === 'development') {
  makeServer({ environment: 'development' });
}

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/timesheets" element={<TimesheetsPage />} />
          <Route path="/timesheets/:id" element={<TimesheetDetailPage />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
