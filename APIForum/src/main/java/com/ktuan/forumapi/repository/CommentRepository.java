package com.ktuan.forumapi.repository;

import com.ktuan.forumapi.models.Comment;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CommentRepository extends JpaRepository<Comment, Integer> {
}
