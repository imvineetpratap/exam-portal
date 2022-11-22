package com.exam;

import java.util.HashSet;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
//import java.util.Set;
//
//import com.exam.helper.UserFoundException;
//import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import com.exam.helper.UserFoundException;
import com.exam.model.Role;
import com.exam.model.User;
import com.exam.model.UserRole;
import com.exam.service.UserService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

@SpringBootApplication
public class ExamserverApplication implements CommandLineRunner {

	@Autowired
	private UserService userService;
@Autowired
	private BCryptPasswordEncoder bCryptPasswordEncoder;

	public static void main(String[] args) {
		SpringApplication.run(ExamserverApplication.class, args);
	}

	@Override
	public void run(String... args) throws Exception {
		// TODO Auto-generated method stub
	System.out.println("Starting code");
//	try{
//
//
//		User user = new User();
//		user.setFirstname("vineet");
//		user.setLastname("singh");
//		user.setUsername("vineet9696");
//		user.setPassword(this.bCryptPasswordEncoder.encode("1234"));
//		user.setPhone("9696986596");
//		user.setEmail("vs67134@outlook.com");
//		user.setProfile("default.png");
//		Role role1 = new Role();
//		role1.setRoleId(44L);
//		role1.setRoleName("Normal");
//		Set<UserRole> userRoleSet = new HashSet<>();
//		UserRole userRole = new UserRole();
//		userRole.setRole(role1);
//		userRole.setUser(user);
//		userRoleSet.add(userRole);
//		User user1 = this.userService.createUser(user, userRoleSet);
//		System.out.println(user1.getUsername());
//	} catch (UserFoundException e) {
//		e.printStackTrace();
//		throw new RuntimeException(e);
//	
//	}
	}

}
