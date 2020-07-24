import React, { useEffect, useRef } from 'react';
import JsBarcode from 'jsbarcode';

const Barcode = () => {
    const svgRef = useRef(null);

    return (
        <div>
            <h1>Barcode Generator</h1>
            <input onChange={(e) => {
                JsBarcode(svgRef.current, e.currentTarget.value);
            }} type='text'></input>
            <button>Stamp on a PDF</button>
            <svg ref={svgRef}></svg>
        </div>
    );
}

export default Barcode;