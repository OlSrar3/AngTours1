import { Injectable } from '@angular/core';
import { IUser, IUserRegister, UserStoragKey } from '../models/user';
import { API } from '../shared/api';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
//private userStorage: IUser[] = [];
private currentUser: IUser | null = null;

  constructor(private http: HttpClient) { }


 registerUser(user: IUserRegister):Observable<string> {
    return this.http.post(API.registration, user, {responseType:'text'});
  } 
 /* orderUser(order: any):Observable<string> {
    return this.http.post(API.order, order, {responseType:'text'});
  } */
  authUser(user:IUser):Observable<string> {
    return this.http.post<string>(API.auth, user);
  }
 getUser(): IUser {
    const userFromStorage = sessionStorage.getItem(UserStoragKey);
/*
  if (!this.currentUser) {
    this.userFromStorage()
   */ 
    return this.currentUser || JSON.parse(userFromStorage);
  
}

  setUser(user:IUser): void {
    this.currentUser = user;
    sessionStorage.setItem(UserStoragKey, JSON.stringify({login: user.login}));    
  }

/*userFromStorage(): void {
  const userStorage = sessionStorage.getItem('currentUser');
  if (userStorage) {
  this.currentUser = JSON.parse(userStorage);
    } 
  }*/
}