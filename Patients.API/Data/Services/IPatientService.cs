using Microsoft.AspNetCore.Mvc;
using Patients.API.Data.Models;

namespace Patients.API.Data.Services
{
    public interface IPatientService
    {
        List<Patient> GetAllPatients();
        Patient GetPatientById(int id);
        Patient? UpdatePatient(Patient patient);
        void DeletePatient(int id);
        ActionResult<IEnumerable<Patient>> UploadPatients(IFormFileCollection files);
    }
}
