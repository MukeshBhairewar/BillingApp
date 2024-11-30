
export const GeneratePDFContent = (doc, customerName, billingDate, materialsData, totalBillAmount) => {
  // Add company logo
  const img = "src/assets/bulb.png"; // Path to the image
  doc.addImage(img, "PNG", 150, 10, 40, 20); // Positioning the logo (x, y, width, height)

  // Add company name in bold and centered
  doc.setFont("helvetica", "bold");
  doc.setFontSize(16);
  doc.text("Chaitanya Electricals", 105, 30, { align: "center" });

  // Reset font for the rest of the document
  doc.setFont("helvetica", "normal");
  doc.setFontSize(12);

  // Add customer information
  doc.text(`Customer Name: ${customerName}`, 20, 50);
  doc.text(`Billing Date: ${billingDate}`, 20, 60);

  // Add table header
  let yPosition = 80;
  doc.setFont("helvetica", "bold");
  doc.text("Material Details", 20, yPosition);

  yPosition += 10;
  doc.setFontSize(10);
  doc.text("S.No", 20, yPosition);
  doc.text("Material Name", 40, yPosition);
  doc.text("UoM", 90, yPosition);
  doc.text("Quantity", 110, yPosition);
  doc.text("Price", 130, yPosition);
  doc.text("Amount", 160, yPosition);

  // Draw a horizontal line under the header
  yPosition += 5;
  doc.line(20, yPosition, 190, yPosition);

  // Add materials table rows
  doc.setFont("helvetica", "normal");
  materialsData.forEach((item, index) => {
    yPosition += 10;

    // Ensure values are valid and default to placeholders if missing
    const materialName = item.materialName || "N/A";
    const uom = item.uom || "N/A";
    const quantity = Number(item.quantity) || 0;
    const price = Number(item.price).toFixed(2) || "0.00";
    const amount = (quantity * Number(item.price)).toFixed(2);

    // Format and display each row in the table
    doc.text(`${index + 1}`, 20, yPosition);
    doc.text(materialName, 40, yPosition);
    doc.text(uom, 90, yPosition);
    doc.text(quantity.toString(), 110, yPosition);
    doc.text(price, 130, yPosition);
    doc.text(amount, 160, yPosition);
  });

  // Add total amount
  yPosition += 20;
  doc.setFont("helvetica", "bold");
  doc.text(`Total Amount: ${totalBillAmount.toFixed(2)}`, 20, yPosition);

  // Add footer note
  yPosition += 20;
  doc.setFontSize(10);
  doc.text("This bill is generated electronically.", 105, yPosition, { align: "center" });
};
