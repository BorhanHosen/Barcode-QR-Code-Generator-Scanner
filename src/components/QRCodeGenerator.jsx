import React, { useState, useRef } from "react";
import { QRCodeCanvas } from "qrcode.react";

const QRCodeGenerator = () => {
  const [text, setText] = useState("https://example.com");
  const qrRef = useRef(null); // Ref for QR Code

  const downloadQRCode = () => {
    const canvas = qrRef.current?.querySelector("canvas"); // Get the canvas inside the QR code div
    if (canvas) {
      const link = document.createElement("a");
      link.href = canvas.toDataURL("image/png"); // Convert to PNG
      link.download = "qrcode.png";
      link.click();
    }
  };

  return (
    <div className="p-4 border rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">QR Code Generator</h2>
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="border p-2 rounded w-full mb-2"
        placeholder="Enter text for QR Code"
      />
      {text && (
        <div ref={qrRef} className="flex flex-col items-center">
          <QRCodeCanvas value={text} size={200} />
          <button
            onClick={downloadQRCode}
            className="mt-4 bg-green-500 text-white py-2 px-4 rounded hover:bg-green-700"
          >
            Download QR Code
          </button>
        </div>
      )}
    </div>
  );
};

export default QRCodeGenerator;
