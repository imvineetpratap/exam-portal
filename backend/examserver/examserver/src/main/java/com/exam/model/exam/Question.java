package com.exam.model.exam;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;

@Entity
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class Question {
//	@JsonIgnore
//    public String getAnswer() {
//		return answer;
//	}
//	@JsonProperty
//	public void setAnswer(String answer) {
//		this.answer = answer;
//	}
	@Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long quesId;

    //content means question here
   @Column(length = 2000)
    private String content;
    private String image;
    private String option1;
    private String option2;
    private String option3;
    private String option4;
   //answer frontend pe nahi jaega jsonignore se
//    @JsonIgnore
    private String answer;
   //transient use karne se yeh field db me add nahi hogi
    @Transient
    private String givenAnswer;
    //mapping with quiz
    @ManyToOne(fetch = FetchType.EAGER)
    private Quiz quiz;
}
