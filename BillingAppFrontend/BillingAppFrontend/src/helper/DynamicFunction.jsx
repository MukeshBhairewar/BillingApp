export const calculateTotalAmount = (materialsData) => {
    let total = 0;
    materialsData.forEach(item => {
        total += item.quantity * item.price;
    });
    return total;
}
