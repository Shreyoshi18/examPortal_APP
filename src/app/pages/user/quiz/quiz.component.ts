import { MatSnackBar } from '@angular/material/snack-bar';
import { Component, OnInit } from '@angular/core';
import { QuizService } from 'src/app/services/quiz.service';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent implements OnInit {

  quizzes:any
  constructor(private quizService:QuizService,
              private snack:MatSnackBar) { }

  ngOnInit(): void {
    this.quizService.getAll().subscribe(
      (data)=>{
        this.quizzes=data
        if(this.quizzes.length == 0)
        {
          this.snack.open('Quizzes not available','',{
            duration:2000,
            verticalPosition:'top',
            horizontalPosition:'right'
          })
        }
      },
      (error)=>{
        this.snack.open('Quizzes not available','',{
          duration:2000,
          verticalPosition:'top',
          horizontalPosition:'right'
        })
      }
    )
  }

}
