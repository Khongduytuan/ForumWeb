package com.ktuan.forumapi.controller;

import com.ktuan.forumapi.models.Post;
import com.ktuan.forumapi.repository.PostRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/posts")
public class PostController {
    @Autowired
    PostRepository postRepository;
    @GetMapping("/post")
    public List<Post> getAllPosts(){
        List<Post> allPost = postRepository.findAll();
        return allPost;
    }

    @GetMapping("/post/{uID}")
    public List<Post> getPostsByUserID(@PathVariable String uID) {
        return postRepository.findByUserID(uID);
    }

    @PostMapping("/create")
    public ResponseEntity<Post> createPost(@RequestBody Post post) {
        Post createdPost = postRepository.save(post);
        return new ResponseEntity<>(createdPost, HttpStatus.CREATED);
    }


    @GetMapping("/tag/{tag}")
    public List<Post> getPostsByTag(@PathVariable String tag) {
        return postRepository.findByTagContaining(tag);
    }

    @GetMapping("/author/{author}")
    public List<Post> getPostsByAuthor(@PathVariable String author) {
        return postRepository.findByAuthor(author);
    }


    // Cập nhật bài Post
    @PutMapping("/updatepost/{id}")
    public ResponseEntity<String> updatePost(@PathVariable("id") int id, @RequestBody Post updatedPost) {
        Optional<Post> existingPost = postRepository.findById(id);
        if (existingPost.isPresent()) {
            Post postToUpdate = existingPost.get();
            // Cập nhật thông tin của bài Post
            postToUpdate.setTitle(updatedPost.getTitle());
            postToUpdate.setContent(updatedPost.getContent());
            postToUpdate.setTag(updatedPost.getTag());
            // Lưu bài Post đã cập nhật
            postRepository.save(postToUpdate);
            return new ResponseEntity<>("Post updated successfully", HttpStatus.OK);
        } else {
            return new ResponseEntity<>("Post not found", HttpStatus.NOT_FOUND);
        }
    }
}
