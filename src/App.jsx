import React from "react";
import BarcodeGenerator from "./components/BarcodeGenerator";
import BarcodeScanner from "./components/BarcodeScanner";
import QRCodeGenerator from "./components/QRCodeGenerator";
import BarcodeScannerWithTable from "./components/BarcodeScannerWithTable";

const App = () => {
  return (
    <div className="container mx-auto p-4 sm:px-10">
      <h1 className="text-2xl font-bold text-center mb-6">
        Barcode & QR Code Generator & Scanner
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <BarcodeGenerator />
        <QRCodeGenerator />
      </div>
      <div className="mt-6">
        <BarcodeScanner />
      </div>
      <div className="mt-6">
        <BarcodeScannerWithTable />
      </div>
    </div>
  );
};

export default App;
