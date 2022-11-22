import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  constructor(private _http:HttpClient) { }

  //get all questions of quiz
  public getQuestionsOfQuiz(qid){
    return this._http.get(`${baseUrl}/question/quiz/all/${qid}`)
  }

  public getQuestionsofQuizForTest(qid){
    return this._http.get(`${baseUrl}/question/quiz/${qid}`)
  }
  //add question in a quiz
  public addQuestionToQuiz(question){
    return this._http.post(`${baseUrl}/question/`,question)
  }
  //update a quiz
  public updateQuestionToQuiz(question){
    return this._http.post(`${baseUrl}/question/`,question)
  }
  //delete question
  public deleteQuestionofQuiz(quesId){
return this._http.delete(`${baseUrl}/question/${quesId}`)
  }

  //get single question
  public getSingleQuestionofQuiz(quesId){
    return this._http.get(`${baseUrl}/question/${quesId}`)
      }

      //evaluating quiz
      public evalQuiz(questions)
      {
        return this._http.post(`${baseUrl}/question/eval-quiz`,questions)
      }
}
