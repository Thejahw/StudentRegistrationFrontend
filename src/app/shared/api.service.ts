import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { studentmodel } from '../Model/StudentModel';
import { Observable} from 'rxjs';
import { StudentWithId } from '../Model/StudentWithId';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http:HttpClient ) { }
  apiUrl = 'https://localhost:7082/api/Student';

  GetAllStudents(pageNo:any, pageSize:any,orderby:any):Observable<StudentWithId[]>{
    return this.http.get<StudentWithId[]>(this.apiUrl+'/'+pageNo+'/'+pageSize);
  }
  saveStudent(studentdata:any){
    return this.http.post(this.apiUrl, studentdata);
  }

  GetSudentById(Id:any): Observable<studentmodel>{
    return this.http.get<studentmodel>(this.apiUrl+'/'+Id);
  }

  RemoveStudentById(Id:any){
    return this.http.delete(this.apiUrl+'/'+Id);
  }

  UpdateStudent(Id:any, studentdata: any){
    return this.http.put(this.apiUrl+'/'+Id, studentdata);
  }
  Searchstudent(key:any):Observable<StudentWithId[]>{
    return this.http.get<StudentWithId[]>(this.apiUrl+'/search/'+key);
  }
  SaveProfileImage(Id:any, image:any){
    return this.http.put(this.apiUrl+'/profile/'+Id,image);
  }
}
