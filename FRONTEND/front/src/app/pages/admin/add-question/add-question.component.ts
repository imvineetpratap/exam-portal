import { QuestionService } from './../../../services/question.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
@Component({
  selector: 'app-add-question',
  templateUrl: './add-question.component.html',
  styleUrls: ['./add-question.component.css']
})
export class AddQuestionComponent implements OnInit {
quesid;
quizTitle;
public Editor = ClassicEditor;
question={
  quiz:{},
  content:'',
  option1:'',
  option2:'',
  option3:'',
  option4:'',
  answer:'',

};
  constructor(private _router:ActivatedRoute,private _questionService:QuestionService) { }

  ngOnInit(): void {
    this.quesid=this._router.snapshot.params['qid'];
    this.quizTitle=this._router.snapshot.params['title'];
    // console.log(this.quizTitle);
//dynamically adding a variable inside question.quiz
this.question.quiz['qid']=this.quesid;



  }




formSubmit(){
  console.log('working');
  this._questionService.addQuestionToQuiz(this.question).subscribe(

    (data)=>{
      Swal.fire('Success','Question Added sucessfully to '+this.quizTitle+' quiz','success');
    },
    (error)=>{
      Swal.fire('Error!!','internal server error','error');
      console.log(error);

    }

    )
}
}

