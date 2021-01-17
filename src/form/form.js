import React from 'react';
//import { useState } from 'react';

// $200, lots of features, navigation, zoom, etc.
// https://react-pdf-viewer.dev/
// https://github.com/ansu5555/pdf-viewer-reactjs/
//  
// npm install pdfjs-dist@2.5.207
// npm install @phuocng/react-pdf-viewer@1.7.0
//  
import Viewer, { Worker } from '@phuocng/react-pdf-viewer';
// import '@phuocng/react-pdf-viewer/cjs/react-pdf-viewer.css';

import { defaultLayout } from '@phuocng/react-pdf-viewer';

const renderToolbar = (toolbarSlot) => {
  return (
      <div
          style={{
              alignItems: 'center',
              display: 'flex',
              width: '100%',
          }}
      >
          <div
              style={{
                  alignItems: 'center',
                  display: 'flex',
                  flexGrow: 1,
                  flexShrink: 1,
                  justifyContent: 'center',
              }}
          >
              <div style={{ padding: '0 2px' }}>
                  {toolbarSlot.previousPageButton}
              </div>
              <div style={{ padding: '0 2px' }}>
                  {toolbarSlot.currentPage + 1} / {toolbarSlot.numPages}
              </div>
              <div style={{ padding: '0 2px' }}>
                  {toolbarSlot.nextPageButton}
              </div>
              <div style={{ padding: '0 2px' }}>
                  {toolbarSlot.zoomOutButton}
              </div>
              <div style={{ padding: '0 2px' }}>
                  {toolbarSlot.zoomPopover}
              </div>
              <div style={{ padding: '0 2px' }}>
                  {toolbarSlot.zoomInButton}
              </div>
          </div>
      </div>
  );
};

const layout = (
    isSidebarOpened, //: boolean
    container, //: Slot
    main, //: Slot
    toolbar, //: RenderToolbar
    sidebar, //: Slot
) => {
    return defaultLayout(
        isSidebarOpened,
        container,
        main,
        toolbar(renderToolbar),
        sidebar,
    );
};

export const FormReactPDFViewerPro = ({ pdf }) => {
  return (
    <Worker workerUrl="https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.5.207/pdf.worker.min.js">
      <Viewer
        fileUrl={pdf} 
        layout={layout}
      />
    </Worker>
  )
};



// Free and simple, veiwer only,
// https://github.com/wojtekmaj/react-pdf
// See recipes https://github.com/wojtekmaj/react-pdf/wiki/Recipes
//  
//import { useState } from 'react';
//  import { Document, Page, Outline } from 'react-pdf';
//  import { pdfjs } from 'react-pdf';
//  pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
//  
//  
//  export const FormReactPDF = ({ pdf }) => {
//    const [numPages, setNumPages] = useState(null);
//    const [pageNumber, setPageNumber] = useState(1);
//  
//    console.log("Form FormReactPDF", {pdf});
//  
//    function onDocumentLoadSuccess({ numPages }) {
//      setNumPages(numPages);
//      setPageNumber(1);
//    }
//  
//    function changePage(offset) {
//      setPageNumber(prevPageNumber => prevPageNumber + offset);
//    }
//  
//    function previousPage() {
//      changePage(-1);
//    }
//  
//    function nextPage() {
//      changePage(1);
//    }
//  
//  
//    function onItemClick({ pageNumber: itemPageNumber }) {
//      setPageNumber(itemPageNumber);
//    }
//  
//    return (
//      <div>
//        <div>
//          <button
//            type="button"
//            disabled={pageNumber <= 1}
//            onClick={()=>setPageNumber(1)}
//          >
//            First
//          </button>
//          <button
//            type="button"
//            disabled={pageNumber <= 1}
//            onClick={previousPage}
//          >
//            Previous
//          </button>
//          <span>
//            Page {pageNumber || (numPages ? 1 : '--')} of {numPages || '--'}
//          </span>
//          <button
//            type="button"
//            disabled={pageNumber >= numPages}
//            onClick={nextPage}
//          >
//            Next
//          </button>
//          <button
//            type="button"
//            disabled={pageNumber >= numPages}
//            onClick={()=>setPageNumber(numPages)}
//          >
//            Last
//          </button>
//        </div>
//        <Document
//          options={{
//            cMapUrl: `//cdn.jsdelivr.net/npm/pdfjs-dist@${pdfjs.version}/cmaps/`,
//            cMapPacked: true,
//          }}
//          //file="https://res.cloudinary.com/onlyro/image/upload/v1595761611/brochures/2020-OnlyRoses-Brand-Brochure-english-arabic.pdf"
//          //file="https://res.cloudinary.com/sampepys/image/upload/v1597738011/pdf/AEI_Recipe_Handbook_1-min.pdf"
//          file={pdf}
//          onLoadSuccess={onDocumentLoadSuccess}
//        >
//          {/* <Outline onItemClick={onItemClick} /> */}
//          <Page pageNumber={pageNumber} />
//        </Document>
//      </div>
//    );
//  }


export const Form = ({ data = {}, options = {}, trigger, element, children, ...props }) => {
  console.log("Form arguments", {data, options, trigger, element, children, props});

  const pdf = options.pdf || data.pdf || '';

  if(!pdf) return "Unknown PDF";

  //return <FormReactPDF pdf={data.pdf}/>
  return <FormReactPDFViewerPro 
    pdf={pdf}
  />
}




export default Form;