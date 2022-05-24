import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  baseUrl:string = 'http://localhost:8080/'
  constructor(private http:HttpClient) { }

  //get all categories
  public getAllCategories()
  {
    return this.http.get(this.baseUrl+'category/getAll')
  }

  //add category
  public addCategory(category:any)
  {
    return this.http.post(this.baseUrl+'category/add',category)
  }
}
