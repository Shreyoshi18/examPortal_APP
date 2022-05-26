import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { QuestionService } from 'src/app/services/question.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-quiz-start',
  templateUrl: './quiz-start.component.html',
  styleUrls: ['./quiz-start.component.css']
})
export class QuizStartComponent implements OnInit {
  qid: any
  questions: any;

  marksScored = 0
  attempted = 0
  correct = 0
  incorrect = 0

  submitted = false
  timer:any
  mm=0
  ss=0

  constructor(private route: ActivatedRoute,
    private questionService: QuestionService,
    private snack: MatSnackBar) { }

  ngOnInit(): void {
    this.qid = this.route.snapshot.params.qid
    console.log(this.qid)
    this.questionService.getTestQuestions(this.qid).subscribe(
      (data) => {
        this.questions = data
        this.questions.forEach((q: any) => {
          q['givenAns'] = ''
        })
        this.timer = this.questions.length * 60
        this.startTimer()
        console.log(this.questions)
        
      },
      (error) => {
        this.snack.open('OOPS!! Unable to load quiz.Something wet wrong!!!', '', {
          duration: 2000,
          verticalPosition: 'top',
          horizontalPosition: 'right'
        })
      }
    )
  }

  startTimer()
  {
    let t = window.setInterval(()=>{
      if(this.timer<=0)
      {
        this.evaluate()
        clearInterval(t)
      }
      else{
        this.timer--
      }
    },1000)
  }

  submitQuiz() {
    Swal.fire({
      title: 'Are you sure?',
      text: "Do you want to submit this quiz??",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Done!!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.evaluate()
      }
    })
  }

  evaluate() {
    console.log('Submitted')
    console.log(this.questions)
    this.questions.forEach((q: any) => {
      if (q.givenAns == q.answer) {
        this.correct++
      }
      if (q.givenAns != '') {
        this.attempted++
      }
    })
    this.incorrect = this.attempted - this.correct
    this.marksScored = this.questions[0].quiz.maxMarks / this.questions[0].quiz.noOfQuestions * this.correct - this.incorrect
    this.submitted = true
  }

  setTime()
  {
    this.mm = Math.floor(this.timer/60)
    this.ss = this.timer - this.mm*60
    return this.mm + ' : ' + this.ss
  }
}
