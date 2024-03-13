import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OpenaiService {
  private backendURL = 'http://localhost:3000';
  /* private backendURL = 'http://localhost:8000' */

  constructor(private http: HttpClient) {}

  enviarConversacion(messages: any[]): Promise<any> {
    return this.http.post<any>(`${this.backendURL}/api/conversation`, { messages }).toPromise();
  }
  /* constructor(private http: HttpClient) { }

  enviarConversacion(messages: any[]): Promise<any> {
    return this.http.post<any>(`${this.backendURL}/api/conversation/`, { messages }).toPromise();
  } */
}
