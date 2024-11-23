using BillingAppBackend.Model;
using System.Data;
using Dapper;
using Microsoft.AspNetCore.Mvc;

namespace BillingAppBackend.Repository
{
    public class BillingRepository : IBillingRepository
    {
        private readonly IDbConnection _dbConnection;

        public BillingRepository(IDbConnection dbConnection)
        {
            _dbConnection = dbConnection;
        }

        public async Task<int> AddMaterial(Material material)
        {
            var query = "INSERT INTO Material (material_name, uom) VALUES (@MaterialName, @Uom); SELECT CAST(SCOPE_IDENTITY() as int)";
            return await _dbConnection.ExecuteScalarAsync<int>(query, material);
        }

        public async Task<int> AddBillingInfo(BillingInfo billingInfo)
        {
            var query = @"INSERT INTO BillingInfo (name_of_customer, billing_date, totalbillAmount)
                      VALUES (@NameOfCustomer, @BillingDate, @TotalBillAmount);
                      SELECT CAST(SCOPE_IDENTITY() as int)";
            var billingId = await _dbConnection.ExecuteScalarAsync<int>(query, billingInfo);

            foreach (var material in billingInfo.Materials)
            {
                var materialTotal = material.Quantity * material.Price;

                var billingMaterialQuery = @"INSERT INTO BillingMaterial (billing_id, material_id, quantity, price, amount)
                                         VALUES (@BillingId, @MaterialId, @Quantity, @Price, @Amount)";
                await _dbConnection.ExecuteAsync(billingMaterialQuery, new
                {
                    BillingId = billingId,
                    MaterialId = material.MaterialId,
                    Quantity = material.Quantity,
                    Price = material.Price,
                    Amount = materialTotal
                });
            }

            return billingId;
        }

        public async Task<List<dynamic>> GetAllMaterials()
        {
            var query = "SELECT material_id AS MaterialId, material_name AS MaterialName, uom AS Uom FROM Material";
            return (await _dbConnection.QueryAsync<dynamic>(query)).ToList();
        }

        public async Task<List<dynamic>> GetAllBillingInfo()
        {
            var query = @" SELECT billing_id as BillingID,name_of_customer as Name_OF_Customer,
                           CONVERT(varchar, billing_date, 106) AS BillingDate,
                           totalbillAmount as TotalBillAmount from [BillingInfo];";

            return (await _dbConnection.QueryAsync<dynamic>(query)).ToList();
        }

    }
}


