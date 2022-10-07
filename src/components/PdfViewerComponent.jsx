import React, { useEffect, useRef } from "react";

const PdfViewerComponent = (props) => {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    let instance, PSPDFKit;
    (async function () {
      PSPDFKit = await import("pspdfkit");
      instance = await PSPDFKit.load({
        // Container where PSPDFKit should be mounted.
        theme: PSPDFKit.Theme.DARK,
        container,
        // The document to open.
        document: props.document,
        // Use the public directory URL as a base URL. PSPDFKit will download its library assets from here.
        baseUrl: `${window.location.protocol}//${window.location.host}/${process.env.PUBLIC_URL}`,
      });
    })();

    return () => PSPDFKit && PSPDFKit.unload(container);
  }, []);

  return (
    <div
      className="pdf_viewer__wrapper"
      ref={containerRef}
      style={{ width: "100%", height: "80vh" }}
    />
  );
};

export default PdfViewerComponent;
