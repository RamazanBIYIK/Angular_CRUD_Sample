import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {UserModel} from "./model/user/user.model";
import {Observable} from "rxjs/index";
import {ApiResponse} from "./model/api.response";

@Injectable()
export class ApiService {

  constructor(private http: HttpClient) { }
  baseUrl: string = 'BASEURL BURAYA';

  login(loginPayload) : Observable<ApiResponse> {
    return this.http.post<ApiResponse>('WEBAPI BU ALANA/token', loginPayload);
  }

  getUsers() : Observable<ApiResponse> {
    return this.http.get<ApiResponse>(this.baseUrl);
  }

  getLast10Users() : Observable<ApiResponse> {
    return this.http.get<ApiResponse>(this.baseUrl+"api/User/getall/last10user");
  }
  
  getUserById(id: number): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(this.baseUrl + id);
  }

  createUser(user: UserModel): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(this.baseUrl, user);
  }

  updateUser(user: UserModel): Observable<ApiResponse> {
    return this.http.put<ApiResponse>(this.baseUrl + user.id, user);
  }

  deleteUser(id: number): Observable<ApiResponse> {
    return this.http.delete<ApiResponse>(this.baseUrl + id);
  }
}