using System.ComponentModel.DataAnnotations.Schema;

namespace ReactMaaserTrackerMUI_Starter.Data
{
    public class Income
    {
        public int Id { get; set; }
        public int SourceId { get; set; }
        [Column(TypeName = "decimal(18,2)")]
        public decimal Amount { get; set; }
        public DateTime Date { get; set; }

        public Source Source { get; set; }
    }
}