import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { QuestionService } from 'src/app/services/question.service';

@Component({
  selector: 'app-add-question',
  templateUrl: './add-question.component.html',
  styleUrls: ['./add-question.component.css']
})
export class AddQuestionComponent implements OnInit {

  qid:any
  qTitle:any
  question={
    content:'',
    image:'',
    option1:'',
    option2:'',
    option3:'',
    option4:'',
    answer:'',
    quiz:{
      qId:0
    }
  }
  constructor(private route:ActivatedRoute, 
    private questionService:QuestionService, 
    private router:Router, 
    private snack:MatSnackBar) { }

  ngOnInit(): void {
    this.qid = this.route.snapshot.params.id
    console.log(this.qid)
    this.qTitle = this.route.snapshot.params.title
    this.question.quiz.qId = this.qid
  }

  formSubmit()
  {
    if(this.question.content == null||this.question.content==''|| this.question.content == undefined)
    {
      return;
    }
    if(this.question.option1 == null||this.question.option1 ==''|| this.question.option1 == undefined)
    {
      return;
    }
    if(this.question.option2 == null||this.question.option2 ==''|| this.question.option2 == undefined)
    {
      return;
    }
    if(this.question.option3 == null||this.question.option3 ==''|| this.question.option3 == undefined)
    {
      return;
    }
    if(this.question.option4 == null||this.question.option4 ==''|| this.question.option4 == undefined)
    {
      return;
    }
    if(this.question.answer == null||this.question.answer ==''|| this.question.answer == undefined)
    {
      return;
    }
    this.question.image='default.png'
    this.questionService.addQuestion(this.question).subscribe(
      (data)=>{
        console.log(data)
        this.snack.open('Question added successfully to the quiz','',{
          duration:2000,
          horizontalPosition:'right',
          verticalPosition:'top'
        }).afterDismissed().subscribe((yes)=>{ this.question.content='',
        this.question.option1='',
        this.question.option2='',
        this.question.option3='',
        this.question.option4='',
        this.question.answer='',
        this.router.navigate(['/admin-dashboard/viewQuizQuestions/'+this.qid+'/'+this.qTitle])})
      },
      (error)=>{
        this.snack.open('Question could not ne added to the quiz','',{
          duration:2000,
          horizontalPosition:'right',
          verticalPosition:'top'
        })
      }
    )    
  }
}
