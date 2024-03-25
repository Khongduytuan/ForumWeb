package com.ktuan.forumapi.controller;

import com.ktuan.forumapi.models.Comment;
import com.ktuan.forumapi.models.Like;
import com.ktuan.forumapi.repository.CommentRepository;
import com.ktuan.forumapi.repository.LikeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/comments")
public class CommentController {
    @Autowired
    CommentRepository commentRepository;

    @PostMapping("/comment")
    public ResponseEntity<String> likePost(@RequestBody Comment comment) {
        commentRepository.save(comment);
        return new ResponseEntity<>("Comment post successfully", HttpStatus.OK);
    }


    // Xóa một comment
    @DeleteMapping("/comment/{id}")
    public ResponseEntity<String> deleteComment(@PathVariable("id") int id) {
        commentRepository.deleteById(id);
        return new ResponseEntity<>("Comment deleted successfully", HttpStatus.OK);
    }

    // Cập nhật một comment
    @PutMapping("/updatecomment/{id}")
    public ResponseEntity<String> updateComment(@PathVariable("id") int id, @RequestBody Comment updatedComment) {
        Optional<Comment> existingComment = commentRepository.findById(id);
        if (existingComment.isPresent()) {
            Comment commentToUpdate = existingComment.get();
            // Cập nhật thông tin của comment
            commentToUpdate.setCmtContent(updatedComment.getCmtContent());
            // Lưu comment đã cập nhật
            commentRepository.save(commentToUpdate);
            return new ResponseEntity<>("Comment updated successfully", HttpStatus.OK);
        } else {
            return new ResponseEntity<>("Comment not found", HttpStatus.NOT_FOUND);
        }
    }
}
