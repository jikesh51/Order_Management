import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import 'rxjs/Rx';
import {environment} from '../../environments/environment';
import {
  HttpClient,
  HttpErrorResponse, HttpEvent,
  HttpHandler,
  HttpHeaders,
  HttpInterceptor,
  HttpRequest
} from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class CommonService implements HttpInterceptor{
  private baseUrl: string = environment.baseUrl;
  constructor(
    private http: HttpClient,
    private router: Router,
  ) { }

  getToken() {
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('user_token'),
      })
    }
  }

  /**Set intercept for token expired **/
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).do((event: HttpEvent<any>) => {
        if (event instanceof HttpErrorResponse) {
            // do stuff with response if you want
        }
    }, (err: any) => {
        const strUrl = err.url;
        if (strUrl) {
            const res = strUrl.split('/');
            const urlName = res[res.length - 1];
            const ExclodeArrayURL = ['login'];
            if (err.status === 401 && ExclodeArrayURL.lastIndexOf(urlName) === -1) {
                localStorage.clear();
                this.router.navigate(['/login']);
            }
        } else {
            localStorage.clear();
            this.router.navigate(['/login']);
        }
    });
  }

  private handleAuthError(err: HttpErrorResponse): Observable<any> {
    if (err.status === 401 || err.status === 403) {
        this.router.navigate(['login']);
    } else {
    }
    return Observable.throw(err.error.message);
  }

  login(data: any): Observable<any> {
    return this.http.post(this.baseUrl + 'login', data).catch(x => this.handleAuthError(x));
  }

  totalOrder(id: any): Observable<any>{
    return this.http.get(this.baseUrl + 'order-list/' + id , this.getToken()).catch(x => this.handleAuthError(x));
  }

  newOrder(data: any): Observable<any> {
    return this.http.post(this.baseUrl + 'new-order', data, this.getToken()).catch(x => this.handleAuthError(x));;
  }

  getSingleOrder(id: any): Observable<any>{
    return this.http.get(this.baseUrl + 'get-order/' + id , this.getToken()).catch(x => this.handleAuthError(x));
  }

  updateOrder(data: any): Observable<any> {
    return this.http.post(this.baseUrl + 'update-order', data, this.getToken()).catch(x => this.handleAuthError(x));;
  }

  deleteOrder(data: any): Observable<any> {
    return this.http.delete(this.baseUrl + 'delete-order/' + data).catch(x => this.handleAuthError(x));;
  }
}
