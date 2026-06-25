import React from 'react';
import { useApp } from '../context/AppContext';

const MasterLayout = ({ children }) => {
  const { settings } = useApp();

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <header className="bg-green-700 text-white p-4 shadow-md print:hidden">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-xl font-bold">{settings.companyName}</h1>
          <p className="text-sm opacity-90">{settings.address}</p>
        </div>
      </header>
      <main className="flex-grow container mx-auto p-4 lg:p-8">
        {children}
      </main>
      <footer className="bg-gray-800 text-white p-4 text-center text-xs print:hidden">
        © {new Date().getFullYear()} {settings.companyName} - Billing System
      </footer>
    </div>
  );
};

export default MasterLayout;