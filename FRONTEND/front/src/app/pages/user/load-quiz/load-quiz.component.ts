import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { QuizzesService } from 'src/app/services/quizzes.service';

@Component({
  selector: 'app-load-quiz',
  templateUrl: './load-quiz.component.html',
  styleUrls: ['./load-quiz.component.css']
})
export class LoadQuizComponent implements OnInit {
categoryIdreceived;
quizzes:any=[];
  constructor(private _route:ActivatedRoute,private _quizservice:QuizzesService) { }

  ngOnInit(): void {

// this.categoryIdreceived=this._route.snapshot.params['catId']
this._route.params.subscribe((params)=>{
  console.log(params)
  this.categoryIdreceived=params['catId'];
  if(this.categoryIdreceived==0)
{
 console.log('load all the quiz');
this._quizservice.getAllActiveQuizzes().subscribe(
(data)=>{
  this.quizzes=data;
  console.log(this.quizzes);
},
(error)=>{
  console.log(error);
}
)
}
else{
  console.log('load specific quiz');
this._quizservice.getActiveQuizzesOfCategory(this.categoryIdreceived).subscribe(
(data:any)=>{
  this.quizzes=data;
  console.log(this.quizzes);
},
(error)=>{
  console.log(error);
})}

}
)
  }
}







