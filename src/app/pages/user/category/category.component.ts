import { MatSnackBar } from '@angular/material/snack-bar';
import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  categories:any
  constructor(private categoryService:CategoryService,
              private snack:MatSnackBar,
              private router:Router) { }

  ngOnInit(): void {
    this.categoryService.getAllCategories().subscribe(
      (data)=>{
        this.categories=data
        console.log(this.categories)
      },
    (error)=>{
      this.snack.open('Categories could not be loaded!!','',{
        duration:2000,
        horizontalPosition:'right',
        verticalPosition:'top'
      })
    }
    )
  }

  toQuiz(cid:any)
  {
    console.log(cid)
    this.router.navigate(['/user-dashboard/quiz/'+cid])
  }

}
