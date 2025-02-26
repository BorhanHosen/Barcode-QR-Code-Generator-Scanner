import React, { useState, useEffect } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";

const BarcodeScanner = () => {
  const [scannedData, setScannedData] = useState(null);

  useEffect(() => {
    const scanner = new Html5QrcodeScanner("reader", { fps: 10, qrbox: 250 });

    scanner.render(
      (decodedText) => {
        setScannedData(decodedText);
        scanner.clear(); // Stop scanning after success
      },
      (errorMessage) => {
        console.error(errorMessage);
      }
    );

    return () => {
      scanner.clear();
    };
  }, []);

  return (
    <div className="p-4 border rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Barcode & QR Code Scanner</h2>
      <div id="reader"></div>
      {scannedData && (
        <p className="mt-4 font-bold text-green-600">Scanned: {scannedData}</p>
      )}
    </div>
  );
};

export default BarcodeScanner;
