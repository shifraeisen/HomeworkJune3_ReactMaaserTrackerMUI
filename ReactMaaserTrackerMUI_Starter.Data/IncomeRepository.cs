using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ReactMaaserTrackerMUI_Starter.Data
{
    public class IncomeRepository
    {
        private readonly string _connectionString;

        public IncomeRepository(string connectionString)
        {
            _connectionString = connectionString;
        }
        public void AddIncome(Income i)
        {
            using var context = new MaaserTrackerDataContext(_connectionString);
            context.Incomes.Add(i);
            context.SaveChanges();
        }
        public List<Income> GetIncomes()
        {
            using var context = new MaaserTrackerDataContext(_connectionString);
            return context.Incomes.Include(i => i.Source).ToList();
        }
        public decimal GetTotalIncome()
        {
            using var context = new MaaserTrackerDataContext(_connectionString);
            return context.Incomes.Select(i => i.Amount).Sum();
        }
    }
}
