package com.ktuan.forumapi.models;

import jakarta.persistence.*;

@Entity
@Table(name = "dislikes")
public class Dislike {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int dID;
    @Column
    private int uID;
    @Column
    private int pID;


    public Dislike() {
    }

    public Dislike(int uID, int pID) {
        this.uID = uID;
        this.pID = pID;
    }

    public int getdID() {
        return dID;
    }

    public void setdID(int dID) {
        this.dID = dID;
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
