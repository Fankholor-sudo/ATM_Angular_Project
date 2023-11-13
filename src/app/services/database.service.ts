import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { LocalStorageService } from '../storage/local-storage.service';


@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  constructor(
    private http: HttpClient,
    private localStorageService: LocalStorageService,
  ) { }

  private clientUrl = 'http://localhost:3000/client';
  private accountUrl = 'http://localhost:3000/account';
  private transactionUrl = 'http://localhost:3000/transaction';

  private headers = new HttpHeaders({
    'Content-Type': 'application/json',
  });

  signIn(data: any): Observable<any> {
    return this.http.post<any>(`${this.clientUrl}/signin`, data, { headers: this.headers })
  }

  signUp(data: any): Observable<any> {
    return this.http.post<any>(`${this.clientUrl}`, data, { headers: this.headers })
  }

  getAccounts(): Observable<any> {
    var Client = this.localStorageService.getItem('client');
    return this.http.get<any>(`${this.accountUrl}/${Client.ClientID}`, { headers: this.headers });
  }

  withdraw(data: any): Observable<any> {
    var Client = this.localStorageService.getItem('client');
    var payload = {...data, ClientID: Client.ClientID}
    return this.http.post<any>(`${this.accountUrl}/withdraw`, payload, { headers: this.headers })
  }

  transfer(data: any): Observable<any> {
    var Client = this.localStorageService.getItem('client');
    var payload = {...data, ClientID: Client.ClientID}
    return this.http.post<any>(`${this.accountUrl}/transfer`, payload, { headers: this.headers })
  }

  payment(data: any): Observable<any> {
    var Client = this.localStorageService.getItem('client');
    var payload = {...data, ClientID: Client.ClientID}
    return this.http.post<any>(`${this.accountUrl}/payment`, payload, { headers: this.headers })
  }

  getTransactions(): Observable<any> {
    var Client = this.localStorageService.getItem('client');
    return this.http.get<any>(`${this.transactionUrl}/${Client.ClientID}`, { headers: this.headers });
  }
  
  ////___________________Shared data________________
  private accountsData: any;

  setAccountsData(data: any) { this.accountsData = data; }
  getAccountsData() { return this.accountsData; }
}