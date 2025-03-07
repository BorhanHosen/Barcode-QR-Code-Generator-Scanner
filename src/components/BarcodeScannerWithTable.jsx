import React, { useState, useEffect } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";
// import "../assets/scanner-beep.mp3";

const BarcodeScannerWithTable = () => {
  const [scannedDataList, setScannedDataList] = useState(new Set()); // Use Set to prevent duplicates
  const [scannedArray, setScannedArray] = useState([]); // Array for displaying scanned values

  useEffect(() => {
    const scanner = new Html5QrcodeScanner("reader", { fps: 10, qrbox: 250 });

    scanner.render(
      (decodedText) => {
        if (!scannedDataList.has(decodedText)) {
          playBeep(); // Play beep sound
          setScannedDataList((prevSet) => new Set(prevSet).add(decodedText)); // Update Set to prevent duplicates
          setScannedArray((prevArray) => [...prevArray, decodedText]); // Update array for table display
        }
      },
      (errorMessage) => {
        console.error(errorMessage);
      }
    );

    return () => {
      scanner.clear();
    };
  }, [scannedDataList]); // Dependency on scannedDataList to track updates

  // Function to play beep sound
  const playBeep = () => {
    const beep = new Audio("../assets/scanner-beep.mp3"); // Beep sound URL
    beep.play();
  };

  return (
    <div className="p-4 border rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Barcode & QR Code Scanner</h2>
      <div id="reader"></div>

      {scannedArray.length > 0 && (
        <div className="mt-4">
          <h3 className="text-lg font-bold mb-2">Scanned Values</h3>
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-200">
                <th className="border p-2">#</th>
                <th className="border p-2">Scanned Data</th>
              </tr>
            </thead>
            <tbody>
              {scannedArray.map((data, index) => (
                <tr key={index} className="text-center">
                  <td className="border p-2">{index + 1}</td>
                  <td className="border p-2">{data}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default BarcodeScannerWithTable;
