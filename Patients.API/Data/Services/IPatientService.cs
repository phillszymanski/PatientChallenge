using Microsoft.AspNetCore.Mvc;
using Patients.API.Data.Models;

namespace Patients.API.Data.Services
{
    public interface IPatientService
    {
        List<Patient> GetAllPatients();
        Patient? UpdatePatient(Patient patient);
        ActionResult<IEnumerable<Patient>> UploadPatients(IFormFileCollection files);
    }
}
