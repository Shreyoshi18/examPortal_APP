import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Component, OnInit } from '@angular/core';
import { QuizService } from 'src/app/services/quiz.service';
import swal from 'sweetalert';


@Component({
  selector: 'app-view-quizzes',
  templateUrl: './view-quizzes.component.html',
  styleUrls: ['./view-quizzes.component.css']
})
export class ViewQuizzesComponent implements OnInit {

  quizzes:any
  constructor(private quizService:QuizService, private snack:MatSnackBar, private route:Router) { }

  ngOnInit(): void {
    console.log('welcome to view all quizzes')
    this.quizService.getAll().subscribe(
      (data:any)=>{
        console.log(data)
        this.quizzes=data
      }
    ),
    (error:any)=>{
      this.snack.open('Unable to load quizzes','',{
        duration:2000,
        horizontalPosition:'right',
        verticalPosition:'top'
      })
    }
  }

  delete(id:any)
  {
    swal({
      icon:'info',
      title:'Are you sure about deleting it?',
      buttons:["Nope", "Yes"],
      dangerMode:true
    }).then((result) => {
      if (result) {

        this.quizService.deleteQuiz(id).subscribe(
          (data:any)=>{
            this.snack.open('Quiz deleted successfully.','',{
              duration:2000,
              horizontalPosition:'right',
              verticalPosition:'top'
            })
            this.quizzes=this.quizzes.filter((quiz:any)=>quiz.qId!=id)
          },
          (error:any)=>{
            this.snack.open('Quiz could not be deleted.','',{
              duration:2000,
              horizontalPosition:'right',
              verticalPosition:'top'
            })
          }
        )
      }
       else {
        this.snack.open('Quiz not deleted','',{
          duration:2000,
          horizontalPosition:'right',
          verticalPosition:'top'
        })
      }
    });

  }

  update(id:any)
  {
    this.route.navigate(['admin-dashboard/quizzes/update'])
  }

}
