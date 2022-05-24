import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { QuestionService } from 'src/app/services/question.service';
import { QuizService } from 'src/app/services/quiz.service';

@Component({
  selector: 'app-update-question',
  templateUrl: './update-question.component.html',
  styleUrls: ['./update-question.component.css']
})
export class UpdateQuestionComponent implements OnInit {

  quesid:any
  question={
    quesId:-1,
    content:'',
    image:'',
    option1:'',
    option2:'',
    option3:'',
    option4:'',
    answer:'',
    quiz:{
      qId:-1
    }
  }
  qData:any
  quiz:any
  constructor(private route:ActivatedRoute,
    private questionService:QuestionService,
    private snack:MatSnackBar,
    private quizService:QuizService,
    private router:Router) { }

  ngOnInit(): void {
    this.quesid = this.route.snapshot.params.quesid
    console.log(this.quesid)
    this.questionService.get(this.quesid).subscribe(
      (data)=>{
        this.qData=data
        console.log(this.question)
        this.question.quesId = this.quesid
        this.question.content = this.qData.content
        this.question.option1 = this.qData.option1
        this.question.option2 = this.qData.option2
        this.question.option3 = this.qData.option3
        this.question.option4 = this.qData.option4
        this.question.answer = this.qData.answer
        this.question.image = 'default.png'
        this.question.quiz.qId = this.qData.quiz.qId
        
      },
      (error)=>{
        this.snack.open('Question could not be loaded!!','',{
          duration:2000,
          horizontalPosition:'right',
          verticalPosition:'top'
        })
      }
    )

    this.quizService.getAll().subscribe(
      (data)=>{
        this.quiz=data
        console.log(this.quiz)
      },
      (error)=>{
        this.snack.open('Quiz could not be loaded!!','',{
          duration:2000,
          horizontalPosition:'right',
          verticalPosition:'top'
        })
      }
    )
  }

  update()
  {
    console.log(this.question)
    this.questionService.update(this.question).subscribe(
      (data)=>{
        this.snack.open('Question updated successfully','',{
          duration:2000,
          horizontalPosition:'right',
          verticalPosition:'top'
        }).afterDismissed().subscribe(
          (data)=>{
            this.router.navigate(["admin-dashboard/viewQuizQuestions/"+this.question.quiz.qId+"/"+this.qData.quiz.title])
          }
        )
      },
      (error:any)=>{
        this.snack.open('Question could not be updated','',{
          duration:2000,
          horizontalPosition:'right',
          verticalPosition:'top'
        })
      }
    )
  }
}
