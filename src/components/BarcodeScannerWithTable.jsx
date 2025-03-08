import React, { useState, useEffect } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";
import scannerBeep from "../assets/scanner-beep.mp3";

const BarcodeScannerWithTable = () => {
  const [scannedArray, setScannedArray] = useState([]); // Stores scanned values
  const [lastScannedTime, setLastScannedTime] = useState({}); // Tracks last scan time
  const [scanner, setScanner] = useState(null); // Store scanner instance

  useEffect(() => {
    const html5QrCodeScanner = new Html5QrcodeScanner("reader", {
      fps: 10,
      qrbox: 250,
    });
    setScanner(html5QrCodeScanner);

    html5QrCodeScanner.render(
      (decodedText) => {
        const currentTime = new Date().getTime();

        // Allow rescanning after 2 seconds
        if (
          !lastScannedTime[decodedText] ||
          currentTime - lastScannedTime[decodedText] > 2000
        ) {
          playBeep(); // Play beep sound
          setScannedArray((prevArray) => [...prevArray, decodedText]); // Add to table
          setLastScannedTime((prevTimes) => ({
            ...prevTimes,
            [decodedText]: currentTime,
          })); // Update scan time
        }
      },
      (errorMessage) => {
        console.error(errorMessage);
      }
    );

    return () => {
      html5QrCodeScanner.clear();
    };
  }, []);

  // Function to play beep sound
  const playBeep = () => {
    const beep = new Audio(scannerBeep);
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
