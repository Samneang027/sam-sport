import React from 'react';

function Invoice ({ cartItems, totalAmount, user }) {
  return (
    <div className="mt-12 p-8 max-w-5xl mx-auto border border-gray-300 rounded-lg bg-white shadow-md">
        <h1 className="text-3xl font-bold text-center text-title mb-2">INVOICE</h1>
        <div className='flex justify-between'>
            {/* Header */}
            <div className="mb-8">
                <div className="text-md text-gray-700">
                <h2 className="text-lg font-semibold mb-2 text-title">Company Information</h2>
                <p><span className="font-bold">Company:</span> SAM SPORT</p>
                <p><span className="font-bold">Email:</span> samsport@gmail.com</p>
                <p><span className="font-bold">Telephone:</span> +855 27 27 27 27</p>
                <p><span className="font-bold">Address:</span> Russian Federation Blvd (110), Phnom Penh</p>
                </div>
            </div>

            {/* Customer Info */}
            {user && (
                <div className="mb-8 text-md text-gray-700">
                <h2 className="text-lg font-semibold mb-2 text-title">Customer Information</h2>
                <p><span className="font-bold">Name:</span> {user.name}</p>
                <p><span className="font-bold">Email:</span> {user.email}</p>
                <p><span className="font-bold">Telephone:</span> {user.phoneNumber}</p>
                <p>
                    <span className="font-bold">Address:</span>{' '}
                    <a
                    href={user.linkAddress}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 underline"
                    >
                    {user.address}
                    </a>
                </p>
                </div>
            )}
        </div>
      {/* Order Products Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300 text-sm md:text-md lg:text-lg">
            <thead className="print:text-black print:border-b print:font-bold">
            <tr className="bg-primary text-white print:bg-transparent print:text-black">
                <th className="border">No.</th>
                <th className="p-2 border">Image</th>
                <th className="p-2 border">Name</th>
                <th className="p-2 border">Brand</th>
                <th className="p-2 border">Quantity</th>
                <th className="p-2 border">Price</th>
                <th className="p-2 border">Total</th>
            </tr>
            </thead>
          <tbody>
            {cartItems.map((item, index) => (
              <tr key={index} className="text-center hover:bg-gray-100">
                <td>{index + 1}</td>
                <td className="p-2 border">
                  <img src={item.thumbnail} alt={item.name} className="h-16 w-16 object-contain mx-auto" />
                </td>
                <td className="p-2 border">{item.name}</td>
                <td className="p-2 border">{item.brand?.name}</td>
                <td className="p-2 border">{item.quantity}</td>
                <td className="p-2 border">${item.priceOut.toFixed(2)}</td>
                <td className="p-2 border">${(item.quantity * item.priceOut).toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Total Amount */}
      <div className="flex justify-end mt-4">
        <div className="text-xl font-bold">
          Total Amount: <span className="text-green-600">${totalAmount.toFixed(2)}</span>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-10 border-t pt-4 text-sm text-gray-600">
        <p>
          SAM Sport is an e-commerce brand that specializes in selling sportswear, shoes, and various types of sports equipment online. The company provides a wide range of products for athletes, fitness enthusiasts, and casual sports lovers.
        </p>
        <p className="mt-2">
          As an online retailer, SAM Sport operates through a website or mobile app, allowing customers to browse, purchase, and have products delivered conveniently. It caters to various sports categories, including running, gym workouts, football, basketball, and more.
        </p>
      </div>
    </div>
  );
};

export default Invoice;
