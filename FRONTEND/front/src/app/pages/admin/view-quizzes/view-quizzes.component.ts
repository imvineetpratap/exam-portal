import  Swal  from 'sweetalert2';
import { QuizzesService } from './../../../services/quizzes.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-view-quizzes',
  templateUrl: './view-quizzes.component.html',
  styleUrls: ['./view-quizzes.component.css'],
})
export class ViewQuizzesComponent implements OnInit {
  quizzes = [
    {
      qid: 23,
      title: 'JAVA BASICS',
      description: 'this quiz contains questions of java and oops',
      maxMarks: '150',
      numberOfQuestion: '20',
      category:{
        title:'cat title',
        description:'',
      }
    },
    {
      qid: 23,
      title: 'JAVA',
      description: 'this quiz contains questions of java and oops',
      maxMarks: '150',
      numberOfQuestion: '20',
      category:{
        title:'cat title',
        description:'',
      }
    },
  ];
  constructor(private _quiz:QuizzesService) {}

  ngOnInit() {
    this._quiz.quizzes().subscribe(
(data:any)=>{
  this.quizzes=data;
  console.log(data);
},

(error)=>{
  console.log(error);
  Swal.fire('Error!!',"Error in loading data",'error');

},
    )
  }
}
