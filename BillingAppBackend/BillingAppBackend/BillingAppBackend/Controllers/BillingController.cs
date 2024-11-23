using BillingAppBackend.Model;
using BillingAppBackend.Repository;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace BillingAppBackend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BillingController : ControllerBase
    {
        private readonly IBillingRepository _billingRepository;

        public BillingController(IBillingRepository billingRepository)
        {
            _billingRepository = billingRepository;
        }

        // Add a new material
        [HttpPost("AddMaterial")]
        public async Task<IActionResult> AddMaterial([FromBody] Material material)
        {
            var id = await _billingRepository.AddMaterial(material);
            return Ok(new { Message = "Material added successfully", MaterialId = id });
        }

        // Add new billing information along with the materials
        [HttpPost("AddBillingInfo")]
        public async Task<IActionResult> AddBillingInfo([FromBody] BillingInfo billingInfo)
        {
            var id = await _billingRepository.AddBillingInfo(billingInfo);
            return Ok(new { BillingId = id });
        }

        // Get all materials
        [HttpGet("GetAllMaterials")]
        public async Task<IActionResult> GetAllMaterials()
        {
            var materials = await _billingRepository.GetAllMaterials();
            return Ok(materials);
        }

        // Get all billing information
        [HttpGet("GetAllBillingInfo")]
        public async Task<IActionResult> GetAllBillingInfo()
        {
            var billingInfos = await _billingRepository.GetAllBillingInfo();
            return Ok(billingInfos);
        }
    }
}
