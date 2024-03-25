package com.ktuan.forumapi.models;


import jakarta.persistence.*;

@Entity
@Table(name = "users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int uID;
    @Column
    private String name;
    @Column
    private String birth;
    @Column
    private String email;
    @Column
    private String username;
    @Column
    private String password;


    public User() {
    }

    public User(String name, String birth, String email, String username, String password) {
        this.name = name;
        this.birth = birth;
        this.email = email;
        this.username = username;
        this.password = password;
    }


    public int getuID() {
        return uID;
    }

    public void setuID(int uID) {
        this.uID = uID;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getBirth() {
        return birth;
    }

    public void setBirth(String birth) {
        this.birth = birth;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
