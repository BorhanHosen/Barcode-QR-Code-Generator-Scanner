import React, { useState, useEffect } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";
const BarcodeScannerWithTable = () => {
  const [scannedData, setScannedData] = useState(null);

  useEffect(() => {
    const scanner = new Html5QrcodeScanner("readerr", { fps: 10, qrbox: 250 });
    console.log({ scanner });

    scanner.render(
      (decodedText) => {
        console.log(decodedText);
        setScannedData(decodedText);
        // scanner.clear(); // Stop scanning after success
        setTimeout(() => {}, 2000);
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
      <div id="readerr"></div>
      {scannedData && (
        <p className="mt-4 font-bold text-green-600">Scanned: {scannedData}</p>
      )}
    </div>
  );
};

export default BarcodeScannerWithTable;
