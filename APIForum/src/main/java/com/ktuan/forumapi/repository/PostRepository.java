package com.ktuan.forumapi.repository;

import com.ktuan.forumapi.models.Post;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface PostRepository extends JpaRepository<Post, Integer> {
    @Query("SELECT p FROM Post p WHERE p.uID = :uID")
    List<Post> findByUserID(@Param("uID") String uID);

    List<Post> findByTagContaining(String tag);
    List<Post> findByAuthor(String author);
}
