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

  @ViewChild(MatTable) table: MatTable<any>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private service: PatientsService, public dialog: MatDialog) {
    this.dataSource = new MatTableDataSource([] as IPatient[]);
   }

  ngOnInit() {
    this.service.getPatients().subscribe(data => {
      console.log("data: ", data);
      this.dataSource.data = data as IPatient[];
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
      width: '250px',
      data:obj
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result.event == 'Add'){
        this.addRowData(result.data);
      }else if(result.event == 'Update'){
        this.updateRowData(result.data);
      }else if(result.event == 'Delete'){
        this.deleteRowData(result.data);
      }
    });
  }

  addRowData(row_obj: IPatient){
    var d = new Date();
    this.dataSource.data.push({
      id: row_obj.id,
      firstName:row_obj.firstName,
      lastName: row_obj.lastName,
      birthday: row_obj.birthday
    });
    this.table.renderRows();
    
  }
  updateRowData(row_obj: any){
    this.dataSource.data = this.dataSource.data.filter((value,key)=>{
      if(value.id == row_obj.id){
        value.firstName = row_obj.firstName;
        value.lastName = row_obj.lastName;
        value.birthday = row_obj.birthday;
      }
      return true;
    });
  }
  deleteRowData(row_obj: any){
    this.dataSource.data = this.dataSource.data.filter((value,key)=>{
      return value.id != row_obj.id;
    });
  }
}
