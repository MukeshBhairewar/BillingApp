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
    <div>
      <h1>Work IN Progress !!</h1>
    </div>
  );
};

