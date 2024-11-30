import React, { useState } from 'react';
import { addMaterial } from '../../services/Api'; 
import styles from './AddMaterial.module.css'; 
import { ToastContainer, toast } from 'react-toastify';  // Import Toastify
import 'react-toastify/dist/ReactToastify.css'; // Import Toastify CSS

export const AddMaterial = () => {
  const [materialName, setMaterialName] = useState('');
  const [uom, setUom] = useState('');
  const [loading, setLoading] = useState(false);

  // Handler for form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const materialData = { materialName, uom };

    const { data, error } = await addMaterial(materialData); // Call the API function

    if (data) {
      // Display success toast
      toast.success(`Material added successfully!`, {
        position: "top-right", // Position of the toast
        autoClose: 1500, // Duration to show the toast
        hideProgressBar: false, // Show the progress bar
        closeOnClick: true, // Close on click
        pauseOnHover: true, // Pause when hovered
        draggable: true, // Allow drag
        progress: undefined,
        theme: "light", // Theme for the toast
        style: {
            width: '400px', // Increase width (adjust as needed)
            fontSize: '16px', // Adjust font size (optional)
          }
      });
      setMaterialName('');
      setUom('');
    } else {
      // Display error toast
      toast.error(`Error adding material: ${error}`, {
        position: "top-right", // Position of the toast
        autoClose: 1500, // Duration to show the toast
        hideProgressBar: false, // Show the progress bar
        closeOnClick: true, // Close on click
        pauseOnHover: true, // Pause when hovered
        draggable: true, // Allow drag
        progress: undefined,
        theme: "light", // Theme for the toast
        style: {
            width: '400px', // Increase width (adjust as needed)
            fontSize: '16px', // Adjust font size (optional)
          }
      });
    }

    setLoading(false);
  };

  return (
    <div className={styles.content}>
      <div className={styles.addMaterial}>
        <h2>Add Material</h2>
        <form onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label htmlFor="materialName">Material Name:</label>
            <input
              type="text"
              id="materialName"
              value={materialName}
              onChange={(e) => setMaterialName(e.target.value)}
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="uom">Unit of Measurement (UOM):</label>
            <input
              type="text"
              id="uom"
              value={uom}
              onChange={(e) => setUom(e.target.value)}
              required
            />
          </div>
          <button type="submit" disabled={loading}>
            {loading ? 'Adding...' : 'Add Material'}
          </button>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};
