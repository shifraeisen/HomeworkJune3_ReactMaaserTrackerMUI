using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ReactMaaserTrackerMUI_Starter.Data
{
    public class MaaserRepository
    {
        private readonly string _connectionString;

        public MaaserRepository(string connectionString)
        {
            _connectionString = connectionString;
        }
        public void AddMaaser(Maaser m)
        {
            using var context = new MaaserTrackerDataContext(_connectionString);
            context.Maaser.Add(m);
            context.SaveChanges();
        }
        public List<Maaser> GetMaaser()
        {
            using var context = new MaaserTrackerDataContext(_connectionString);
            return context.Maaser.ToList();
        }
        public decimal GetTotalMaaser()
        {
            using var context = new MaaserTrackerDataContext(_connectionString);
            return context.Maaser.Select(m => m.Amount).Sum();
        }
    }
}
