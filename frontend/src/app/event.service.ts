import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Party } from './party.model';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  constructor(private httpClient: HttpClient) { }

  getEvents(): Observable<Party[]> {
    return this.httpClient.get<Party[]>(`${environment.apiBase}/events`);
  }

}
