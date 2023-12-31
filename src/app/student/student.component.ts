import { Component, OnInit, ViewChild } from '@angular/core';
import { studentmodel } from '../Model/StudentModel';
import { StudentWithId } from '../Model/StudentWithId';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { PopupComponent } from '../popup/popup.component';
import { HttpClient } from '@angular/common/http';
import { ApiService } from '../shared/api.service';
import * as alertyfy from 'alertifyjs';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { FormBuilder } from '@angular/forms';


@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent implements OnInit {
  constructor(private dialog:MatDialog, private api:ApiService, private builder:FormBuilder){}
  @ViewChild(MatPaginator) _paginator!:MatPaginator;
  @ViewChild(MatSort) _sort!:MatSort;
  studentdata!: studentmodel[];
  studentsdata!: StudentWithId[];
  finaldata:any;
  url:any;

  ngOnInit(): void {
    this.getStudents(0,10,null);
    url: "./assets/profile.jpg";
  }
  search = this.builder.group({
    searchkey: this.builder.control(''),
  })

  displayColumns:string[] = ["FirstName", "LastName", "ContactNo", "Email", "Ssn","Address","Image", "Action"];
  openPopup(id:any){
     const _popup = this.dialog.open(PopupComponent,{
      width: '1000px',
      exitAnimationDuration: '1000ms',
      enterAnimationDuration: '1000ms',
      data:{
        id:id
      }
     })
     _popup.afterClosed().subscribe(r=>{
        this.getStudents(0,10,null);
     });   
  }

  getStudents(pageNo:any, pageSize:any,orderby:any){
    this.api.GetAllStudents(pageNo,pageSize,orderby).subscribe(response=>{
      this.studentsdata = response;
      this.finaldata = new MatTableDataSource<StudentWithId>(this.studentsdata);
      this.finaldata.paginator = this._paginator;
      this.finaldata.sort = this._sort;
    });
  }

  EditStudent(studentId:number){
    this.openPopup(studentId);
  }

  RemoveStudent(studentId:number){
    alertyfy.confirm("Remove Student", "Do You want to remove this student?",()=>{
      this.api.RemoveStudentById(studentId).subscribe(response=>{
        this.getStudents(0,10,null);
      });
    }, function(){

    })    
  }

  SearchStudent(){
    this.api.Searchstudent(this.search.getRawValue().searchkey).subscribe(response=>{
      this.studentsdata = response;
      this.finaldata = new MatTableDataSource<StudentWithId>(this.studentsdata);
      this.finaldata.paginator = this._paginator;
      this.finaldata.sort = this._sort;
      });    
  }

  pageHandeler(e: any){
    debugger;
    console.log(e);
    this.getStudents(e.previousPageIndex,e.pageSize,null);
  }

}
