package com.ktuan.forumapi.controller;

import com.ktuan.forumapi.models.Like;
import com.ktuan.forumapi.repository.LikeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/likes")
public class LikeController {
    @Autowired
    LikeRepository likeRepository;

    @PostMapping("/like")
    public ResponseEntity<String> likePost(@RequestBody Like like) {
        likeRepository.save(like);
        return new ResponseEntity<>("Liked post successfully", HttpStatus.OK);
    }
}
