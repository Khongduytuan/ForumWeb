package com.ktuan.forumapi.controller;

import com.ktuan.forumapi.models.User;
import com.ktuan.forumapi.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/users")
public class UserController {
    @Autowired
    UserRepository repository;
//    @GetMapping("/user")
//    public List<User> getAllUsers(){
//        List<User> allUser = repository.findAll();
//        return allUser;
//    }

    @PostMapping("/register")
    public ResponseEntity register(@RequestBody User user){
        repository.save(user);
        return new ResponseEntity("Dang ky thanh cong", HttpStatus.OK);
    }


    @PostMapping("/login")
    public ResponseEntity login(@RequestBody User user){
        User users = repository.loginByUsernameAndPassword(user.getUsername(), user.getPassword());
        return new ResponseEntity(users, HttpStatus.OK);
    }
}
