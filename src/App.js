import React, { useRef, useEffect } from 'react';
import './App.css';
import WebViewerPDFTron from './components/WebViewerPDFTron';
import Barcode from './components/Barcode';

const App = () => {
  

  return (
    <div className="App">
      <WebViewerPDFTron />
      <Barcode />
    </div>
  );
};

export default App;
