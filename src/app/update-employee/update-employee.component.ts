import { Component, OnInit } from '@angular/core';
import { Employee } from '../employee';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from '../employee.service';

@Component({
  selector: 'app-update-employee',
  templateUrl: './update-employee.component.html',
  styleUrls: ['./update-employee.component.css']
})
export class UpdateEmployeeComponent implements OnInit {

  id: number;
  employee: Employee;
  submitted = false;

  public selectedFile;
  public event1;
  imgURL1: any;

  convertedImage: any;

  constructor(private route: ActivatedRoute, private router: Router,
    private employeeService: EmployeeService) { }

  ngOnInit() {
    this.employee = new Employee();

    this.id = this.route.snapshot.params['id'];

    this.employeeService.getEmployee(this.id)
      .subscribe(data => {
        console.log("inside ngOnIn of Update" + data)
        this.employee = data;
      }, error => console.log(error));
  }

  public onFileChanged(event) {
    console.log(event);
    this.selectedFile = event.target.files[0];

    // Below part is used to display the selected image
    let reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    reader.onload = (event2) => {
      this.imgURL1 = reader.result;
      this.employee.data = this.imgURL1;
    };
  }

  onSubmit() {
    this.updateEmployee();
    this.submitted=true;

  }

  updateEmployee() {
    this.employeeService.updateEmployee(this.id, this.employee)
      .subscribe(data => {
        console.log("inside update"+data),
        this.employee = data;
        // this.refreshMethod();
      }, error => console.log(error));
    this.employee = new Employee();
     this.gotoList();
  }


  gotoList() {
  this.router.navigate(['/employees']);
  }
}