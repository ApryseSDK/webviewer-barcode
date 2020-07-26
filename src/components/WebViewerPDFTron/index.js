import React, { useRef, useEffect, useState } from 'react';
import WebViewer from '@pdftron/webviewer';
import Barcode from '../Barcode';
import './webviewer.css';

const WebViewerPDFTron = () => {
  const viewer = useRef(null);
  const [viewerInstance, setViewerInstance] = useState(null);

  // if using a class, equivalent of componentDidMount
  useEffect(() => {
    WebViewer(
      {
        path: '/webviewer/lib',
        initialDoc:
          'https://pdftron.s3.amazonaws.com/downloads/pl/webviewer-demo.pdf',
      },
      viewer.current,
    ).then(instance => {
      setViewerInstance(instance);
      const { docViewer, Annotations, Tools, iframeWindow } = instance;

      const createSnipTool = docViewer => {
        const SnipTool = function () {
          Tools.RectangleCreateTool.apply(this, arguments);
          this.defaults.StrokeColor = new Annotations.Color('#F69A00');
          this.defaults.StrokeThickness = 2;
        };
        SnipTool.prototype = new Tools.RectangleCreateTool();

        return new SnipTool(docViewer);
      };

      const customSnipTool = createSnipTool(docViewer);

      // Register tool
      instance.registerTool({
        toolName: 'SnipTool',
        toolObject: customSnipTool,
        // Icon made by https://www.flaticon.com/authors/smalllikeart from https://www.flaticon.com/
        buttonImage: '../../../price.svg',
        buttonName: 'snipToolButton',
        tooltip: 'Snipping Tool',
      });

      // Add tool button in header
      instance.setHeaderItems(function (header) {
        header.getHeader('toolbarGroup-Edit').get('cropToolGroupButton').insertAfter({
          type: 'toolButton',
          toolName: 'SnipTool',
        });
      });

      //Download URI
      const downloadURI = (uri, name) => {
        let link = document.createElement('a');
        link.download = name;
        link.href = uri;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        link = null;
      };

      customSnipTool.on('annotationAdded', (annotation) => {
        console.log(annotation);
        const pageIndex = annotation.PageNumber;
        // get the canvas for the page
        const iframeDocument = iframeWindow.document;
        const pageContainer = iframeDocument.getElementById(
          'pageContainer' + pageIndex,
        );
        const pageCanvas = pageContainer.querySelector('.canvas' + pageIndex);

        const topOffset = parseFloat(pageCanvas.style.top) || 0;
        const leftOffset = parseFloat(pageCanvas.style.left) || 0;
        const zoom = docViewer.getZoom();

        const x = annotation.X * zoom - leftOffset;
        const y = annotation.Y * zoom - topOffset;
        const width = annotation.Width * zoom;
        const height = annotation.Height * zoom;

        const copyCanvas = document.createElement('canvas');
        copyCanvas.width = width;
        copyCanvas.height = height;
        const ctx = copyCanvas.getContext('2d');
        // copy the image data from the page to a new canvas so we can get the data URL
        ctx.drawImage(pageCanvas, x, y, width, height, 0, 0, width, height);
        downloadURI(copyCanvas.toDataURL(), 'snippet.png');

        const annotManager = docViewer.getAnnotationManager();
        annotManager.deleteAnnotation(annotation);
      });
    });
  }, []);

  return (
    <div className="container">
      <div className="webviewer" ref={viewer}></div>
      <Barcode instance={viewerInstance} />
    </div>
  );
};

export default WebViewerPDFTron;
