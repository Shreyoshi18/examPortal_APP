import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-pre-start',
  templateUrl: './pre-start.component.html',
  styleUrls: ['./pre-start.component.css']
})
export class PreStartComponent implements OnInit {

  qid:any
  quiz:any
  constructor(private route:ActivatedRoute,
              private quizService:QuizService,
              private snack:MatSnackBar,
              private router:Router) { }

  ngOnInit(): void {
    this.qid=this.route.snapshot.params.qid
    
    this.quizService.getById(this.qid).subscribe(
      (data)=>{
        this.quiz=data
        console.log(this.quiz)
      },
      (error)=>{
        this.snack.open('OOPs!! Something went wrong!!','',{
          duration:2000,
          verticalPosition:'top',
          horizontalPosition:'right'
        })
      }
    )
  }

  startQuiz(id:any)
  {

    //using confirmation box
    Swal.fire({
      title: 'Are you ready?',
      text: "Do you want to take this quiz??",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Bring it on!!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.router.navigate(['/quiz-start/'+this.qid])
      }
    })

  }

}
