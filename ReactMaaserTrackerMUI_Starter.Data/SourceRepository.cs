using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http.Headers;
using System.Text;
using System.Threading.Tasks;

namespace ReactMaaserTrackerMUI_Starter.Data
{
    public class SourceRepository
    {
        private readonly string _connectionString;

        public SourceRepository(string connectionString)
        {
            _connectionString = connectionString;   
        }

        public void AddSource(Source s)
        {
            using var context = new MaaserTrackerDataContext(_connectionString);
            context.Sources.Add(s);
            context.SaveChanges();
        }
        public List<Source> GetSources()
        {
            using var context = new MaaserTrackerDataContext(_connectionString);
            return context.Sources.ToList();
        }
        public void UpdateSource(Source s)
        {
            using var context = new MaaserTrackerDataContext(_connectionString);
            context.Sources.Update(s);
            context.SaveChanges();
        }
        public void DeleteSource(int id)
        {
            using var context = new MaaserTrackerDataContext(_connectionString);
            context.Sources.Remove(context.Sources.First(s => s.Id == id));
            context.SaveChanges();
        }
    }
}
