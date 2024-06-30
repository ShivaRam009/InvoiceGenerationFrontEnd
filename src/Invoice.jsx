import React from 'react';
import { Document, Page, Text, View, Image, StyleSheet } from '@react-pdf/renderer';

// Create styles
const styles = StyleSheet.create({
  page: {
    padding: '30px',
  },
  section: {
    marginBottom: '10px',
    fontSize:'11px',
    padding: '10px',
  },
  header: {
    
    marginBottom: '10px',
  },
  table: {
    display: 'table',
    width: 'auto',
    borderStyle: 'solid',
    borderColor: '#bfbfbf',
    borderWidth: 1,
    borderRightWidth: 0,
    borderBottomWidth: 0,
  },
  tableRow: {
    flexDirection: 'row',
  },
  tableColHeader: {
    width: '12.5%',
    height: 'auto',
    borderStyle: 'solid',
    borderColor: '#bfbfbf',
    borderBottomColor: '#000',
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
    backgroundColor: '#f2f2f2',
    padding: '5px',
    textAlign: 'center',
  },
  tableCol: {
    height:'auto',
    width: '12.5%',
    borderStyle: 'solid',
    borderColor: '#bfbfbf',
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
    padding: '5px',
    textAlign: 'center',
  },
  tableHeaderText: {
    fontSize: '8px',
    fontWeight: 'bold',
  },
  tableText: {
    fontSize: '8px',
  },
  logo: {
    width: '150px',
    height: '50px',
  },
});

const Invoice = ({ data }) => {
  const {
    logo,
    seller_details,
    place_of_supply,
    billing_details,
    shipping_details,
    place_of_delivery,
    order_details,
    invoice_details,
    reverse_charge,
    items,
  } = data;

  const calculateNetAmount = (item) => item.unit_price * item.quantity - item.discount;

  const calculateTaxAmount = (item) => calculateNetAmount(item) * item.tax_rate;

  const calculateTotalAmount = (item) => calculateNetAmount(item) + calculateTaxAmount(item);

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          {logo ? <Image style={styles.logo} src={logo} /> : <Text>No Logo</Text>}
          <Text style={styles.header}>Invoice</Text>
          <Text>Invoice No.: {invoice_details.invoice_no}</Text>
          <Text>Invoice Date: {invoice_details.invoice_date}</Text>
          <Text>Order No.: {order_details.order_no}</Text>
          <Text>Order Date: {order_details.order_date}</Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.header}>Seller Details</Text>
          <Text>Name: {seller_details.name}</Text>
          <Text>Address: {seller_details.address}, {seller_details.city}, {seller_details.state} - {seller_details.pincode}</Text>
          <Text>PAN No.: {seller_details.pan_no}</Text>
          <Text>GST Registration No.: {seller_details.gst_registration_no}</Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.header}>Billing Details</Text>
          <Text>Name: {billing_details.name}</Text>
          <Text>Address: {billing_details.address}, {billing_details.city}, {billing_details.state} - {billing_details.pincode}</Text>
          <Text>State/UT Code: {billing_details.state_ut_code}</Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.header}>Shipping Details</Text>
          <Text>Name: {shipping_details.name}</Text>
          <Text>Address: {shipping_details.address}, {shipping_details.city}, {shipping_details.state} - {shipping_details.pincode}</Text>
          <Text>State/UT Code: {shipping_details.state_ut_code}</Text>
        </View>
        <View style={styles.section}>
          <Text>Place of Supply: {place_of_supply}</Text>
          <Text>Place of Delivery: {place_of_delivery}</Text>
          <Text>Reverse Charge: {reverse_charge}</Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.header}>Items</Text>
          <View style={styles.table}>
            <View style={styles.tableRow}>
              {['Description', 'Unit Price', 'Quantity', 'Discount', 'Net Amount', 'Tax Rate', 'Tax Amount', 'Total Amount'].map((header, index) => (
                <View style={styles.tableColHeader} key={index}>
                  <Text style={styles.tableHeaderText}>{header}</Text>
                </View>
              ))}
            </View>
            {items.map((item, index) => (
              <View style={styles.tableRow} key={index}>
                <View style={styles.tableCol}>
                  <Text style={styles.tableText}>{item.description}</Text>
                </View>
                <View style={styles.tableCol}>
                  <Text style={styles.tableText}>{item.unit_price.toFixed(2)}</Text>
                </View>
                <View style={styles.tableCol}>
                  <Text style={styles.tableText}>{item.quantity}</Text>
                </View>
                <View style={styles.tableCol}>
                  <Text style={styles.tableText}>{item.discount.toFixed(2)}</Text>
                </View>
                <View style={styles.tableCol}>
                  <Text style={styles.tableText}>{calculateNetAmount(item).toFixed(2)}</Text>
                </View>
                <View style={styles.tableCol}>
                  <Text style={styles.tableText}>{(item.tax_rate * 100).toFixed(2)}%</Text>
                </View>
                <View style={styles.tableCol}>
                  <Text style={styles.tableText}>{calculateTaxAmount(item).toFixed(2)}</Text>
                </View>
                <View style={styles.tableCol}>
                  <Text style={styles.tableText}>{calculateTotalAmount(item).toFixed(2)}</Text>
                </View>
              </View>
            ))}
          </View>
        </View>
        <View style={styles.section}>
          <Text>For {seller_details.name}:</Text>
          {data.signature_image_url ? <Image src={data.signature_image_url} style={{ width: '100px', height: '50px' }} /> : <Text>No Signature</Text>}
          <Text>Authorised Signatory</Text>
        </View>
      </Page>
    </Document>
  );
};

export default Invoice;
