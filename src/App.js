import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { PDFDownloadLink, PDFViewer } from '@react-pdf/renderer';
import Invoice from './Invoice';
import './App.css';

const App = () => {
  const [invoiceData, setInvoiceData] = useState(null);

  useEffect(() => {
    axios.get('https://invoice-backend-weld.vercel.app/invoice-data')
      .then((response) => {
        setInvoiceData(response.data);
      })
      .catch((error) => {
        console.log('Error fetching invoice data:', error);
      });
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Invoice Generator</h1>
        {invoiceData ? (
          <>
            <PDFDownloadLink document={<Invoice data={invoiceData} />} fileName="invoice.pdf" className='App-link'>
              {({ blob, url, loading, error }) =>
                loading ? 'Loading document...' : 'Download PDF'
              }
            </PDFDownloadLink>
            <PDFViewer width="600" height="800" className="pdf-viewer">
              <Invoice data={invoiceData} />
            </PDFViewer>
          </>
        ) : (
          <p>Loading invoice data...</p>
        )}
      </header>
    </div>
  );
};

export default App;
