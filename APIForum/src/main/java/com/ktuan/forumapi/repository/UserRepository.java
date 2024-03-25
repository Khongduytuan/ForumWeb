package com.ktuan.forumapi.repository;

import com.ktuan.forumapi.models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface UserRepository extends JpaRepository<User, Integer> {

    @Query("SELECT u FROM User u WHERE u.username = :username AND u.password = :password")
    User loginByUsernameAndPassword(String username, String password);

}
