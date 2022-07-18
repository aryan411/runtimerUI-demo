import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { User } from '../models/User';
import { Observable } from 'rxjs';
import { Survey } from '../models/survey.model';

@Injectable({
  providedIn: 'root'
})

export class DataService {

  user: User | null;
  baseUrl: string;
  authToken!: string;
  localBaseUrl: string;

  private httpOptions =
  {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
    })
  };
  prodUrl: string;



  constructor(private http: HttpClient,
              private jwtService: JwtHelperService)
  {
    this.user = new User();
    // * Development
    // this.baseUrl = `${PROTOCOL}://${location.hostname}:${PORT}/api/`;

    // * Deployment
    this.localBaseUrl = "http://localhost:3500/api/";
    this.prodUrl ="https://survayexpert.herokuapp.com/api/";
    this.baseUrl = this.prodUrl;
    
    
  }

  getSurveys(): Observable<IResponse>
  {
    return this.http.get<IResponse>(this.baseUrl + 'survey');
  }

  getSurvey(id: string): Observable<IResponse>
  {
    return this.http.get<IResponse>(this.baseUrl + `survey/${id}`);
  }

  addSurvey(survey: Survey): Observable<IResponse>
  {
    this.loadToken();
    return this.http.post<IResponse>(this.baseUrl + 'survey/add', survey, this.httpOptions);
  }

  deleteSurvey(data: any): Observable<IResponse>
  {
    this.loadToken();
    return this.http.post<IResponse>(this.baseUrl + `survey/delete`, data, this.httpOptions);
  }

  updateSurvey(data: any): Observable<IResponse>
  {
    this.loadToken();
    return this.http.post<IResponse>(this.baseUrl + `survey/update/${data.survey._id}`, data, this.httpOptions);
  }

  takeSurvey(survey: Survey): Observable<IResponse>
  {
    return this.http.post<IResponse>(this.baseUrl + `survey/take/${survey._id}`, survey);
  }

  // Authentication Section

  authenticate(user: User): Observable<any>
  {
    return this.http.post<any>(this.baseUrl + 'user/login', user, this.httpOptions);
  }

  storeUserData(token: any, user: User): void
  {
    // * 'bearer ' not needed for deploy on heroku
    // localStorage.setItem('id_token', 'Bearer ' + token);
    localStorage.setItem('id_token', token);
    localStorage.setItem('user', JSON.stringify(user));
    this.authToken = token;
    this.user = user;
  }

  logout(): Observable<any>
  {
    this.authToken = "";
    this.user = null;
    localStorage.clear();

    return this.http.get<any>(this.baseUrl + 'user/logout', this.httpOptions);
  }

  loggedIn(): boolean
  {
    return !this.jwtService.isTokenExpired(this.authToken);
  }

  registerUser(user: User): Observable<any> {
    return this.http.post<any>( this.baseUrl + 'user/register', user, this.httpOptions);
  }

  updateUser(user: User): Observable<any> {
    this.loadToken();
    return this.http.post<any>( this.baseUrl + 'user/update', user, this.httpOptions);
  }

  // updates the headers with the bearer token
  private loadToken(): void
  {
    const token = localStorage.getItem('id_token');
    this.authToken = token as string;
    this.httpOptions.headers = this.httpOptions.headers.set('Authorization', this.authToken);
  }
}
export interface IResponse {
  error: string | undefined | null;
  data: any;
}
