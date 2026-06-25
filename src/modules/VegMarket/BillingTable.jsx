import React, { useState, useEffect, useRef } from 'react';
import { VEGETABLES } from '../../services/vegData';
import { useApp } from '../../context/AppContext';

const BillingTable = () => {
  const { settings } = useApp();
  const formRef = useRef(null);

  // Initialize with 5 default items
  const [rows, setRows] = useState(
    VEGETABLES.slice(0, 5).map(v => ({
      id: v.id,
      name: v[settings.language],
      weightPerBag: 0,
      bags: 0,
      price: v.defaultPrice,
      totalWeight: 0,
      totalPrice: 0
    }))
  );

  const calculateRow = (row) => {
    const totalWeight = (parseFloat(row.weightPerBag) || 0) * (parseInt(row.bags) || 0);
    const totalPrice = totalWeight * (parseFloat(row.price) || 0);
    return { ...row, totalWeight, totalPrice };
  };

  const handleInputChange = (index, field, value) => {
    const newRows = [...rows];
    newRows[index][field] = value;
    
    if (field === 'id') {
      const item = VEGETABLES.find(v => v.id === value);
      if (item) {
        newRows[index].name = item[settings.language];
        newRows[index].price = item.defaultPrice;
      }
    }
    
    newRows[index] = calculateRow(newRows[index]);
    setRows(newRows);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const inputs = Array.from(formRef.current.querySelectorAll('input, select'));
      const index = inputs.indexOf(e.target);
      if (index > -1 && index < inputs.length - 1) {
        inputs[index + 1].focus();
      }
    }
  };

  const addRow = () => {
    setRows([...rows, { id: '', name: '', weightPerBag: 0, bags: 0, price: 0, totalWeight: 0, totalPrice: 0 }]);
  };

  const grandTotal = rows.reduce((sum, row) => sum + row.totalPrice, 0);
  const commissionAmt = (grandTotal * settings.commission) / 100;
  const finalAmount = grandTotal + commissionAmt;

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 overflow-x-auto" ref={formRef}>
      <table className="w-full text-left border-collapse min-w-[800px]">
        <thead>
          <tr className="bg-gray-100 border-b">
            <th className="p-3 text-sm font-semibold">S.No</th>
            <th className="p-3 text-sm font-semibold">Item (ID / Name)</th>
            <th className="p-3 text-sm font-semibold">Weight/Bag (kg)</th>
            <th className="p-3 text-sm font-semibold">Total Bags</th>
            <th className="p-3 text-sm font-semibold">Total Weight</th>
            <th className="p-3 text-sm font-semibold">Price/kg</th>
            <th className="p-3 text-sm font-semibold text-right">Total Price</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, idx) => (
            <tr key={idx} className="border-b hover:bg-gray-50">
              <td className="p-3 text-gray-500">{idx + 1}</td>
              <td className="p-2">
                <select 
                  className="w-full border p-1 rounded"
                  value={row.id}
                  onChange={(e) => handleInputChange(idx, 'id', e.target.value)}
                  onKeyDown={handleKeyDown}
                >
                  <option value="">Select Item</option>
                  {VEGETABLES.map(v => (
                    <option key={v.id} value={v.id}>
                      {v.id} - {v[settings.language]}
                    </option>
                  ))}
                </select>
              </td>
              <td className="p-2">
                <input type="number" className="w-full border p-1 rounded" value={row.weightPerBag} 
                  onChange={(e) => handleInputChange(idx, 'weightPerBag', e.target.value)} onKeyDown={handleKeyDown} />
              </td>
              <td className="p-2">
                <input type="number" className="w-full border p-1 rounded" value={row.bags} 
                  onChange={(e) => handleInputChange(idx, 'bags', e.target.value)} onKeyDown={handleKeyDown} />
              </td>
              <td className="p-3 font-medium">{row.totalWeight.toFixed(2)}</td>
              <td className="p-2">
                <input type="number" className="w-full border p-1 rounded" value={row.price} 
                  onChange={(e) => handleInputChange(idx, 'price', e.target.value)} onKeyDown={handleKeyDown} />
              </td>
              <td className="p-3 text-right font-bold">₹{row.totalPrice.toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <button onClick={addRow} className="mt-4 text-blue-600 font-semibold print:hidden hover:underline">
        + Add New Item
      </button>

      <div className="mt-8 flex flex-col items-end border-t pt-4">
        <div className="w-64 space-y-2">
          <div className="flex justify-between"><span>Subtotal:</span> <span>₹{grandTotal.toLocaleString()}</span></div>
          <div className="flex justify-between text-red-600 italic">
            <span>Commission ({settings.commission}%):</span> 
            <span>+ ₹{commissionAmt.toLocaleString()}</span>
          </div>
          <div className="flex justify-between text-xl font-bold border-t pt-2">
            <span>Grand Total:</span> <span>₹{finalAmount.toLocaleString()}</span>
          </div>
        </div>
        <button 
          onClick={() => window.print()}
          className="mt-6 bg-green-600 text-white px-8 py-2 rounded-lg font-bold hover:bg-green-700 shadow print:hidden"
        >
          Print Bill
        </button>
      </div>
    </div>
  );
};

export default BillingTable;