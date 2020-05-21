import { EmployeeService } from '../employee.service';
import { Employee } from '../employee';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.css']
})
export class CreateEmployeeComponent implements OnInit {

  employee: Employee = new Employee();
  submitted = false;
  error:Error=null;
  containsError:boolean=false;
  // subscription: Subscription;
  constructor(private employeeService: EmployeeService, private http: HttpClient,
    private router: Router) { }

  ngOnInit() {

  }
  // ngOnDestroy() {
  //   this.subscription.unsubscribe();
  // }

  // newEmployee(): void {
  //   this.submitted = false;
  //   this.employee = new Employee();
  // }

  save() {
    this.employeeService.createEmployee(this.employee)
      .subscribe(data => { console.log(data) },
       error =>{ 
        this.error=error.error.message; 
        this.containsError=true;
        console.log(error)});
    this.employee = new Employee();
    // this.gotoList();
  }

  onSubmit() {
    this.submitted = true;
    this.save();
  }

  gotoList() {
    this.router.navigate(['/employees']);
  }
  title = 'ImageUploaderFrontEnd';

  public selectedFile;
  public event1;
  imgURL: any;
  receivedImageData: any;
  base64Data: any;
  convertedImage: any;

  public onFileChanged(event) {
    console.log(event);
    this.selectedFile = event.target.files[0];

    // Below part is used to display the selected image
    let reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    reader.onload = (event2) => {
      this.imgURL = reader.result;
      this.employee.data = this.imgURL;
    };
  }
  // onUpload() {


  //   const uploadData = new FormData();
  //   uploadData.append('myFile', this.selectedFile, this.selectedFile.name);


  //   this.http.post('http://localhost:9090/springboot-crud-rest/api/v1/employees/upload', uploadData)
  //   .subscribe(
  //                res => {console.log(res);
  //                        this.receivedImageData = res;
  //                        this.base64Data = this.receivedImageData.data;
  //                        this.convertedImage = 'data:image/jpeg;base64,' + this.base64Data; },
  //                err => console.log('Error Occured duringng saving: ' + err)
  //             );


  //  }
}

