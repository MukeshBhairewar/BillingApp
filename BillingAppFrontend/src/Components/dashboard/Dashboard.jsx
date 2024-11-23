import React, { useState, useEffect } from 'react';
import styles from './Dashboard.module.css';
import { getAllBillingInfo } from '../../services/Api'; 

export const Dashboard = () => {
  const [billingData, setBillingData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBillingData = async () => {
      const { data, error } = await getAllBillingInfo();
      if (error) {
        setError(error);
      } else {
        setBillingData(data);
      }
      setLoading(false);
    };

    fetchBillingData();
  }, []);

  if (loading) {
    return <p>Loading data...</p>;
  }

  if (error) {
    return <p className={styles.error}>Error: {error}</p>;
  }

  return (
    <div className={styles.gridContainer}>
      <h3>Billing Information</h3>
      <table className={styles.gridTable}>
        <thead>
          <tr>
            <th>Billing ID</th>
            <th>Material Name</th>
            <th>Customer Name</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Total</th>
            <th>Billing Date</th>
          </tr>
        </thead>
        <tbody>
          {billingData.map((item) => (
            <tr key={item.BillingId}>
              <td>{item.BillingId}</td>
              <td>{item.MaterialName}</td>
              <td>{item.NameOfCustomer}</td>
              <td>{item.Quantity}</td>
              <td>{item.Price}</td>
              <td>{item.Total}</td>
              <td>{item.BillingDate}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

