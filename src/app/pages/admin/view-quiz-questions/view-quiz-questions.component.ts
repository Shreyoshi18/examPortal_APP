import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { QuizService } from 'src/app/services/quiz.service';
import { QuestionService } from 'src/app/services/question.service';

@Component({
  selector: 'app-view-quiz-questions',
  templateUrl: './view-quiz-questions.component.html',
  styleUrls: ['./view-quiz-questions.component.css']
})
export class ViewQuizQuestionsComponent implements OnInit {

  question=[{
    quesId:0,
    content:'',
    image:'',
    option1:'',
    option2:'',
    option3:'',
    option4:'',
    answer:'',
    quiz:null
  }]
  constructor(private route:ActivatedRoute, private questionService:QuestionService,private snack:MatSnackBar) { }

  id:any
  title:any
  ngOnInit(): void {
    this.id = this.route.snapshot.params.id
    this.title = this.route.snapshot.params.title
    console.log(this.id)

    this.questionService.getQuestions(this.id).subscribe(
      (data:any)=>{
        this.question = data
        console.log(this.question)
        if(this.question.length==0)
        {
          this.snack.open('Questions not available for this quiz.','',{
            duration:2000,
            verticalPosition:'top',
            horizontalPosition:'right'
          })
        }
        
      },
      (error:any)=>{
        this.snack.open('Couls not load questions.','',{
          duration:2000,
          horizontalPosition:'right',
          verticalPosition:'top'
        })
      })
  }

  delete(quesid:any)
  {
    console.log(quesid)
    sweetAlert({
      icon:'info',
      title:'Are you sure about deleting it?',
      buttons:["Nope", "Yes"],
      dangerMode:true
    }).then((result) => {
      if (result) {

        this.questionService.delete(quesid).subscribe(
          (data:any)=>{
            this.snack.open('Question deleted successfully.','',{
              duration:2000,
              horizontalPosition:'right',
              verticalPosition:'top'
            })
            this.question=this.question.filter((q:any)=>q.quesId!=quesid)
          },
          (error:any)=>{
            this.snack.open('Question could not be deleted.','',{
              duration:2000,
              horizontalPosition:'right',
              verticalPosition:'top'
            })
          }
        )
      }
       else {
        this.snack.open('Question  not deleted','',{
          duration:2000,
          horizontalPosition:'right',
          verticalPosition:'top'
        })
      }
    });
  }
}
