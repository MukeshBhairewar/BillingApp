using BillingAppBackend.Model;
using Microsoft.AspNetCore.Mvc;

namespace BillingAppBackend.Repository
{
    public interface IBillingRepository
    {
        Task<int> AddMaterial(Material material);
        Task<int> AddBillingInfo(BillingInfo billingInfo);
        Task<List<dynamic>> GetAllMaterials();
        Task<List<dynamic>> GetAllBillingInfo();

    }
}
