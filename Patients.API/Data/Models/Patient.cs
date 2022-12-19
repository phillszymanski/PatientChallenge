using System.Text.Json.Serialization;

namespace Patients.API.Data.Models
{
    public class Patient
    {
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public DateTime Birthday { get; set; }
        public char Gender { get; set; }
    }
}
