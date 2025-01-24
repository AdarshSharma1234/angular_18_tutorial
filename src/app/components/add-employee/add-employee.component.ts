 
import { HttpClient } from '@angular/common/http';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, OnInit, signal } from '@angular/core';
import { EmployeeService } from '../../service/employee.service';
import { DisableCopyDirective } from '../../shared/disable-copy.directive';
import { CommonModule } from '@angular/common';
import * as bootstrap from 'bootstrap';

@Component({
  selector: 'app-add-employee',
  standalone: true,
  imports: [CommonModule, DisableCopyDirective],
  templateUrl: './add-employee.component.html',
  styleUrl: './add-employee.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddEmployeeComponent implements OnInit {
   
  empService = inject(EmployeeService);
  // userList: any[]=[];
  name: string = 'Adarsh';

  userList = signal<any[]>([])

  constructor(private cdRef:ChangeDetectorRef){

  }

  ngOnInit(): void {
    this.empService.getUsers().subscribe((res:any)=>{
      this.userList.set(res);
      this.name = ""; 
    })
  }

  openModal() {
    const modalElement = document.getElementById('userTableModal') as HTMLElement;
    const modal = new bootstrap.Modal(modalElement);
    modal.show();
    }
 
}
