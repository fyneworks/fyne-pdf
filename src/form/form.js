import React, { useState } from 'react';
import { Document, Page, Outline } from 'react-pdf';
import { pdfjs } from 'react-pdf';
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;


export const Form = () => {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  console.log("Form arguments", arguments);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
    setPageNumber(1);
  }

  function changePage(offset) {
    setPageNumber(prevPageNumber => prevPageNumber + offset);
  }

  function previousPage() {
    changePage(-1);
  }

  function nextPage() {
    changePage(1);
  }


  function onItemClick({ pageNumber: itemPageNumber }) {
    setPageNumber(itemPageNumber);
  }

  return (
    <div>
      <div>
        <button
          type="button"
          disabled={pageNumber <= 1}
          onClick={()=>setPageNumber(1)}
        >
          First
        </button>
        <button
          type="button"
          disabled={pageNumber <= 1}
          onClick={previousPage}
        >
          Previous
        </button>
        <span>
          Page {pageNumber || (numPages ? 1 : '--')} of {numPages || '--'}
        </span>
        <button
          type="button"
          disabled={pageNumber >= numPages}
          onClick={nextPage}
        >
          Next
        </button>
        <button
          type="button"
          disabled={pageNumber >= numPages}
          onClick={()=>setPageNumber(numPages)}
        >
          Last
        </button>
      </div>
      <Document
        options={{
          cMapUrl: `//cdn.jsdelivr.net/npm/pdfjs-dist@${pdfjs.version}/cmaps/`,
          cMapPacked: true,
        }}
        file="https://res.cloudinary.com/onlyro/image/upload/v1595761611/brochures/2020-OnlyRoses-Brand-Brochure-english-arabic.pdf"
        onLoadSuccess={onDocumentLoadSuccess}
      >
        {/* <Outline onItemClick={onItemClick} /> */}
        <Page pageNumber={pageNumber} />
      </Document>
    </div>
  );
}

export default Form;