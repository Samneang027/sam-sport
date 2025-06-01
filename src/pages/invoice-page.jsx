
import React, { useEffect, useRef, useState } from 'react';
import Invoice from '../components/invoice';
import Swal from 'sweetalert2';
import { BASE_URL } from "/service/api";

export default function InvoicePage() {
  const invoiceRef = useRef();
  const [user, setUser] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [isReadyToPrint, setIsReadyToPrint] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem('invoiceUser');
    const storedItems = localStorage.getItem('invoiceCartItems');

    if (storedUser && storedItems) {
      const parsedUser = JSON.parse(storedUser);
      const parsedItems = JSON.parse(storedItems);
      setUser(parsedUser);
      setCartItems(parsedItems);
      const total = parsedItems.reduce(
        (sum, item) => sum + item.priceOut * item.quantity,
        0
      );
      setTotalAmount(total);
      setIsReadyToPrint(true);
    }
  }, []);

  const handlePrint = () => {
    window.print();
  };

  const handlePaymentQR = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("accessToken");
      const userUuid = localStorage.getItem("userUuid");
      const orderUuid = localStorage.getItem("orderUuid");

    if (!orderUuid) {
      Swal.fire({
        icon: 'error',
        title: 'Order Not Found',
        text: 'Please place your order first before generating QR code',
      });
      return;
    }

      // Step 1: Generate individual QR
      const qrResponse = await fetch(`${BASE_URL}/api/v1/bakong-payment/generate-individual-qr`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          userUuid: userUuid,
          orderUuid: orderUuid,
          currency: "USD",
          city: "Phnom Penh"
        })
      });

      if (!qrResponse.ok) {
        throw new Error("Failed to generate QR code");
      }

      const qrData = await qrResponse.json();
      const qrString = qrData.data.qr;
      const md5 = qrData.data.md5;

      // Step 2: Convert QR string to base64 image
      const base64Response = await fetch(`${BASE_URL}/api/v1/bakong-payment/generate-qr`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          qr: qrString
        })
      });

      if (!base64Response.ok) {
        throw new Error("Failed to generate QR image");
      }

      const base64Data = await base64Response.json();
      
      // Open QR code in new window or modal
    Swal.fire({
      title: 'Payment QR Code',
      html: `<img src="data:image/png;base64,${base64Data.base64QRCode}" alt="Payment QR Code" style="width: 100%; max-width: 300px;"/>`,
      confirmButtonText: 'Close',
      showCancelButton: true,
      cancelButtonText: 'Print',
      focusConfirm: false,
      allowOutsideClick: false,
      didOpen: () => {
        // Start polling for payment verification
        const paymentCheckInterval = setInterval(async () => {
          try {
            // Step 3: Verify payment using md5
            const verifyResponse = await fetch('https://api-bakong.nbc.gov.kh/v1/check_transaction_by_md5', {
              method: "POST",
              headers: {
                "Content-Type": "application/json"
              },
              body: JSON.stringify({
                md5: md5
              })
            });

            const verifyData = await verifyResponse.json();
            
            if (verifyData.responseCode === 0) { // Payment successful
              clearInterval(paymentCheckInterval);
              
              // Step 4: Save payment record
              const paymentResponse = await fetch(`${BASE_URL}/api/v1/payments/${userUuid}/${orderUuid}`, {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${token}`
                }
              });

              if (!paymentResponse.ok) {
                throw new Error("Failed to save payment");
              }
              
              Swal.fire({
                icon: 'success',
                title: 'Payment Successful',
                text: 'Your payment has been verified and saved successfully.',
              }).then(() => {
                // Navigate to home page after successful payment
                navigate('/user-dashboard');
              });
            }
          } catch (error) {
            console.error("Payment verification error:", error);
            clearInterval(paymentCheckInterval);
          }
        }, 3000); // Check every 3 seconds

        // Store interval ID to clear it when modal closes
        Swal.getPopup().setAttribute('data-interval-id', paymentCheckInterval);
      },
      willClose: () => {
        // Clear the interval when modal closes
        const intervalId = Swal.getPopup().getAttribute('data-interval-id');
        if (intervalId) clearInterval(intervalId);
      }
    }).then((result) => {
      if (result.isDismissed && result.dismiss === Swal.DismissReason.cancel) {
        // Print the QR code
        const printWindow = window.open('', '_blank');
        printWindow.document.write(`
          <html>
            <head>
              <title>Payment QR Code</title>
              <script src="https://cdn.tailwindcss.com"></script>
              <style>
                @media print {
                  @page {
                    size: auto;
                    margin: 0;
                  }
                  body {
                    height: 100vh;
                  }
                }
              </style>
            </head>
            <body class="flex items-center justify-center h-screen m-0 p-0 bg-white">
              <div class="flex items-center justify-center w-full h-full p-4">
                <img 
                  src="data:image/png;base64,${base64Data.base64QRCode}" 
                  alt="Payment QR Code"
                  class="max-w-full max-h-full object-contain"
                />
              </div>
              <script>
                window.onload = function() {
                  setTimeout(function() {
                    window.print();
                    window.close();
                  }, 200);
                }
              </script>
            </body>
          </html>
        `);
        printWindow.document.close();
      }
    });

    } catch (error) {
      console.error("Error generating QR code:", error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Failed to generate QR code. Please try again.',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen py-8 px-4 print:bg-white print:min-h-fit print:p-0">
      <div id="invoice-section" ref={invoiceRef}>
        {isReadyToPrint && (
          <Invoice cartItems={cartItems} totalAmount={totalAmount} user={user} />
        )}
      </div>

      <div className="flex justify-between mt-6 print:hidden">
        <button
          onClick={handlePrint}
          className="bg-sky-600 hover:bg-sky-700 text-white font-semibold px-6 py-2 rounded-lg shadow-md transition"
        >
          Print / Download PDF
        </button>
        <button
          onClick={handlePaymentQR}
          disabled={loading}
          className="bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-2 rounded-lg shadow-md transition disabled:opacity-50"
        >
          {loading ? 'Generating QR...' : 'Payment / QR Code'}
        </button>
      </div>
    </div>
  );
}




