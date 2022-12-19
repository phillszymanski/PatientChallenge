using Microsoft.VisualBasic.FileIO;
using Patients.API.Data.Models;
using System.Net.Mime;

namespace Patients.API.Data.Services
{
    public class PatientService : IPatientService
    {
        ChallengeContext _context;

        public PatientService(ChallengeContext context)
        {
            _context = context;
        }

        public void DeletePatient(int id)
        {
            throw new NotImplementedException();
        }

        public List<Patient> GetAllPatients()
        {
            return _context.Patients.ToList();
        }

        public Patient GetPatientById(int id)
        {
            throw new NotImplementedException();
        }

        public void UpdatePatient(int id, Patient patient)
        {
            throw new NotImplementedException();
        }

        public void UploadPatients(IFormFileCollection files)
        {
            List<Patient> patients = new List<Patient>();

            foreach (var file in files) {
                switch (file.ContentType) { // Using a switch here to make it easier to add support for other file types later
                    case "text/csv":
                        using (var csvReader = new StreamReader(file.OpenReadStream()))
                        {
                            var headerLine = csvReader.ReadLine();
                            while (!csvReader.EndOfStream)
                            {
                                var patient = new Patient();
                                var line = csvReader.ReadLine();
                                if (!string.IsNullOrEmpty(line))
                                {
                                    var values = line.Split(',');
                                    DateTime birthday;
                                    char gender;

                                    patient.FirstName = values[0];
                                    patient.LastName = values[1];
                                    //patient.Birthday = DateOnly.Parse( values[2] );
                                    /*DateOnly.TryParse(values[2], out birthday)*/

                                    if (DateTime.TryParse(values[2], out birthday))
                                    {
                                        patient.Birthday = birthday;
                                    }
                                    if (char.TryParse(values[3], out gender))
                                    {
                                        patient.Gender = gender;
                                    }

                                    patients.Add(patient);
                                }
                            }
                        }
                        _context.AddRange(patients);
                        _context.SaveChanges();
                        break;
                    default:
                        throw new ArgumentOutOfRangeException("ContentType", "File type not allowed: " + file.ContentType);
                }
            }
        }
    }
}
