import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  baseUrl:string = 'http://localhost:8080/'
  constructor(private http:HttpClient) { }

  //current user: who is logged in
  public getCurrentUser()
  {
    console.log('get current user fired')
    return this.http.get(this.baseUrl+'current-user')
  }

  public generateToken(loginDetails:any)
  {
    return this.http.post(this.baseUrl+'generate-token',loginDetails)
  }

  // sets the token in LocalStorage
  public setToken(token:any)
  {
    localStorage.setItem('token',token)
    return true
  }

  //checks if user is logged in
  public isLoggedIn()
  {
    let tokenStr = localStorage.getItem('token')
    if(tokenStr == null || tokenStr == '' || tokenStr == undefined)
    return false
    else
    return true
  }

  //logout and remove token from localStrorage
  public logout()
  {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    return true;
  }

  //get token from localStorage
  public getToken()
  {
    return localStorage.getItem('token')
  }

  //set user detail
  public setUser(user:any)
  {
    localStorage.setItem('user',JSON.stringify(user))
    return true;
  }

  //get User
  public getUser()
  {
    let userStr = localStorage.getItem('user')
    if(userStr==null || userStr == '' || userStr == undefined)
    {this.logout();
      return null;}
      else{
        return JSON.parse(userStr)
      }
  }

  //get User Role
  public getUserRole()
  {
    let user = this.getUser()
    return user.authorities[0].authority;
  }
}
