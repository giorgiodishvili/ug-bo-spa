import { Component } from '@angular/core';
import {PieChartComponent} from '../pie-chart/pie-chart.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  imports: [
    PieChartComponent
  ],
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

}
