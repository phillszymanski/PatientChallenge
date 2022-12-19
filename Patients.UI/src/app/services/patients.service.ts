import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IPatient } from '../components/patients-view/ipatient';

@Injectable({
  providedIn: 'root'
})
export class PatientsService {

  _baseUrl: string = "https://localhost:7181/api/Patients";

  constructor(private http: HttpClient) { }

  getPatients() {
    return this.http.get(this._baseUrl);
  }

  uploadFiles(files: File[]) {
    const formData: FormData = new FormData();
    for (let i = 0; i < files.length; i++) {
      formData.append(i.toString(), files[i], files[i].name);
    }
    return this.http.post(this._baseUrl, formData);
  }

  updatePatient(patient: IPatient) {
    return this.http.patch(this._baseUrl, patient);
  }

  deletePatient(id: number) {
    return this.http.delete(this._baseUrl + "?id=" + id);
  }
}
