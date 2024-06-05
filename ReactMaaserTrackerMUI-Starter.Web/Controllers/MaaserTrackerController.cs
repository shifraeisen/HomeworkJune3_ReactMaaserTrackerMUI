using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ReactMaaserTrackerMUI_Starter.Data;
using ReactMaaserTrackerMUI_Starter.Web.Models;

namespace ReactMaaserTrackerMUI_Starter.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MaaserTrackerController : ControllerBase
    {
        private readonly string _connectionString;

        public MaaserTrackerController(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("ConStr");
        }
        [HttpPost("AddSource")]
        public void AddSource(Source s)
        {
            var repo = new SourceRepository(_connectionString);
            repo.AddSource(s);
        }
        [HttpGet("GetSources")]
        public List<Source> GetSources()
        {
            var repo = new SourceRepository(_connectionString);
            return repo.GetSources();
        }
        [HttpPost("UpdateSource")]
        public void UpdateSource(Source s)
        {
            var repo = new SourceRepository(_connectionString);
            repo.UpdateSource(s);
        }
        [HttpPost("DeleteSource")]
        public void DeleteSource(DeleteSourceModel m)
        {
            var repo = new SourceRepository(_connectionString);
            repo.DeleteSource(m.Id);
        }
        [HttpPost("AddIncome")]
        public void AddIncome(Income i)
        {
            var repo = new IncomeRepository(_connectionString);
            repo.AddIncome(i);
        }
        [HttpGet("GetIncomes")]
        public List<Income> GetIncomes()
        {
            var repo = new IncomeRepository(_connectionString);
            return repo.GetIncomes();
        }
        [HttpPost("AddMaaser")]
        public void AddMaaser(Maaser m)
        {
            var repo = new MaaserRepository(_connectionString);
            repo.AddMaaser(m);
        }
        [HttpGet("GetMaaser")]
        public List<Maaser> GetMaaser()
        {
            var repo = new MaaserRepository(_connectionString);
            return repo.GetMaaser();
        }
        [HttpGet("GetOverviewData")]
        public OverviewModel GetOverviewData()
        {
            var irepo = new IncomeRepository(_connectionString);
            var mrepo = new MaaserRepository(_connectionString);

            var totalIncome = irepo.GetTotalIncome();
            var totalMaaser = mrepo.GetTotalMaaser();
            var maaserOb = totalIncome / 10;

            return new OverviewModel
            {
                TotalIncome = totalIncome,
                TotalMaaser = totalMaaser,
                MaaserObligated = maaserOb.ToString("#.##"),
                RemainingMaaserObligation = (maaserOb - totalMaaser).ToString("#.##")
            };
        }
    }
}
