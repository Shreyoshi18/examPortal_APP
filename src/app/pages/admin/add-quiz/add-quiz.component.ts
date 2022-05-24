import { MatSnackBar } from '@angular/material/snack-bar';
import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';
import { QuizService } from 'src/app/services/quiz.service';

@Component({
  selector: 'app-add-quiz',
  templateUrl: './add-quiz.component.html',
  styleUrls: ['./add-quiz.component.css']
})
export class AddQuizComponent implements OnInit {
  categories: any
  quiz = {
    title: '',
    description: '',
    maxMarks: '',
    noOfQuestions: '',
    active: false,
    category: {
      cId: 0
    }
  }
  constructor(private categoryService: CategoryService, private quizService: QuizService, private snack: MatSnackBar) { }

  ngOnInit(): void {
    this.categoryService.getAllCategories().subscribe(
      (data: any) => {
        console.log(data)
        this.categories = data
      },
      (error: any) => {
        this.snack.open('Could not load categories', '', {
          duration: 200,
          horizontalPosition: 'right',
          verticalPosition: 'top'
        })
      }
    )
  }

  formSubmit() {
    console.log(this.quiz)
    if(this.quiz.title == '' || this.quiz.title == null || this.quiz.title==undefined)
    {
      this.snack.open('Title is required','OK')
      return
    }
    if(this.quiz.description == ''|| this.quiz.description == null || this.quiz.description == undefined)
    {
      this.snack.open('Descriptio is required','OK')
      return
    }
    if(this.quiz.noOfQuestions == '' || this.quiz.noOfQuestions == null || this.quiz.noOfQuestions == undefined)
    {
      this.snack.open('Number of Questions is required','OK')
      return
    }
    if(this.quiz.maxMarks == '' || this.quiz.maxMarks == null || this.quiz.maxMarks == undefined)
    {
      this.snack.open('Max marks is required','OK')
      return
    }
    if(this.quiz.category.cId <=0 ||this.quiz.category.cId == null || this.quiz.category.cId == undefined)
    {
      this.snack.open('Select category','OK')
      return
    }
    this.quizService.addQuiz(this.quiz).subscribe(
      (data) => {
        console.log(data)
        this.snack.open('Quiz Added Successfully', '', {
          duration: 2000,
          horizontalPosition: 'right',
          verticalPosition: 'top'
        })
      },
      (error) => {
        this.snack.open('Quiz could not be added.', '', {
          duration: 2000,
          horizontalPosition: 'right',
          verticalPosition: 'top'})
      })
  }

}

