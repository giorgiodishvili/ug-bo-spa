import { Pipe, PipeTransform } from '@angular/core';
import {AggregatedDataDTO} from '../models/aggregated-data-dto';

interface ProcessedChartData {
  updatedAt: string;
  chartOptions: any;
}

@Pipe({
  name: 'groupedCharts'
})
export class GroupedChartsPipe implements PipeTransform {
  transform(aggregatedData: AggregatedDataDTO[], departmentMap: { [key: number]: string }): ProcessedChartData[] {
    if (!aggregatedData || !departmentMap) return [];

    // Group data by updatedAt
    const groupedData: { [key: string]: AggregatedDataDTO[] } = {};
    aggregatedData.forEach(item => {
      const dateKey = new Date(item.updatedAt).toLocaleString(); // Format timestamp
      if (!groupedData[dateKey]) {
        groupedData[dateKey] = [];
      }
      groupedData[dateKey].push(item);
    });

    // Prepare chart data for each `updatedAt`
    return Object.entries(groupedData).map(([updatedAt, data]) => ({
      updatedAt,
      chartOptions: this.createChartOptions(data, departmentMap)
    }));
  }

  private createChartOptions(data: AggregatedDataDTO[], departmentMap: { [key: number]: string }): any {
    return {
      title: {
        text: 'Aggregated Salary by Department',
        left: 'center'
      },
      tooltip: {
        trigger: 'item'
      },
      legend: {
        orient: 'vertical',
        left: 'left'
      },
      series: [
        {
          name: 'Total Salary',
          type: 'pie',
          radius: '50%',
          data: data.map(item => ({
            name: departmentMap[item.deptId] || `Dept ${item.deptId}`,
            value: item.totalSalary
          })),
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }
      ]
    };
  }
}
