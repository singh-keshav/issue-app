import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class IssueService {
  private URL = 'http://localhost:7000/issue';
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };
  constructor(private http: HttpClient) {}
  getIssues(): Observable<Issue[]> {
    return this.http
      .get<Issue[]>(this.URL)
      .pipe(catchError(this.handleError<Issue[]>('getIssue', [])));
  }

  createIssue(data: Issue): Observable<Issue> {
    return this.http
      .post<Issue>(this.URL, data, this.httpOptions)
      .pipe(catchError(this.handleError<Issue>('createIssue')));
  }

  getIssue(id: any): Observable<Issue> {
    const IssueUrl = `${this.URL}/${id}`;
    return this.http
      .get<Issue>(IssueUrl)
      .pipe(catchError(this.handleError<Issue>('getHero id=${id}')));
  }

  upDateIssue(data: Issue): Observable<Issue[]> {
    const IssueUrl = `${this.URL}/${data.id}`;
    return this.http
      .put<Issue[]>(IssueUrl, data, this.httpOptions)
      .pipe(catchError(this.handleError<Issue[]>('createIssue')));
  }

  deleteIssue(id: any): Observable<Issue> {
    const IssueUrl = `${this.URL}/${id}`;
    return this.http
      .delete<Issue>(IssueUrl)
      .pipe(catchError(this.handleError<Issue>('getHero id=${id}')));
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
