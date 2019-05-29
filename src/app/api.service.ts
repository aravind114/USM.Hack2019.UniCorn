import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';
import { HttpRequest, HttpResponse, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Product } from './product';
import { Event } from './event';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
const apiUrl = "http://localhost:3000/api/v1/products";

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  //mock event data
  usmevents: Array<Event> = [
    { _id: '1', category: 'Insurance', event_type: 'New Application or Increase in Existing Insurance', alert_type: 'Real Time', correspondance: 'Email & SMS' },
    { _id: '2', category: 'Investment Switch - Super', event_type: 'Application Acknowledgement', alert_type: 'Real Time', correspondance: 'Email & SMS' },
    { _id: '3', category: 'Binding Nomination Renewal - Pension', event_type: 'Renewal - Notification', alert_type: 'Time-Based', correspondance: 'SMS' }
  ];

  constructor(private http: HttpClient) { }

  getEvents(): Observable<Event[]> {
    return of(this.usmevents);
  }

  addEvent(event): Observable<Event> {
    return of(event);
  }

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(apiUrl)
      .pipe(
        tap(products => console.log('Fetch products')),
        catchError(this.handleError('getProducts', []))
      );
  }

  getProduct(id: number): Observable<Product> {
    const url = `${apiUrl}/${id}`;
    return this.http.get<Product>(url).pipe(
      tap(_ => console.log(`fetched product id=${id}`)),
      catchError(this.handleError<Product>(`getProduct id=${id}`))
    );
  }

  addProduct(product): Observable<Product> {
    return this.http.post<Product>(apiUrl, product, httpOptions).pipe(
      tap((product: Product) => console.log(`added product w/ id=${product._id}`)),
      catchError(this.handleError<Product>('addProduct'))
    );
  }

  updateProduct(id, product): Observable<any> {
    const url = `${apiUrl}/${id}`;
    return this.http.put(url, product, httpOptions).pipe(
      tap(_ => console.log(`updated product id=${id}`)),
      catchError(this.handleError<any>('updateProduct'))
    );
  }

  deleteProduct(id): Observable<Product> {
    const url = `${apiUrl}/${id}`;

    return this.http.delete<Product>(url, httpOptions).pipe(
      tap(_ => console.log(`deleted product id=${id}`)),
      catchError(this.handleError<Product>('deleteProduct'))
    );
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


