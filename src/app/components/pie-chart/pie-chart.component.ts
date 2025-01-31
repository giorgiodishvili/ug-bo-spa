import { Component, OnInit } from '@angular/core';
import { forkJoin } from 'rxjs';
import { AggregatedDataService } from '../../services/aggregated-data.service';
import { DepartmentService } from '../../services/department.service';
import { AggregatedDataDTO } from '../../models/aggregated-data-dto';
import { NgxEchartsModule } from 'ngx-echarts';
import { CommonModule } from '@angular/common';
import { GroupedChartsPipe } from '../../pipes/grouped-charts.pipe';

@Component({
  selector: 'app-pie-chart',
  standalone: true,
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.css'],
  imports: [
    CommonModule,
    NgxEchartsModule,
    GroupedChartsPipe
  ]
})
export class PieChartComponent implements OnInit {
  aggregatedData: AggregatedDataDTO[] = [];
  departmentMap: { [key: number]: string } = {};
  expandedCharts: { [key: string]: boolean } = {}; // Track which charts are expanded

  constructor(
    private aggregatedDataService: AggregatedDataService,
    private departmentService: DepartmentService
  ) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    forkJoin({
      aggregatedData: this.aggregatedDataService.getAllAggregatedData(),
      departments: this.departmentService.getAllDepartments()
    }).subscribe(({ aggregatedData, departments }) => {
      this.departmentMap = {};

      // ✅ Ensure `id` is defined before using it as an index
      departments.forEach(dept => {
        if (dept.id !== undefined) {
          this.departmentMap[dept.id] = dept.name;
        }
      });

      this.aggregatedData = aggregatedData;
    });
  }

  toggleChart(updatedAt: string): void {
    this.expandedCharts[updatedAt] = !this.expandedCharts[updatedAt];
  }
}
