import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  baseUrl:string = 'http://localhost:8080/question'
  constructor(private http:HttpClient) { }

  //get a question by id
  public get(id:any)
  {
    return this.http.get(this.baseUrl+'/'+id)
  }

  //get all questions of a quiz
  public getQuestions(id:any)
  {
    return this.http.get(this.baseUrl+'/quiz/'+id)
  }

  //add a question to a quiz
  public addQuestion(question:any)
  {
    return this.http.post(this.baseUrl+'/add',question)
  }

  //delete a question
  public delete(id:any)
  {
    return this.http.delete(this.baseUrl+'/'+id)
  }

  //update a question
  public update(question:any)
  {
    return this.http.put(this.baseUrl+'/update',question)
  }
}
