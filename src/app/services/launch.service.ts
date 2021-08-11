import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

/* TODO:
  - add better typing
*/

@Injectable({
  providedIn: 'root'
})
export class LaunchService {
  private readonly url = 'https://api.spacexdata.com/v4/launches';

  constructor(private http: HttpClient) { }

  getLaunches(): Observable<any> {
    return this.http.get<any>(this.url);
  }
}
