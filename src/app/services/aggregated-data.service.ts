import {Inject, Injectable} from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {BASE_URL} from '../tokens/base-url.token';
import {AggregatedDataDTO} from '../models/aggregated-data-dto';

@Injectable({
  providedIn: 'root'
})
export class AggregatedDataService {

  private apiUrl = 'analytic/api/bo/aggregated-data'; // Base URL for departments

  constructor(
    private http: HttpClient,
    @Inject(BASE_URL) private baseUrl: string
  ) {
    console.log('Base URL:', `${this.baseUrl}${this.apiUrl}`);

  }
  getAllAggregatedData(): Observable<AggregatedDataDTO[]> {
    return this.http.get<AggregatedDataDTO[]>(`${this.baseUrl}/${this.apiUrl}`);
  }

  getAggregatedDataByDeptId(deptId: number): Observable<AggregatedDataDTO[]> {
    return this.http.get<AggregatedDataDTO[]>(`\`${this.baseUrl}/${this.apiUrl}/dept/${deptId}`);
  }
}
