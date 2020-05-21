import { EmployeeDetailsComponent } from '../employee-details/employee-details.component';
import { Observable, Subscription } from "rxjs";
import { EmployeeService } from "../employee.service";
import { Employee } from "../employee";
import { Component, OnInit, OnDestroy } from "@angular/core";
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: "app-employee-list",
  templateUrl: "./employee-list.component.html",
  styleUrls: ["./employee-list.component.css"]
})
export class EmployeeListComponent implements OnInit {
  // employees: Observable<[]>;
  // subscription: Subscription;
  page: number = 0;
  employees: Array<any>;
  pages: Array<number>;

  constructor(private employeeService: EmployeeService,
    private router: Router,private activatedRoute: ActivatedRoute) {
      this.router.routeReuseStrategy.shouldReuseRoute=()=>false;
     }

    

  ngOnInit() {
    //  this.subscription= this.employeeService.pageRefresh.subscribe(() => {
    //     this.getEmployeesList();
    //   }
    //   );
    this.getEmployeesList();
    // this.reloadData();
  }
  // ngOnDestroy() {
  //   // this.subscription.unsubscribe();
  // }
  setPage(i, event: any) {
    i == null ? 0 : 1;
    event.preventDefault();
    this.page = i;
    this.getEmployeesList();
  }

  getEmployeesList() {
    this.employeeService.getEmployeeList(this.page).subscribe(
      data => {
        this.employees = data['content'];
        this.pages = new Array(data['totalPages'])
        // console.log(data);
      },
      error => console.log(error)
    );
  }
  deleteEmployee(id: number) {
    this.employeeService.deleteEmployee(id)
    .toPromise().then(data => {
      // this.router.navigate(['/employees']);
    });
    // this.reloadData();
  }

  
  employeeDetails(id: number) {
    this.router.navigate(['details', id]);
  }
  updateEmployee(id: number) {
    this.router.navigate(['update', id]);
  }
  reloadData() {
    console.log("step 3 data");
    console.log('inside reload');
    this.router.navigate(['/employees']);
    // this.getEmployeesList();
  }
}