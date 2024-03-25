package com.ktuan.forumapi.models;

import jakarta.persistence.*;

@Entity
@Table(name = "comments")
public class Comment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int cID;
    @Column
    private String cmtContent;
    @Column
    private int uID;
    @Column
    private int pID;

    public Comment(String cmtContent, int uID, int pID) {
        this.cmtContent = cmtContent;
        this.uID = uID;
        this.pID = pID;
    }

    public int getcID() {
        return cID;
    }

    public void setcID(int cID) {
        this.cID = cID;
    }

    public String getCmtContent() {
        return cmtContent;
    }

    public void setCmtContent(String cmtContent) {
        this.cmtContent = cmtContent;
    }

    public int getuID() {
        return uID;
    }

    public void setuID(int uID) {
        this.uID = uID;
    }

    public int getpID() {
        return pID;
    }

    public void setpID(int pID) {
        this.pID = pID;
    }

    public Comment() {
    }
}
