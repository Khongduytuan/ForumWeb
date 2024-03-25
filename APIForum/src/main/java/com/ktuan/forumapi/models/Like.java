package com.ktuan.forumapi.models;

import jakarta.persistence.*;

@Entity
@Table(name = "likes")
public class Like {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int lID;
    @Column
    private int uID;
    @Column
    private int pID;

    public Like(int uID, int pID) {
        this.uID = uID;
        this.pID = pID;
    }

    public Like() {
    }

    public int getlID() {
        return lID;
    }

    public void setlID(int lID) {
        this.lID = lID;
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
}
