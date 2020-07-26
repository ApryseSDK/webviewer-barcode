import React, { useRef } from 'react';
import JsBarcode from 'jsbarcode';
import './barcode.css';

const Barcode = ({ instance }) => {
  const svgRef = useRef(null);

  return (
    <div className="barcodeContainer">
      <h1>Barcode Generator</h1>
      <input
        onChange={e => {
          JsBarcode(svgRef.current, e.currentTarget.value);
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
        //   SVG IMPLEMENTATION
        //   var svg = new XMLSerializer().serializeToString(svgRef.current);
        //   var encodedData = btoa(svg);
        //   stampAnnot.ImageData = `data:image/svg+xml;base64,${encodedData}`;
          stampAnnot.ImageData = svgRef.current.toDataURL();
          stampAnnot.Author = annotManager.getCurrentUser();
          annotManager.addAnnotation(stampAnnot);
          annotManager.redrawAnnotation(stampAnnot);
        }}
      >
        Stamp on a PDF
      </button>
      <canvas width={'300px'} height={'200px'} ref={svgRef}></canvas>
    </div>
  );
};

export default Barcode;
