import { AsyncPipe, DatePipe, JsonPipe, LowerCasePipe, PercentPipe, TitleCasePipe, UpperCasePipe } from '@angular/common';
import { Component } from '@angular/core';
import { Observable, interval, map } from 'rxjs';
import { NaPipe } from '../../pipes/na.pipe';
import { DepartmentService } from '../../service/department.service';

@Component({
  selector: 'app-pipe',
  standalone: true,
  imports: [NaPipe, AsyncPipe, JsonPipe, DatePipe, UpperCasePipe, LowerCasePipe, TitleCasePipe, PercentPipe],
  templateUrl: './pipe.component.html',
  styleUrl: './pipe.component.css'
})
export class PipeComponent {

  firstName: string = "this is a demo session";

  currentDate: Date = new Date();

  currentTime: Observable<Date> = new Observable<Date>;

  student: any = {
    name: 'Chetan',
    city: 'Pune',
    empId: 323,
    state: undefined
  };
  currentRole: string = '';

  a: number = 0.259;
  b: number = 1.3495;

  constructor(private deptService: DepartmentService) {
    this.currentTime = interval(1000).pipe(map(() => new Date()));
    this.deptService.onRoleChange$.subscribe((role: string) => {
      debugger;
      this.currentRole = role;
    })
    this.deptService.role$.subscribe((res: string) => {
      debugger;
    })

  }

}
