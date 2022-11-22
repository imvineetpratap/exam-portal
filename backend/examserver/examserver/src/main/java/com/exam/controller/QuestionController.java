package com.exam.controller;

import com.exam.model.exam.Question;
import com.exam.model.exam.Quiz;
import com.exam.service.QuestionService;
import com.exam.service.QuizService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@CrossOrigin("*")
@RequestMapping("/question")
public class QuestionController {
    @Autowired
    private QuestionService questionService;

    @Autowired
    private QuizService quizService;

    //add question
    @PostMapping("/")
    public ResponseEntity<Question> add(@RequestBody Question question) {
        return ResponseEntity.ok(this.questionService.addQuestion(question));
    }

    //update question
    @PutMapping("/")
    public ResponseEntity<Question> update(@RequestBody Question question) {
        return ResponseEntity.ok(this.questionService.updateQuestion(question));
    }

    //get total number of quiz allowed questions of any quiz
    @GetMapping("/quiz/{qid}")
    public ResponseEntity<?> getQuestionsOfQuiz(@PathVariable("qid") Long qid) {
        //we have only id of quiz
//       Quiz quiz= new Quiz();
//       quiz.setQid(qid);
//       Set<Question> questionsOfQuiz=this.questionService.getQuestionsOfQuiz(quiz);
//       return ResponseEntity.ok(questionsOfQuiz);
        //method 2
        Quiz quiz = this.quizService.getQuiz(qid);
        Set<Question> questions = quiz.getQuestions();
        List<Question> list = new ArrayList(questions);
        //checking max number of questions if more than that than returning a sublist
//       System.out.println("total number of questions"+quiz.getNumberOfQuestion());
       if (list.size() > Integer.parseInt(quiz.getNumberOfQuestion()))
       {
           list = list.subList(0, Integer.parseInt(quiz.getNumberOfQuestion() + 1));
       }
       list.forEach(
    		   
    		   (q)->{q.setAnswer("");}
    		   
    		   );
        Collections.shuffle(list);
        return ResponseEntity.ok(list);
    }

//get all questions at admin end
    @GetMapping("/quiz/all/{qid}")
    public ResponseEntity<?> getQuestionsOfQuizAdmin(@PathVariable("qid") Long qid) {
//        we have only id of quiz
       Quiz quiz= new Quiz();
       quiz.setQid(qid);
       Set<Question> questionsOfQuiz=this.questionService.getQuestionsOfQuiz(quiz);
       return ResponseEntity.ok(questionsOfQuiz);
    }


    //get single question
    @GetMapping("/{quesId}")
    public Question get(@PathVariable("quesId") Long quesId)
    {
        return this.questionService.getQuestion(quesId);
    }

    //delete question
    @DeleteMapping("/{quesId}")
    public void delete(@PathVariable("quesId") Long quesId){
this.questionService.deleteQuestion(quesId);
    }
    
    
    
    //evaluate quiz
    @PostMapping("/eval-quiz")
    
    public ResponseEntity<?> evalQuiz(@RequestBody List<Question> questions)
    {
   System.out.println(questions);
Double marksGot = 0.0;
 int  correctAnswers = 0;
 int attempted = 0;
   for(Question q:questions){
//	   System.out.println(q.getGivenAnswer());
	   
	   //single questions
//	   q.getQuesId();
	  Question question= this.questionService.getQuestionbyId(q.getQuesId());
//	  System.out.println(question.getAnswer());
	   if(question.getAnswer().equals(q.getGivenAnswer()))
	   {
		   //correct
		   correctAnswers++;
		   
		  double marksSingle =Double.parseDouble(questions.get(0).getQuiz().getMaxMarks())/questions.size();
//				  questions[0].quiz.maxMarks / this.questions.length;
			           marksGot += marksSingle;
//				     
	   }
	   if(q.getGivenAnswer()!=null) {
		   attempted++;
	   }
	   else {
		   //incorrect
	   }
   };
   
   
   Map<String, Object> map=Map.of("marksGot",marksGot,"correctanswers",correctAnswers,"Attempted",attempted);
   System.out.println(map);
   return ResponseEntity.ok(map);
    }
    
    
}
