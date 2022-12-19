using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Patients.API.Data.Models;
using Patients.API.Data.Services;

namespace Patients.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PatientsController : ControllerBase
    {
        private IPatientService _service;
        private readonly ILogger<PatientsController> _logger;

        public PatientsController(IPatientService service, ILogger<PatientsController> logger)
        {
            _service = service;
            _logger = logger;
        }

        [HttpGet]
        public ActionResult<IEnumerable<Patient>> GetPatients()
        {
            var patients = _service.GetAllPatients();
            return Ok(patients);
        }

        [HttpPost, DisableRequestSizeLimit]
        public ActionResult<IEnumerable<Patient>> UploadFiles()
        {
            var newPatients = _service.UploadPatients(Request.Form.Files);
            return Ok(newPatients);
        }

        [HttpPatch]
        public ActionResult<Patient> UpdatePatient(Patient patient)
        {
            var updatedPatient = _service.UpdatePatient(patient);
            return Ok(updatedPatient);
        }

        [HttpDelete]
        public ActionResult DeletePatient(int id)
        {
            return Ok();
        }
    }
}
