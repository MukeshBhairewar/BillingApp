import React, { useState, useEffect } from 'react';
import { getAllBillingInfo } from '../../services/Api';
import styles from './Dashboard.module.css';

export const Dashboard = () => {
  const [billingData, setBillingData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 6;

  // Fetch billing data from the API
  useEffect(() => {
    const fetchBillingData = async () => {
      try {
        const data = await getAllBillingInfo();
        setBillingData(data);
      } catch (error) {
        console.error('Error fetching billing data:', error);
      }
    };

    fetchBillingData();
  }, []);

  // Calculate pagination variables
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = billingData.slice(indexOfFirstRecord, indexOfLastRecord);
  const totalPages = Math.ceil(billingData.length / recordsPerPage);

  // Handle pagination
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  return (
    <div className={styles.dashboard}>
      <h4>Billing Information</h4>
      <div className={styles.gridContainer}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Billing ID</th>
              <th>Customer Name</th>
              <th>Billing Date</th>
              <th>Total Amount</th>
            </tr>
          </thead>
          <tbody>
            {currentRecords.map((record) => (
              <tr key={record.BillingID}>
                <td>{record.BillingID}</td>
                <td>{record.Name_OF_Customer}</td>
                <td>{record.BillingDate}</td>
                <td>{record.TotalBillAmount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className={styles.pagination}>
        <button
          onClick={handlePrevPage}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        {[...Array(totalPages)].map((_, index) => (
          <span
            key={index}
            className={`${styles.pageNumber} ${currentPage === index + 1 ? styles.activePage : ''}`}
            onClick={() => handlePageChange(index + 1)}
          >
            {index + 1}
          </span>
        ))}
        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};
