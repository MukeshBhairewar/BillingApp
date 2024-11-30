import React, { useState } from 'react';
import styles from './SideBar.module.css';  
import { IoHome } from "react-icons/io5";
import { RiMoneyRupeeCircleLine } from "react-icons/ri";
import { IoIosAddCircleOutline } from "react-icons/io";

export const SideBar = ({ onNavigate }) => {
  const handleDashboardClick = () => {
    onNavigate('dashboard'); 
  };

  const handleGenerateBillClick = () => {
    onNavigate('generateBill'); 
  };

  const handleAddMaterialClick = () => {
    onNavigate('addMaterial'); 
  };

  return (
    <div className={styles.sidebar}>
      {/* Sidebar Header with Logo and Company Name */}
      <div className={styles.sidebarHeader}>
        <img src="src/assets/bulb.png" alt="Company Logo" className={styles.sidebarLogo} />
        <span className={styles.companyName}>Chaitanya Electricals</span>
      </div>

      {/* Sidebar Navigation */}
      <nav className={styles.sidebarNav}>
        <ul>
          <li>
            <a onClick={handleDashboardClick}>
              <IoHome className={styles.icon} />
              Dashboard
            </a>
          </li>
          <li>
            <a href="#" onClick={handleGenerateBillClick}>
              <RiMoneyRupeeCircleLine className={styles.icon} />
              Generate Bill
            </a>
          </li>
          <li>
            <a href="#" onClick={handleAddMaterialClick}>
              <IoIosAddCircleOutline className={styles.icon} />
              Add Material
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
};
