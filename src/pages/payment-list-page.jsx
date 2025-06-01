import React, { useEffect, useState } from 'react';
import { getAllPayments } from '/service/payment';

const PaymentListPage = ({ token }) => {
  const [payments, setPayments] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchPayments = async (page) => {
    try {
      setLoading(true);
      const data = await getAllPayments({ token, page, size: 12 });
      setPayments(data.content || []);
      setTotalPages(data.totalPages || 1);
      setError('');
    } catch (err) {
      setError('Failed to fetch payments');
      setPayments([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPayments(currentPage);
  }, [currentPage]);

  const handlePageChange = (page) => {
    if (page >= 0 && page < totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Payment List</h1>

      {loading ? (
        <p>Loading payments...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-300">
            <thead>
                <tr className="bg-green-700 text-white">
                <th className="p-2 border">No.</th>
                <th className="p-2 border">Receipt ID</th>
                <th className="p-2 border">Amount</th>
                <th className="p-2 border">Payment Method</th>
                <th className="p-2 border">Currency</th>
                <th className="p-2 border">Status</th>
                <th className="p-2 border">Date</th>
                </tr>
            </thead>
            <tbody>
                {payments.map((payment, index) => (
                <tr
                    key={payment.uuid}
                    className="text-center hover:bg-green-100 transition duration-200"
                >
                    <td className="p-2 border">{currentPage * 12 + index + 1}</td>
                    <td className="p-2 border break-all">{payment.uuid}</td>
                    <td className="p-2 border">${payment.amount.toFixed(2)}</td>
                    <td className="p-2 border">{payment.paymentMethod}</td>
                    <td className="p-2 border">{payment.currency}</td>
                    <td className="p-2 border">{payment.transactionStatus}</td>
                    <td className="p-2 border">
                    {new Date(payment.paymentDate).toLocaleString()}
                    </td>
                </tr>
                ))}
            </tbody>
            </table>

          </div>

          {/* Pagination Controls */}
          <div className="mt-4 flex justify-center items-center space-x-2">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 0}
              className="px-3 py-1 bg-gray-200 hover:bg-gray-300 rounded disabled:opacity-50"
            >
              Prev
            </button>
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i}
                onClick={() => handlePageChange(i)}
                className={`px-3 py-1 rounded ${
                  i === currentPage ? 'bg-blue-500 text-white' : 'bg-gray-100 hover:bg-gray-200'
                }`}
              >
                {i + 1}
              </button>
            ))}
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages - 1}
              className="px-3 py-1 bg-gray-200 hover:bg-gray-300 rounded disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default PaymentListPage;
