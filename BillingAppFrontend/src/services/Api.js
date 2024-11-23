import axios from 'axios';

const api = axios.create({
  baseURL: 'https://localhost:7212/api',
  headers: {
    'accept': '*/*',
  }
});

export const getAllBillingInfo = async () => {
  try {
    const response = await api.get('/Billing/GetAllBillingInfo');
    return { data: response.data, error: null };
  } catch (error) {
    console.error('Error fetching billing info:', error);
    return { data: null, error: error.response ? error.response.data : 'Network Error' };
  }
};

// Function to add a new material
export const addMaterial = async (materialData) => {
  try {
    const response = await api.post('/Billing/AddMaterial', materialData);
    return { data: response.data, error: null };
  } catch (error) {
    return {
      data: null,
      error: error.response ? error.response.data : 'Network Error',
    };
  }
};