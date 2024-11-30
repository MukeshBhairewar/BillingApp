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
  doc.setFont("helvetica", "bold")
  doc.text(`Customer Name: ${customerName}`, 20, 50);
  doc.text(`Billing Date: ${billingDate}`, 20, 60);

  // Add table header
  let yPosition = 80;
  const columnPositions = [20, 40, 90, 110, 130, 160]; // X positions for each column
  const columnWidths = [20, 50, 20, 20, 30, 30]; // Widths for each column

  doc.setFont("helvetica", "bold");
  doc.text("Billing Details", 20, yPosition);

  yPosition += 10;
  doc.setFontSize(10);
  const header = ["S.No", "Material Name", "UoM", "Quantity", "Price", "Amount"];

  // Draw header row with borders
  doc.setFillColor(220, 220, 220); // Light gray for the header background
  doc.rect(20, yPosition - 8, 170, 10, "F"); // Header background
  header.forEach((text, index) => {
    doc.text(text, columnPositions[index] + 2, yPosition);
  });

  // Draw grid for materials data
  doc.setFont("helvetica", "normal");
  yPosition += 5; // Move below header
  materialsData.forEach((item, index) => {
    yPosition += 10;

    // Ensure values are valid and default to placeholders if missing
    const materialName = item.materialName || "N/A";
    const uom = item.uom || "N/A";
    const quantity = Number(item.quantity) || 0;
    const price = Number(item.price).toFixed(2) || "0.00";
    const amount = (quantity * Number(item.price)).toFixed(2);

    // Draw grid cells
    doc.rect(20, yPosition - 8, 20, 10); // S.No
    doc.rect(40, yPosition - 8, 50, 10); // Material Name
    doc.rect(90, yPosition - 8, 20, 10); // UoM
    doc.rect(110, yPosition - 8, 20, 10); // Quantity
    doc.rect(130, yPosition - 8, 30, 10); // Price
    doc.rect(160, yPosition - 8, 30, 10); // Amount

    // Add text in cells
    const row = [`${index + 1}`, materialName, uom, quantity.toString(), price, amount];
    row.forEach((text, i) => {
      doc.text(text, columnPositions[i] + 2, yPosition);
    });
  });

   // Add total amount with proper alignment
   yPosition += 20;

   const totalText = `Total Amount: ${totalBillAmount.toFixed(2)}`;
   const textWidth = doc.getTextWidth(totalText);
   const textHeight = 10; // Approximate height for 10pt font size
   const rectX = 190 - textWidth - 10; // Right-align with padding
   const rectY = yPosition - textHeight / 2; // Vertically center align
   const rectWidth = textWidth + 20; // Add padding to the rectangle
 
   doc.setFillColor(255, 255, 0); // Light yellow color
   doc.rect(rectX, rectY, rectWidth, textHeight, "F"); // Draw rectangle with calculated dimensions
 
   doc.setFont("helvetica", "bold");
   doc.text(totalText, rectX + 10, yPosition); // Align text inside the rectangle
 

  // Add footer note
  yPosition += 20;
  doc.setFontSize(10);
  doc.text("**This bill is generated electronically.**", 105, yPosition, { align: "center" });
};
