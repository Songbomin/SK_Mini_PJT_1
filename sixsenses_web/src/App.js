import './App.css';
import Router from './shared/Router';
import React from 'react';

function App() {
  return (
    <div className="w-full min-h-screen bg-gray-100 flex justify-center items-center">
      <header className="w-96 h-screen bg-white relative overflow-auto ">
        <React.StrictMode>
          <Router />
        </React.StrictMode>
      </header>
    </div>
  );
}

export default App;
