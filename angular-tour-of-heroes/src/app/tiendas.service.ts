import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TiendasService {

  private apiUrl = 'https://www.cheapshark.com/api/1.0/stores';

  constructor(private http: HttpClient) { }

  getStores(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

}
