import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Employee } from './employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {


  private baseUrl = 'http://localhost:9090/springboot-crud-rest/api/v1/employees';

  private baseUrl1 = 'http://localhost:9090/springboot-crud-rest/api/v1/employees/lst';

  constructor(private http: HttpClient) { }
  // private _pageRefresh = new Subject<void>();
  // uploadImage(uploadData:any){
  //   return this.http.post(this.imageUrl);

  // }
  // get pageRefresh() {
  //   return this._pageRefresh;
  // }
  getEmployeeList(page: number): Observable<any> {
    return this.http.get(this.baseUrl1 + '?page=' + page);
  }

  getEmployee(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  createEmployee(employee: Object): Observable<Object> {
    return this.http.post(this.baseUrl, employee);
  }

  updateEmployee(id: number, value: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/${id}`, value);
}


deleteEmployee(id: number): Observable < any > {
  return this.http.delete(`${this.baseUrl}/${id}`, { responseType: 'text' });
}

  // getEmployeesList(): Observable<any> {  
  //   return this.http.get(`${this.baseUrl}`);
  // }
}