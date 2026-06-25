import React from 'react';
import { AppProvider } from './context/AppContext';
import MasterLayout from './layouts/MasterLayout';
import Settings from './modules/VegMarket/Settings';
import BillingTable from './modules/VegMarket/BillingTable';

function App() {
  return (
    <AppProvider>
      <MasterLayout>
        <div className="space-y-6">
          <header className="print:block hidden mb-8 text-center">
             <h1 className="text-3xl font-bold">VEGETABLE BILL</h1>
             <div className="mt-2 text-gray-600">Date: {new Date().toLocaleDateString()}</div>
          </header>
          
          <Settings />
          <BillingTable />
        </div>
      </MasterLayout>
    </AppProvider>
  );
}

export default App;