import React, { useRef, useEffect, useState } from 'react';
import WebViewer from '@pdftron/webviewer';
import Barcode from '../Barcode';
import './webviewer.css'

const WebViewerPDFTron = () => {
  const viewer = useRef(null);
  const [viewerInstance, setViewerInstance] = useState(null);

  // if using a class, equivalent of componentDidMount 
  useEffect(() => {
    WebViewer(
      {
        path: '/webviewer/lib',
        initialDoc: 'https://pdftron.s3.amazonaws.com/downloads/pl/webviewer-demo.pdf',
      },
      viewer.current,
    ).then((instance) => {
      setViewerInstance(instance);
      const { docViewer, Annotations } = instance;
      const annotManager = docViewer.getAnnotationManager();
    });
  }, []);

  return (
    <div className='container'>
      <div className='webviewer' ref={viewer}></div>
      <Barcode instance={viewerInstance}/>
    </div>
  );
};

export default WebViewerPDFTron;
