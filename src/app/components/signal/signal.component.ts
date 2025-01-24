import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, computed, signal } from '@angular/core';

import * as bootstrap from 'bootstrap';
import { AddEmployeeComponent } from '../add-employee/add-employee.component';
import { LoginComponent } from "../login/login.component";


@Component({
  selector: 'app-signal',
  standalone: true,
  imports: [CommonModule, AddEmployeeComponent, LoginComponent],
  templateUrl: './signal.component.html',
  styleUrl: './signal.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SignalComponent {

  firstName = signal("Chetan");
  lastName = signal("Jogi");

  fullName = computed(() => this.firstName() + " " + this.lastName())

  courseName: string = "Angular";

  rollNo = signal<number>(123);

  cityList = signal(["Pune", 'Mumbai']);
  studentObj = signal({
    name: 'Chetan',
    city: 'Pune'
  })

  permissions: string = 'admin'; // This should be set based on your actual logic
  isDashboardVisible: boolean = false;
  
  showDashboard() {
    this.isDashboardVisible = true;
    const modal = new bootstrap.Modal(document.getElementById('adminModal')!);
    modal.show();
    }

  constructor(private cd: ChangeDetectorRef) {
    const fNae = this.firstName();
    setTimeout(() => {
      // this.firstName.set("Dot Net");
      this.courseName = "HTML";
      //this.cd.detectChanges()
    }, 5000);

  }
  changeStudetnCity() {
    this.studentObj.set({ ...this.studentObj(), city: 'Mumbai' })
  }
  addCity() {
    this.cityList.set([...this.cityList(), "Nagpur"])
  }

  changeName() {
    this.firstName.set("Sachin")
  }
  changeLastName() {
    this.lastName.set("Tendulkar")
  }


}
