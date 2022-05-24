import { MatSnackBar } from '@angular/material/snack-bar';
import { CategoryService } from './../../../services/category.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-view-categories',
  templateUrl: './view-categories.component.html',
  styleUrls: ['./view-categories.component.css']
})
export class ViewCategoriesComponent implements OnInit {

  categories:any
  constructor(private categoryService:CategoryService, private snack:MatSnackBar) { }

  ngOnInit(): void {
    this.categoryService.getAllCategories().subscribe(
      (data:any)=>{this.categories = data
        console.log(data)
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

}
