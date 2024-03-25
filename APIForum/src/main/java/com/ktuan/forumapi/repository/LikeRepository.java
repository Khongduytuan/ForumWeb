package com.ktuan.forumapi.repository;

import com.ktuan.forumapi.models.Like;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LikeRepository extends JpaRepository<Like, Integer> {
}
