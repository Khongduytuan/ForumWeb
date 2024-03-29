package com.ktuan.forumapi.repository;

import com.ktuan.forumapi.models.Like;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

public interface LikeRepository extends JpaRepository<Like, Integer> {
    @Query("SELECT CASE WHEN COUNT(l) > 0 THEN TRUE ELSE FALSE END FROM Like l WHERE l.pID = ?1 AND l.uID = ?2")
    boolean existsByuIDAndpID(int pID, int uID);

    @Modifying
    @Query("DELETE FROM Like l WHERE l.pID = ?1 AND l.uID = ?2")
    void deleteByuIDAndpID(int pID, int uID);


    @Query("SELECT COUNT(l) FROM Like l WHERE l.pID = ?1")
    long countByPID(int pID);
}
