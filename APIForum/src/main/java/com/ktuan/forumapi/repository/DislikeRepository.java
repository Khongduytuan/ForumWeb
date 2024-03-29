package com.ktuan.forumapi.repository;

import com.ktuan.forumapi.models.Dislike;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

public interface DislikeRepository extends JpaRepository<Dislike, Integer> {
    @Query("SELECT CASE WHEN COUNT(l) > 0 THEN TRUE ELSE FALSE END FROM Dislike l WHERE l.pID = ?1 AND l.uID = ?2")
    boolean existsDisLikeByuIDAndpID(int pID, int uID);

    @Modifying
    @Query("DELETE FROM Dislike l WHERE l.pID = ?1 AND l.uID = ?2")
    void deleteDislikeByuIDAndpID(int pID, int uID);

    @Query("SELECT COUNT(l) FROM Dislike l WHERE l.pID = ?1")
    long countDislikeByPID(int pID);
}
