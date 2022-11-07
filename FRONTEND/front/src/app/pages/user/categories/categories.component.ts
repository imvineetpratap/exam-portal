import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {
categorieshere;
  constructor(private _categories:CategoryService,private snack:MatSnackBar) { }

  ngOnInit(): void {
    this._categories.categories().subscribe(
      (data)=>{
        this.categorieshere=data;
        console.log(data);
      },
      (error)=>{
        this.snack.open('error in loading categories','', { duration: 3000, });
      }
    )
  }

}
