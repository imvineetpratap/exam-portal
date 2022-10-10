package com.exam.model;

import java.util.HashSet;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name="users")
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class User {
	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
private Long id;
private String username;
private String password;
private String firstname;
private String lastname;
private String email;
private String phone;
private boolean enabled=true;
private String profile;

//user can have many roles
@OneToMany(cascade=CascadeType.ALL,fetch=FetchType.EAGER,mappedBy ="user")
@JsonIgnore
private Set<UserRole> userRole=new HashSet<>();
}
 