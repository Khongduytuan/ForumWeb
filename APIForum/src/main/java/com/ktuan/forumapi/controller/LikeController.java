package com.ktuan.forumapi.controller;

import com.ktuan.forumapi.models.Like;
import com.ktuan.forumapi.models.Post;
import com.ktuan.forumapi.repository.LikeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/likes")
public class LikeController {
    @Autowired
    LikeRepository likeRepository;

    @GetMapping("/like")
    public List<Like> getAllLikes(){
        List<Like> allLike = likeRepository.findAll();
        return allLike;
    }

    @PostMapping("/like")
    public ResponseEntity<String> likePost(@RequestBody Like like) {
        System.out.println("data: "+like.getpID() + like.getuID());
        likeRepository.save(like);
        return new ResponseEntity<>("Liked post successfully", HttpStatus.OK);
    }

    // Kiểm tra xem một bài post đã được like chưa
    @GetMapping("/likeexist/{pID}/{uID}")
    public ResponseEntity<Boolean> isPostLiked(@PathVariable int pID, @PathVariable int uID) {
        boolean isLiked = likeRepository.existsByuIDAndpID(pID, uID);
        return new ResponseEntity<>(isLiked, HttpStatus.OK);
    }

    // Xóa like của một bài post
    @Transactional
    @DeleteMapping("/deletelike/{pID}/{uID}")
    public ResponseEntity<String> unlikePost(@PathVariable int pID, @PathVariable int uID) {
        likeRepository.deleteByuIDAndpID(pID, uID);
        return new ResponseEntity<>("Unliked post successfully", HttpStatus.OK);
    }

    @GetMapping("/count/{pID}")
    public ResponseEntity<Long> countLikesByPostId(@PathVariable int pID) {
        long likeCount = likeRepository.countByPID(pID);
        return new ResponseEntity<>(likeCount, HttpStatus.OK);
    }
}
