import { Pipe, PipeTransform } from '@angular/core';
import { AggregatedDataDTO } from '../models/aggregated-data-dto';

interface ProcessedChartData {
  updatedAt: string;
  displayDate: string; // ✅ Formatted date for UI
  timestamp: number;
  chartOptions: any;
}

@Pipe({
  name: 'groupedCharts'
})
export class GroupedChartsPipe implements PipeTransform {
  transform(
    aggregatedData: AggregatedDataDTO[],
    departmentMap: { [key: number]: string },
    searchQuery: string = '',
    sortOrder: 'asc' | 'desc' = 'desc',
    selectedDate: string = '' // Date filter
  ): ProcessedChartData[] {
    if (!aggregatedData || !departmentMap) return [];

    // Group data by updatedAt
    const groupedData: { [key: string]: AggregatedDataDTO[] } = {};
    aggregatedData.forEach(item => {
      const dateObj = new Date(item.updatedAt);
      const isoDate = dateObj.toISOString(); // Use ISO format for sorting/filtering
      if (!groupedData[isoDate]) {
        groupedData[isoDate] = [];
      }
      groupedData[isoDate].push(item);
    });

    let sortedData = Object.entries(groupedData).map(([updatedAt, data]) => ({
      updatedAt,
      displayDate: this.formatDate(updatedAt), // ✅ Show seconds
      timestamp: new Date(updatedAt).getTime(),
      chartOptions: this.createChartOptions(data, departmentMap)
    }));

    // Apply filtering by searchQuery
    if (searchQuery) {
      sortedData = sortedData.filter(chart =>
        chart.displayDate.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // ✅ Apply filtering by selectedDate
    if (selectedDate) {
      sortedData = sortedData.filter(chart =>
        new Date(chart.updatedAt).toISOString().split('T')[0] === selectedDate
      );
    }

    // ✅ Proper sorting using timestamps
    sortedData.sort((a, b) =>
      sortOrder === 'asc' ? a.timestamp - b.timestamp : b.timestamp - a.timestamp
    );

    return sortedData;
  }

  // ✅ Format date with seconds for UI display
  private formatDate(dateStr: string): string {
    const date = new Date(dateStr);
    return date.toLocaleString('en-GB', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit', // ✅ Added seconds
      hour12: true
    });
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
            name: departmentMap[item.deptId!] ?? `Dept ${item.deptId ?? 'Unknown'}`,
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
