 import React, { useState } from 'react';

export default function VerifyModal({ onClose, onVerify, visible }) {
    const [token, setToken] = useState("");
    const [error, setError] = useState("");
  
    const handleVerification = async () => {
      if (!token.trim()) {
        setError("Please enter verification code");
        return;
      }
      try {
        await onVerify(token);
      } catch (err) {
        setError(err.message);
      }
    };
  
    if (!visible) return null;
  
    return (
      <div className="fixed inset-0 bg-primary bg-opacity-50 flex justify-center items-center z-50">
        <div className="bg-white p-6 rounded-lg shadow-lg w-96">
          <h2 className="text-xl font-bold mb-4">Verify Your Email</h2>
          <input
            type="text"
            placeholder="Enter verification code"
            value={token}
            onChange={(e) => {
              setToken(e.target.value);
              setError("");
            }}
            className="border p-2 w-full rounded"
          />
          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
          <div className="mt-4 flex justify-end space-x-4">
            <button onClick={onClose} className="px-4 py-2 bg-gray-300 rounded">
              Cancel
            </button>
            <button 
              onClick={handleVerification} 
              className="px-4 py-2 bg-primary text-white rounded"
            >
              Verify
            </button>
          </div>
        </div>
      </div>
    );
  }
