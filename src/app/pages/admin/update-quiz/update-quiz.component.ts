import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { QuizService } from 'src/app/services/quiz.service';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-update-quiz',
  templateUrl: './update-quiz.component.html',
  styleUrls: ['./update-quiz.component.css']
})
export class UpdateQuizComponent implements OnInit {

  categories: any
  quiz = {
    qId:0,
    title: '',
    description: '',
    maxMarks: '',
    noOfQuestions: '',
    active: false,
    category: {
      cId: 0
    }
  }
  constructor(private router:ActivatedRoute,
   private quizService:QuizService,private snack:MatSnackBar,
     private categoryService:CategoryService, private route:Router) { }

  ngOnInit(): void {
    this.quiz.qId = this.router.snapshot.params.qId;
    console.log(this.quiz.qId)
    this.categoryService.getAllCategories().subscribe(
      (data:any)=>{
        this.categories=data
      },
      (error:any)=>{
        this.snack.open('Categories could not be loaded','',{
          duration:2000,
          horizontalPosition:'right',
          verticalPosition:'top'
        })
      }
      )
  }

  formSubmit()
  {
    this.quizService.updateQuiz(this.quiz).subscribe(
      (data:any)=>{
        console.log(data)
        this.snack.open('Quiz updated successfully','OK',{
          duration:2000,
          horizontalPosition:'right',
          verticalPosition:'top'
        }).afterDismissed().subscribe((e)=>this.route.navigate(['/admin-dashboard/quizzes'])
        )
      },
      (error:any)=>{
        this.snack.open('Quiz could not be updated','',{
          duration:2000,
          verticalPosition:'top',
          horizontalPosition:'right'
        })
      }
    )
  }

}
