import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EndpointsService {
  private apiUrl = 'http://localhost:3000'; // Replace with your backend URL

  constructor(private http: HttpClient) {}

  // Make a GET request to the backend
  getHello(): Observable<string> {
    return this.http.get<string>(this.apiUrl + '/hello');
  }

  // Make a POST request to the backend
  greetWithName(postalCode: string, prompt: string): Observable<any> {
    return this.http.post(this.apiUrl + '/getLetter', { postalCode, prompt });
  }
}
