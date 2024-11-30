import React, { useState, useEffect } from 'react';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Form, Input, Select, message } from 'antd';
import { getAllMaterials, addBillingInfo } from '../../services/Api';
import styles from './GenerateBill.module.css'; 
import { ToastContainer, toast } from 'react-toastify';  
import 'react-toastify/dist/ReactToastify.css'; 
import { jsPDF } from 'jspdf';
import { GeneratePDFContent } from '../../utils/generatePDFContent';
import { calculateTotalAmount } from '../../Helper/dynamicfunction';

const { Option } = Select;

export const GenerateBill = () => {
  const [form] = Form.useForm();
  const [materials, setMaterials] = useState([]);
  const [totalBillAmount, setTotalBillAmount] = useState(0);

  // Fetch materials on component mount
  useEffect(() => {
    const fetchMaterials = async () => {
      try {
        const data = await getAllMaterials();
        setMaterials(data);
      } catch (error) {
        message.error('Failed to fetch materials. Please try again.');
      }
    };
    fetchMaterials();
  }, []);

  // Update Total Bill Amount
  const calculateTotalBill = () => {
    const materialsData = form.getFieldValue('materials') || [];
    const total = materialsData.reduce((sum, item) => {
      const quantity = item.quantity || 0;
      const price = item.price || 0;
      return sum + quantity * price;
    }, 0);
    setTotalBillAmount(total);
  };

  // Handle form submission
  const onFinish = async (values) => {
    try {
      await addBillingInfo({ ...values, totalBillAmount }); // Pass totalBillAmount to the API
      toast.success('Bill generated successfully!', {
        position: "top-right", 
        autoClose: 1500, 
        hideProgressBar: false, 
        closeOnClick: true, 
        pauseOnHover: true, 
        draggable: true, 
        progress: undefined,
        theme: "light", 
        style: { width: '400px', fontSize: '16px' }
      });
      form.resetFields();
      setTotalBillAmount(0); // Reset total amount
    } catch (error) {
      toast.error(`Failed to generate bill: ${error}`, {
        position: "top-right", 
        autoClose: 1500, 
        hideProgressBar: false, 
        closeOnClick: true, 
        pauseOnHover: true, 
        draggable: true, 
        progress: undefined,
        theme: "light", 
        style: { width: '400px', fontSize: '16px' }
      });
    }
  };

  const handleGeneratePDF = () => {
    // Create a new jsPDF instance
    const doc = new jsPDF();
  
    // Get customer info and materials data from the form
    const customerName = form.getFieldValue('nameOfCustomer');
    const billingDate = form.getFieldValue('billingDate');
    const materialsData = form.getFieldValue('materials') || [];
  
    // Map MaterialId to MaterialName and include UoM
    const mappedMaterials = materialsData.map((item) => {
      const material = materials.find((mat) => mat.MaterialId === item.materialId);
      return {
        ...item,
        materialName: material?.MaterialName || "Unknown Material",
        uom: material?.Uom || "Unknown UoM", // Pass UoM here
      };
    });
  
    // Calculate the total amount using the utility function
    const totalBillAmount = calculateTotalAmount(mappedMaterials);
  
    // Generate PDF content using the utility function
    GeneratePDFContent(doc, customerName, billingDate, mappedMaterials, totalBillAmount);
  
    // Save the generated PDF
    doc.save('billing-info.pdf');
  };
  
  return (
    <div className={styles.generateBillContainer}> {/* Apply custom styles */}
      <h2>Generate Bill</h2>
      <Form
        form={form}
        name="generate_bill_form"
        onFinish={onFinish}
        autoComplete="off"
        className={styles.generateBillForm} // Apply custom styles to form
        onValuesChange={calculateTotalBill} // Trigger recalculation on value change
      >
        {/* Customer Name */}
        <Form.Item
          name="nameOfCustomer"
          rules={[{ required: true, message: 'Please enter customer name' }]} >
          <Input placeholder="Customer Name" />
        </Form.Item>

        {/* Billing Date */}
        <Form.Item
          name="billingDate"
          rules={[{ required: true, message: 'Please select billing date' }]} >
          <Input type="date" placeholder="Billing Date" />
        </Form.Item>

        {/* Materials Table */}
        <Form.List
          name="materials"
          initialValue={[{ materialId: '', quantity: 1, price: 0 }]} // Add one default row
        >
          {(fields, { add, remove }) => (
            <>
              <div className={styles.materialsTableHeader}>
                <span>Material</span>
                <span>UoM</span>
                <span>Quantity</span>
                <span>Price</span>
                <span>Amount</span>
                <span>Action</span>
              </div>
              {fields.map(({ key, name, ...restField }) => (
                <div key={key} className={styles.materialsTableRow}>
                  <Form.Item
                    {...restField}
                    name={[name, 'materialId']}
                    rules={[{ required: true, message: 'Please select a material' }]}>
                    <Select placeholder="Select Material">
                      {materials.map((material) => (
                        <Option key={material.MaterialId} value={material.MaterialId}>
                          {material.MaterialName}
                        </Option>
                      ))}
                    </Select>
                  </Form.Item>

                  <Form.Item shouldUpdate>
                    {() => {
                      const materialId = form.getFieldValue(['materials', name, 'materialId']);
                      const selectedMaterial = materials.find(
                        (material) => material.MaterialId === materialId
                      );
                      return (
                        <Input
                          placeholder="UoM"
                          value={selectedMaterial?.Uom || ''}
                          readOnly
                          className={styles.readonlyInput}
                        />
                      );
                    }}
                  </Form.Item>

                  <Form.Item
                    {...restField}
                    name={[name, 'quantity']}
                    rules={[{ required: true, message: 'Please enter quantity' }]}>
                    <Input type="number" placeholder="Quantity" />
                  </Form.Item>

                  <Form.Item
                    {...restField}
                    name={[name, 'price']}
                    rules={[{ required: true, message: 'Please enter price' }]}>
                    <Input type="number" placeholder="Price" />
                  </Form.Item>

                  <Form.Item shouldUpdate>
                    {() => {
                      const quantity = form.getFieldValue(['materials', name, 'quantity']) || 0;
                      const price = form.getFieldValue(['materials', name, 'price']) || 0;
                      return (
                        <Input
                          placeholder="Amount"
                          value={quantity * price || ''}
                          readOnly
                          className={styles.readonlyInput}
                        />
                      );
                    }}
                  </Form.Item>

                  <MinusCircleOutlined onClick={() => remove(name)} />
                </div>
              ))}
              <Form.Item>
                <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                  Add Material
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>

        {/* Total Bill Amount */}
        <Form.Item>
          <div className={styles.totalBillAmountContainer}>
            <span className={styles.totalBillLabel}>Total Bill Amount:</span>
            <Input
              value={totalBillAmount}
              readOnly
              className={styles.readonlyInput}
              placeholder="Total Bill Amount"
            />
          </div>
        </Form.Item>

        {/* Submit and Generate PDF Buttons */}
        <Form.Item>
          <div className={styles.actionButtons}>
            <button
              type="submit"
              className={styles.button}
            >
              Submit
            </button>
            <button
              type="button"
              onClick={handleGeneratePDF}
              className={styles.button}
            >
              Generate PDF
            </button>
          </div>
        </Form.Item>
      </Form>

      {/* ToastContainer for displaying toasts */}
      <ToastContainer />
    </div>
  );
};
