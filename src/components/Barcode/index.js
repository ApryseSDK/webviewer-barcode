import React, { useRef, useState } from 'react';
import JsBarcode from 'jsbarcode';
import './barcode.css';

const Barcode = ({ instance }) => {
  const svgRef = useRef(null);
  const formatRef = useRef(null);

  const [errText, setErrText] = useState('');

  return (
    <div className="barcodeContainer">
      <h1>Barcode Generator</h1>
      <h2>2D Barcode</h2>
      <select id="barcodeType" title="CODE128" ref={formatRef}>
        <option value="CODE128">CODE128 auto</option>
        <option value="CODE128A">CODE128 A</option>
        <option value="CODE128B">CODE128 B</option>
        <option value="CODE128C">CODE128 C</option>
        <option value="EAN13">EAN13</option>
        <option value="EAN8">EAN8</option>
        <option value="UPC">UPC</option>
        <option value="CODE39">CODE39</option>
        <option value="ITF14">ITF14</option>
        <option value="ITF">ITF</option>
        <option value="MSI">MSI</option>
        <option value="MSI10">MSI10</option>
        <option value="MSI11">MSI11</option>
        <option value="MSI1010">MSI1010</option>
        <option value="MSI1110">MSI1110</option>
        <option value="pharmacode">Pharmacode</option>
      </select>
      <input
        onChange={e => {
          try {
            setErrText('');
            JsBarcode(svgRef.current, e.currentTarget.value, {
              format: formatRef.current.value,
            });
          } catch (err) {
            setErrText(err);
          }
        }}
        type="text"
      ></input>
      <button
        onClick={async e => {
          e.preventDefault();
          const { Annotations, annotManager } = instance;
          const stampAnnot = new Annotations.StampAnnotation();
          stampAnnot.PageNumber = 1;
          stampAnnot.X = 100;
          stampAnnot.Y = 250;
          stampAnnot.Width = 300;
          stampAnnot.Height = 200;
          stampAnnot.ImageData = svgRef.current.toDataURL();
          stampAnnot.Author = annotManager.getCurrentUser();
          annotManager.addAnnotation(stampAnnot);
          annotManager.redrawAnnotation(stampAnnot);
        }}
      >
        Stamp on a PDF
      </button>
      <text className='error'>{errText}</text>
      <canvas ref={svgRef}></canvas>
      

    </div>
  );
};

export default Barcode;
