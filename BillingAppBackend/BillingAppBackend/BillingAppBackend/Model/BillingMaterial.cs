namespace BillingAppBackend.Model
{
    public class BillingMaterial
    {
        public int MaterialId { get; set; }  // ID of the material (foreign key)
        public int Quantity { get; set; }  // Quantity of the material in the billing
        public decimal Price { get; set; }  // Price of the material
        public decimal Amount { get; set; }  // Total amount (Quantity * Price)
    }

}
