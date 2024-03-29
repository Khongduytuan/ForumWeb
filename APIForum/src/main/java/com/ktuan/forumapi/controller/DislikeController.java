package com.ktuan.forumapi.controller;

import com.ktuan.forumapi.models.Dislike;
import com.ktuan.forumapi.models.Like;
import com.ktuan.forumapi.repository.DislikeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/dislikes")
public class DislikeController {
    @Autowired
    DislikeRepository dislikeRepository;
    @GetMapping("/dislike")
    public List<Dislike> getAllDislikes(){
        List<Dislike> allDislike = dislikeRepository.findAll();
        return allDislike;
    }

    @PostMapping("/dislike")
    public ResponseEntity<String> dislikePost(@RequestBody Dislike dislike) {
        dislikeRepository.save(dislike);
        return new ResponseEntity<>("Disliked post successfully", HttpStatus.OK);
    }


    // Kiểm tra xem một bài post đã được like chưa
    @GetMapping("/dislikeexist/{pID}/{uID}")
    public ResponseEntity<Boolean> isPostDisliked(@PathVariable int pID, @PathVariable int uID) {
        boolean isDisLiked = dislikeRepository.existsDisLikeByuIDAndpID(pID, uID);
        return new ResponseEntity<>(isDisLiked, HttpStatus.OK);
    }

    // Xóa like của một bài post
    @Transactional
    @DeleteMapping("/deletedislike/{pID}/{uID}")
    public ResponseEntity<String> undislikePost(@PathVariable int pID, @PathVariable int uID) {
        dislikeRepository.deleteDislikeByuIDAndpID(pID, uID);
        return new ResponseEntity<>("Undisliked post successfully", HttpStatus.OK);
    }


    @GetMapping("/countDislike/{pID}")
    public ResponseEntity<Long> countDislikeByPostId(@PathVariable int pID) {
        long dislikeCount = dislikeRepository.countDislikeByPID(pID);
        return new ResponseEntity<>(dislikeCount, HttpStatus.OK);
    }
}
