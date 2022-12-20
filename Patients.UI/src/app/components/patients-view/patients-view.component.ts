import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import {MatSort, Sort} from '@angular/material/sort';
import {MatPaginator} from '@angular/material/paginator';
import { PatientsService } from 'src/app/services/patients.service';
import { IPatient } from './ipatient';
import { MatDialog } from '@angular/material/dialog';
import { DialogBoxComponent } from '../dialog-box/dialog-box.component';

@Component({
  selector: 'app-patients-view',
  templateUrl: './patients-view.component.html',
  styleUrls: ['./patients-view.component.scss']
})
export class PatientsViewComponent implements AfterViewInit {
  displayedColumns: string[] = ['firstName', 'lastName', 'birthdate', 'gender', 'action'];
  dataSource: MatTableDataSource<IPatient>;
  loading: boolean = true;

  @ViewChild(MatTable) table: MatTable<any>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private service: PatientsService, public dialog: MatDialog) {
    this.dataSource = new MatTableDataSource([] as IPatient[]);
   }

  ngOnInit() {
    this.service.getPatients().subscribe(data => {
      this.dataSource.data = data as IPatient[];
      this.loading = false;
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  openDialog(action:any,obj:any) {
    obj.action = action;
    const dialogRef = this.dialog.open(DialogBoxComponent, {
      width: '25%',
      data:obj
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result.event == 'Update'){
        this.updateRowData(result.data);
      }
    });
  }

  updateRowData(row_obj: IPatient){
    var newData = this.dataSource.data.filter((value,key)=>{
      if(value.id == row_obj.id){
        value.firstName = row_obj.firstName;
        value.lastName = row_obj.lastName;
        value.birthday = row_obj.birthday;
      }
      return true;
    });
    this.service.updatePatient(row_obj).subscribe(data => {

    })
  }

  updatePatientList(event: any) {
    this.dataSource.data = event.value;
    this.table.renderRows();
  }
}
