package com.exam.helper;

public class UserNotFoundException extends Exception{

    public  UserNotFoundException(){

            super("User with this Username is already there in db try with another Username");
        }

        public UserNotFoundException(String msg) {
            super(msg);
    }
}
