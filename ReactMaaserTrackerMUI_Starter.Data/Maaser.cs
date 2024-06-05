using System.ComponentModel.DataAnnotations.Schema;

namespace ReactMaaserTrackerMUI_Starter.Data
{
    public class Maaser
    {
        public int Id { get; set; }
        public string Recipient { get; set; }
        [Column(TypeName = "decimal(18,2)")]
        public decimal Amount { get; set; }
        public DateTime Date { get; set; }
    }
}