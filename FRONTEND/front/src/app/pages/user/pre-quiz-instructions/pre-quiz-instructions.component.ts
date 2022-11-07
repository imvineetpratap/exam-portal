import  Swal  from 'sweetalert2';
import { QuizzesService } from 'src/app/services/quizzes.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-pre-quiz-instructions',
  templateUrl: './pre-quiz-instructions.component.html',
  styleUrls: ['./pre-quiz-instructions.component.css']
})
export class PreQuizInstructionsComponent implements OnInit {
qidhere;
quiz:any=[];

startQuiz(){
  // console.log('working');
  Swal.fire({
    title: 'Do you want to start the quiz?',

    showCancelButton: true,
    confirmButtonText: 'Start',

    icon:'question',

  }).then((result) => {

    if (result.isConfirmed) {
      this.router.navigate(['/start/'+this.qidhere]);
    } else if (result.isDenied) {
      Swal.fire('Changes are not saved', '', 'info')
    }
  })

}
  constructor(private _route:ActivatedRoute,private _quizService:QuizzesService, private router:Router) { }

  ngOnInit(): void {
    this.qidhere=this._route.snapshot.params['qid'];
  // console.log(this.qidhere);

this._quizService.getQuiz(this.qidhere).subscribe(
  (data)=>{
    console.log(data);
    this.quiz=data;
  },
  (error)=>{
    console.log(error);
  }
)

  }

}
