import React, { useState, useRef, useEffect } from "react";
import JsBarcode from "jsbarcode";

const BarcodeGenerator = () => {
  const [text, setText] = useState("123456789");
  const barcodeRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    if (barcodeRef.current) {
      JsBarcode(barcodeRef.current, text, {
        format: "CODE128",
        displayValue: true,
      });
    }
  }, [text]);

  const downloadBarcode = () => {
    const svg = barcodeRef.current;
    const canvas = canvasRef.current;
    if (!svg || !canvas) return;

    // Create a canvas and draw the barcode onto it
    const ctx = canvas.getContext("2d");
    const img = new Image();
    const svgData = new XMLSerializer().serializeToString(svg);
    const svgBlob = new Blob([svgData], {
      type: "image/svg+xml;charset=utf-8",
    });
    const url = URL.createObjectURL(svgBlob);

    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);
      URL.revokeObjectURL(url);

      // Create a download link
      const link = document.createElement("a");
      link.href = canvas.toDataURL("image/png");
      link.download = "barcode.png";
      link.click();
    };
    img.src = url;
  };

  return (
    <div className="p-4 border rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Barcode Generator</h2>
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="border p-2 rounded w-full mb-2"
        placeholder="Enter text for barcode"
      />
      {text ? (
        <div>
          <svg ref={barcodeRef}></svg>
          <canvas ref={canvasRef} style={{ display: "none" }}></canvas>
          <button
            onClick={downloadBarcode}
            className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700"
          >
            Download Barcode
          </button>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default BarcodeGenerator;
