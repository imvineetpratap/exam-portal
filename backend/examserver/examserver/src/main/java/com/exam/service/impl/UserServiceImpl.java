package com.exam.service.impl;

import java.util.Set;

import com.exam.helper.UserFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;
import com.exam.model.User;
import com.exam.model.UserRole;
import com.exam.repo.RoleRepository;
import com.exam.repo.UserRepository;
import com.exam.service.UserService;


@Service
public class UserServiceImpl implements UserService {
	
	@Autowired
	private UserRepository userRepository;
	
	@Autowired
	private RoleRepository roleRepository;

	// creating user
	@Override
	public User createUser(User user, Set<UserRole> userRole) throws Exception  {
		// TODO Auto-generated method stub
		
		User local=null;
		
		try {
			local=this.userRepository.findByUsername(user.getUsername());
			
			if(local!=null) {
				System.out.println("user is already there!!");
//				throw new Exception("User Already present Exception!!");
				throw new UserFoundException();
			}

			else{

			
			for(UserRole ur:userRole) {
				roleRepository.save(ur.getRole());
			}
			user.getUserRoles().addAll(userRole);
			local=this.userRepository.save(user);
			}
		}catch(Exception e) {
			throw new ResponseStatusException(HttpStatus.BAD_GATEWAY,"User Already Exists");
			
			
		}

		return local;
		
	}
//getting user by username
	@Override
	public User getUser(String username) {
		// TODO Auto-generated method stub
		return this.userRepository.findByUsername(username);
	}
	
	//delete by id
	@Override
	public void deleteUser(Long userId) {
		// TODO Auto-generated method stub
		this.userRepository.deleteById(userId);
		
	}
	@Override
	public User updateUser(Long userId) {
		// TODO Auto-generated method stub
		return this.updateUser(userId);
	}

	

	
	

}
