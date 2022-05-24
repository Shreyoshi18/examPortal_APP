import { CategoryService } from './../../../services/category.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-categories',
  templateUrl: './add-categories.component.html',
  styleUrls: ['./add-categories.component.css']
})
export class AddCategoriesComponent implements OnInit {

  category={
    title:'',
    description:''
  }
  constructor(private snack:MatSnackBar, private categoryService:CategoryService) { }

  ngOnInit(): void {
  }

  formSubmit()
  {
    if(this.category.title == null || this.category.title == '' || this.category.title == undefined)
    {
      this.snack.open('Title is required','OK')
      return;
    }
    if(this.category.description == null || this.category.description == '' || this.category.description == undefined)
    {
      this.snack.open('Description is required','OK')
      return;
    }
    this.categoryService.addCategory(this.category).subscribe(
      (data:any)=>{
        console.log(data)
        this.snack.open('Category successfully added','',{
          duration:2000,
          horizontalPosition:'right',
          verticalPosition:'top'
        });
        this.category.title=''
        this.category.description=''
      },
      (error:any)=>{
        this.snack.open('Category could not be added','',{
          duration:2000,
          horizontalPosition:'right',
          verticalPosition:'top'
        })
      }
    )
  }

}
