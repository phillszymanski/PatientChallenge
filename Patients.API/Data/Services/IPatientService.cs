using Patients.API.Data.Models;

namespace Patients.API.Data.Services
{
    public interface IPatientService
    {
        List<Patient> GetAllPatients();
        Patient GetPatientById(int id);
        void UpdatePatient(int id, Patient patient);
        void DeletePatient(int id);
        void UploadPatients(IFormFileCollection files);
    }
}
