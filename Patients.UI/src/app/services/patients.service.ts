import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PatientsService {

  _baseUrl: string = "https://localhost:49157/api/Patients";

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
}
