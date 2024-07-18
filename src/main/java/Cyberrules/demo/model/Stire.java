package Cyberrules.demo.model;
import com.fasterxml.jackson.annotation.JsonProperty;

import java.sql.Time;
import java.sql.Timestamp;


public class Stire {
    private Long stireID;
    private Timestamp datapublicarii;
    private String titlu;
    private String continut;
    private String username;
    private boolean isinfuture;
    private boolean isDeleted;
    private byte[] imagine1;
    private byte[] imagine2;
    private byte[] imagine3;
    private byte[] video;

    public Stire() {
    }

    public Stire(Long stireID, Timestamp datapublicarii, String titlu, String continut, String username, boolean isinfuture, boolean isDeleted,byte[] imagine1,byte[] imagine2,byte[] imagine3,byte[] video) {
        this.stireID = stireID;
        this.datapublicarii = datapublicarii;
        this.titlu = titlu;
        this.continut = continut;
        this.username = username;
        this.isinfuture = isinfuture;
        this.isDeleted = isDeleted;
        this.imagine1=imagine1;
        this.imagine2=imagine2;
        this.imagine3=imagine3;
        this.video=video;
    }
    @JsonProperty("stireid")
    public Long getStireID() {
        return stireID;
    }

    public void setStireID(Long stireID) {
        this.stireID = stireID;
    }
    @JsonProperty("datapublicarii")
    public Timestamp getDatapublicarii() {
        return datapublicarii;
    }

    public void setDatapublicarii(Timestamp datapublicarii) {
        this.datapublicarii = datapublicarii;
    }

    @JsonProperty("titlu")
    public String getTitlu() {
        return titlu;
    }

    public void setTitlu(String titlu) {
        this.titlu = titlu;
    }

    @JsonProperty("continut")
    public String getContinut() {
        return continut;
    }

    public void setContinut(String continut) {
        this.continut = continut;
    }

    @JsonProperty("username")
    public String getUserName() {
        return username;
    }

    public void setUserName(String username) {
        this.username = username;
    }

    @JsonProperty("isinfuture")
    public boolean isIsinfuture() {
        return isinfuture;
    }

    public void setIsinfuture(boolean isinfuture) {
        this.isinfuture = isinfuture;
    }

    @JsonProperty("isdeleted")
    public boolean isDeleted() {
        return isDeleted;
    }

    public void setDeleted(boolean deleted) {
        isDeleted = deleted;
    }
    @JsonProperty("imagine1")
    public byte[] getImagine1() {
        return imagine1;
    }

    public void setImagine1(byte[] imagine1) {
        this.imagine1 = imagine1;
    }
    @JsonProperty("imagine2")
    public byte[] getImagine2() {
        return imagine2;
    }

    public void setImagine2(byte[] imagine2) {
        this.imagine2 = imagine2;
    }
    @JsonProperty("imagine3")
    public byte[] getImagine3() {
        return imagine3;
    }

    public void setImagine3(byte[] imagine3) {
        this.imagine3 = imagine3;
    }
    @JsonProperty("video")
    public byte[] getVideo() {
        return video;
    }

    public void setVideo(byte[] video) {
        this.video = video;
    }
}
