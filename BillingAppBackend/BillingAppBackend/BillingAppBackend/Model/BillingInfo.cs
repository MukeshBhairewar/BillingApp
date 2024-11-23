namespace BillingAppBackend.Model
{
    public class BillingInfo
    {
        public string NameOfCustomer { get; set; }  // Customer's name
        public DateTime BillingDate { get; set; }  // Date of billing
        public decimal TotalBillAmount { get; set; }  // Total bill amount
        public List<BillingMaterial> Materials { get; set; }  // List of materials for this billing
    }

}
