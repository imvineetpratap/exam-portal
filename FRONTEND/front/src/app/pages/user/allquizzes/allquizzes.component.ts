import Swal from 'sweetalert2';
import { QuestionService } from './../../../services/question.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { LocationStrategy } from '@angular/common';

@Component({
  selector: 'app-allquizzes',
  templateUrl: './allquizzes.component.html',
  styleUrls: ['./allquizzes.component.css'],
})
export class AllquizzesComponent implements OnInit {
  qidhere;
  questions;
  marksGot=0;
  correctAnswers=0;
  attempted=0;
  constructor(
    private _router: ActivatedRoute,
    private locationSt: LocationStrategy,
    private _question: QuestionService
  ) {}

  ngOnInit(): void {
    this.preventBackButton();
    this.qidhere = this._router.snapshot.params['qid'];
    //  console.log(this.qidhere);
    this.loadQuestions();
  }
  loadQuestions() {
    this._question.getQuestionsofQuizForTest(this.qidhere).subscribe(
      (data) => {
         console.log(data);
        this.questions = data;
        this.questions.forEach(q => {
          q['givenAnswer']='';
        });
      },
      (error) => {
        console.log(error);
        Swal.fire('Error', 'error in loading quiz', 'error');
      }
    );
  }
  preventBackButton() {
    history.pushState(null, null, location.href);
    this.locationSt.onPopState(() => {
      history.pushState(null, null, location.href);
    });
  }

  submitQuiz(){
Swal.fire({
  title:'do you want to submit the quiz?',
  showCancelButton:true,
  confirmButtonText:'submit',
  denyButtonText:'dont save',
  icon:'info',
}).then((e)=>{
  if (e.isConfirmed) {
    //calculation
this.questions.forEach(q => {
  if(q.givenAnswer==q.answer)
  {
    this.correctAnswers++;
    let marksSingle=this.questions[0].quiz.maxMarks/this.questions.length
  this.marksGot+=marksSingle;
  }

});
  }
} )




}
}
