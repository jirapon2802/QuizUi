import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { RegisterUserRequestModel, UserGroup } from 'src/models/Users';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl = 'http://localhost:5020';
  constructor(private http: HttpClient) {}

  getUserGroup(): Observable<UserGroup[]> {
    const url = `${this.baseUrl}/api/usergroup`;
    return this.http
      .get<UserGroup[]>(url)
      .pipe(
        catchError((error: any) => throwError(() => error || 'Server error'))
      );
  }

  registerUser(userRequestModel: RegisterUserRequestModel): Observable<any> {
    const url = `${this.baseUrl}/api/register`;
    return this.http
      .post<any>(url, userRequestModel)
      .pipe(
        catchError((error: any) => throwError(() => error || 'Server error'))
      );
  }

  getUserId(name: string): Observable<number> {
    const url = `${this.baseUrl}/api/userid/${name}`;
    return this.http
      .get<any>(url)
      .pipe(
        catchError((error: any) => throwError(() => error || 'Server error'))
      );
  }
}
