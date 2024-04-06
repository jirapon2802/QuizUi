import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { QuizViewModel, SummaryViewModel } from 'src/models/Quiz';

@Injectable({
  providedIn: 'root',
})
export class QuizService {
  private baseUrl = 'http://localhost:5020';
  constructor(private http: HttpClient) {}

  getQuizList(userGroupId: number): Observable<QuizViewModel[]> {
    const url = `${this.baseUrl}/api/quiz/${userGroupId}`;
    return this.http
      .get<QuizViewModel[]>(url)
      .pipe(
        catchError((error: any) => throwError(() => error || 'Server error'))
      );
  }

  loadUserQuiz(userId: number): Observable<QuizViewModel[]> {
    const url = `${this.baseUrl}/api/load/${userId}`;
    return this.http
      .get<QuizViewModel[]>(url)
      .pipe(
        catchError((error: any) => throwError(() => error || 'Server error'))
      );
  }

  saveUserQuiz(userId: number, quizList: QuizViewModel[]): Observable<boolean> {
    const url = `${this.baseUrl}/api/save/${userId}`;
    return this.http
      .post<boolean>(url, quizList)
      .pipe(
        catchError((error: any) => throwError(() => error || 'Server error'))
      );
  }

  submitUserQuiz(userId: number, quizList: QuizViewModel[]): Observable<boolean> {
    const url = `${this.baseUrl}/api/submit/${userId}`;
    return this.http
      .post<boolean>(url, quizList)
      .pipe(
        catchError((error: any) => throwError(() => error || 'Server error'))
      );
  }

  getUserQuizSummary(userId: number): Observable<SummaryViewModel> {
    const url = `${this.baseUrl}/api/summary/${userId}`;
    return this.http
      .get<SummaryViewModel>(url)
      .pipe(
        catchError((error: any) => throwError(() => error || 'Server error'))
      );
  }
}
