package com.ktuan.forumapi.models;

import jakarta.persistence.*;

@Entity
@Table(name = "posts")
public class Post {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int pID;
    @Column
    private String title;
    @Column
    private String content;
    @Column
    private String author;
    @Column
    private String dateAndTime;
    @Column
    private String tag;
    @Column
    private String uID;


    public Post(String title, String content, String author, String dateAndTime, String tag, String uID) {
        this.title = title;
        this.content = content;
        this.author = author;
        this.dateAndTime = dateAndTime;
        this.tag = tag;
        this.uID = uID;
    }

    public Post() {
    }

    public int getpID() {
        return pID;
    }

    public void setpID(int pID) {
        this.pID = pID;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public String getAuthor() {
        return author;
    }

    public void setAuthor(String author) {
        this.author = author;
    }

    public String getDateAndTime() {
        return dateAndTime;
    }

    public void setDateAndTime(String dateAndTime) {
        this.dateAndTime = dateAndTime;
    }

    public String getTag() {
        return tag;
    }

    public void setTag(String tag) {
        this.tag = tag;
    }

    public String getuID() {
        return uID;
    }

    public void setuID(String uID) {
        this.uID = uID;
    }
}
