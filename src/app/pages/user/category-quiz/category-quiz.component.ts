import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { QuizService } from 'src/app/services/quiz.service';

@Component({
  selector: 'app-category-quiz',
  templateUrl: './category-quiz.component.html',
  styleUrls: ['./category-quiz.component.css']
})
export class CategoryQuizComponent implements OnInit {

  cid:any
  quizzes:any
  constructor(private route:ActivatedRoute,
              private quizService:QuizService,
              private snack:MatSnackBar) { }

  ngOnInit(): void {
    this.cid=this.route.snapshot.params.id
    console.log(this.cid)
    this.quizService.getQuiz(this.cid).subscribe(
      (data)=>{
        console.log(data)
        this.quizzes=data
        if(this.quizzes.length ==0)
        {
          this.snack.open('Quizzes not available!!','',{
            duration:2000,
            verticalPosition:'top',
            horizontalPosition:'right'
          })
        }
      },
      (error)=>{
        this.snack.open('Could not load quizzes','',{
          duration:2000,
          verticalPosition:'top',
          horizontalPosition:'right'
        })
      }
    )
  }

}
