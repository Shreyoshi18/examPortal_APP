import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class QuizService {

  baseUrl:string = 'http://localhost:8080/quiz'
  constructor(private http:HttpClient) { }

  //get All Quizzes
  public getAll()
  {
    return this.http.get(this.baseUrl+'/getAll')
  }

  //add quiz
  public addQuiz(quiz:any)
  {
    return this.http.post(this.baseUrl+'/add',quiz)
  }

  //delete quiz
  public deleteQuiz(id:any)
  {
    return this.http.delete(this.baseUrl+'/'+id)
  }

  //update
  public updateQuiz(quiz:any)
  {
    return this.http.put(this.baseUrl+'/update',quiz)
  }

  
}
