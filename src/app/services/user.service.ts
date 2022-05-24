import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../entities/User';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  baseUrl:string = 'http://localhost:8080/user'
  constructor(private http:HttpClient) { }

  public createUser(user:User)
  {
    return this.http.post(this.baseUrl+'/createUser',user)
  }
}
