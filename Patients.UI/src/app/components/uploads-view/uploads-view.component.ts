import { Component, EventEmitter, Output } from '@angular/core';
import { NgxDropzoneChangeEvent } from 'ngx-dropzone';
import { MatSnackBar, MatSnackBarRef, MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';
import { PatientsService } from 'src/app/services/patients.service';

@Component({
  selector: 'app-uploads-view',
  templateUrl: './uploads-view.component.html',
  styleUrls: ['./uploads-view.component.scss']
})
export class UploadsViewComponent {
  files: File[] = [];
  @Output() newPatientList = new EventEmitter<any>(); 

  constructor(private service: PatientsService, private _snackbar: MatSnackBar) { }

  onFileInput(event: NgxDropzoneChangeEvent) {

    if(event.addedFiles.length) {
      this.files.push(...event.addedFiles);
    }
    if(event.rejectedFiles.length) {

      event.rejectedFiles.forEach( (rejectedFile, index) => {
        var reason = rejectedFile?.reason;
        var msg = "Cannot upload file " + rejectedFile.name + ". Reason: ";
        var duration = 3000;

        switch(reason) {
          case "type":
            msg += "Wrong file type. Only csv files are allowed.";
            break;
          case "size":
            msg += "File too large."
            break;
          default: 
            msg += "Unknown."
            break;
        }

        setTimeout(() => { 
          this._snackbar.open(msg, "OK", { 
            verticalPosition: "top", 
            horizontalPosition: "center",
            duration: duration
          });
        }, index * duration);
      });
    }
  }

  onRemove(file: File) {
    this.files.splice(this.files.indexOf(file), 1);
  }
  
  uploadFile() {
    if(this.files.length) {
      this.service.uploadFiles(this.files).subscribe(data => {
        this.newPatientList.emit(data);
      });
    } else {
      this._snackbar.open("Choose a file or files to upload", "OK", { 
        verticalPosition: "top", 
        horizontalPosition: "center",
        duration: 3000
      });
    }
  }
}
