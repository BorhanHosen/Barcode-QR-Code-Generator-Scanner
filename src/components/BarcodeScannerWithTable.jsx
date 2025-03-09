import React, { useState, useRef, useEffect, useCallback } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";
import scannerBeep from "../assets/scanner-beep.mp3";

const BarcodeScannerWithTable = () => {
  const [scannedCodes, setScannedCodes] = useState([]);
  const [scanner, setScanner] = useState(null);
  const lastScannedCode = useRef("");
  const lastScannedTime = useRef(0);

  const onScanSuccess = useCallback((decodedText) => {
    const now = Date.now();
    // Prevent duplicate scans within 3 seconds
    if (
      decodedText === lastScannedCode.current &&
      now - lastScannedTime.current < 3000
    ) {
      return;
    }

    playBeep(); // Play beep sound

    // Update scanned codes
    setScannedCodes((prev) => [
      ...prev,
      { code: decodedText, timestamp: new Date(now).toLocaleString() },
    ]);

    // Update last scanned reference
    lastScannedCode.current = decodedText;
    lastScannedTime.current = now;
  }, []);

  const onScanFailure = useCallback((error) => {
    console.warn("Scan error:", error);
  }, []);

  // Function to play beep sound
  const playBeep = () => {
    const beep = new Audio(scannerBeep);
    beep.play();
  };
  const startScanner = () => {
    const html5QrcodeScanner = new Html5QrcodeScanner("qr-reader", {
      fps: 10,
      qrbox: 250,
      rememberLastUsedCamera: true,
    });

    html5QrcodeScanner.render(onScanSuccess, onScanFailure);
    setScanner(html5QrcodeScanner);
  };

  useEffect(() => {
    return () => {
      if (scanner) {
        scanner.clear().catch((error) => {
          console.error("Failed to clear scanner:", error);
        });
      }
    };
  }, [scanner]);

  return (
    <div className="container">
      <button onClick={startScanner} disabled={scanner} className="scan-button">
        Start Scanning
      </button>

      <div id="qr-reader" className="scanner-container" />

      {scannedCodes.length > 0 && (
        <table className="scan-results">
          <thead>
            <tr>
              <th>Barcode</th>
              <th>Scan Time</th>
            </tr>
          </thead>
          <tbody>
            {scannedCodes.map((entry, index) => (
              <tr key={index}>
                <td>{entry.code}</td>
                <td>{entry.timestamp}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default BarcodeScannerWithTable;
