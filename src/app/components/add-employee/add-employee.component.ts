import { HttpClient } from '@angular/common/http';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, OnInit, signal } from '@angular/core';
import { EmployeeService } from '../../service/employee.service';
import { DisableCopyDirective } from '../../shared/disable-copy.directive';
import { CommonModule } from '@angular/common';
import * as bootstrap from 'bootstrap';

import { AgCharts } from 'ag-charts-angular';
// Chart Options Type Interface
import { AgChartOptions } from 'ag-charts-community';

@Component({
  selector: 'app-add-employee',
  standalone: true,
  imports: [CommonModule, DisableCopyDirective, AgCharts],
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddEmployeeComponent implements OnInit {

  empService = inject(EmployeeService);
  name: string = 'Adarsh';
  public chartOptions: AgChartOptions;
  public options: AgChartOptions;
  public lineOptions: AgChartOptions;
  public donutChartOptions: AgChartOptions;

  userList = signal<any[]>([]);

  constructor(private cdRef: ChangeDetectorRef) {
    // Bar chart configuration
    this.chartOptions = {
      data: [], // Empty data will be populated later
      series: [{ type: 'bar', xKey: 'userName', yKey: 'age' }]
    };

    this.donutChartOptions = {
      data: [],
      title: {
        text: "Portfolio Composition",
      },
      series: [
        {
          type: "pie",
          angleKey: "age",
          calloutLabelKey: "userName",
          sectorLabel: {
            color: "white",
            fontWeight: "bold",
            formatter: ({ value }) => `${value}`
          },
        },
      ],
    };

    this.lineOptions = {
      data: [], // Empty data will be populated later
      series: [{ type: 'line', xKey: 'userName', yKey: 'age' }]
    };

    this.options = {
      data: [],
      title: {
        text: "Portfolio Composition",
      },
      series: [
        {
          type: "pie",
          angleKey: "age",
          calloutLabelKey: "userName",
          sectorLabel: {
            color: "white",
            fontWeight: "bold",
            formatter: ({ value }) => `$${(value / 1000).toFixed(0)}K`,
          },
        },
      ],
    };
  }

  ngOnInit(): void {
    this.empService.getUsers().subscribe((res: any) => {
      this.userList.set(res);
      this.name = '';

      // Set chart data based on the fetched user list
      this.updateChartData();
    });
  }

  // Function to update the chart data
  updateChartData() {
    const data = this.userList().map(user => ({
      userName: user.userName,
      age: user.age
    }));

    this.chartOptions = {
      ...this.chartOptions,
      data // Assign the processed data
    };

    this.options = {
      ...this.options,
      data // Assign the same data for the pie chart
    };

    this.lineOptions = {
      ...this.lineOptions,
      data // Assign the same data for the pie chart
    };

    this.donutChartOptions = {
      ...this.donutChartOptions,
      data // Assign the processed data
    };
  }



  openModal() {
    const modalElement = document.getElementById('userTableModal') as HTMLElement;
    const modal = new bootstrap.Modal(modalElement);
    modal.show();
  }
}
