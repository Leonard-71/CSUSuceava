package Cyberrules.demo.model;

import com.fasterxml.jackson.annotation.JsonProperty;

public class Sponsor {
    private Long sponsorId;
    private byte[] Imagine;
    private String numeComplet;
    private String linkSiteExtern;
    private String editia;
    private boolean isDeleted;

    public Sponsor(){

    }
    public Sponsor(Long sponsorId, byte[] Imagine, String numeComplet, String linkSiteExtern, String editia, boolean isDeleted) {
        this.sponsorId = sponsorId;
        this.Imagine = Imagine;
        this.numeComplet = numeComplet;
        this.linkSiteExtern = linkSiteExtern;
        this.editia = editia;
        this.isDeleted = isDeleted;
    }

    @JsonProperty("sponsorId")
    public Long getSponsorId() {
        return sponsorId;
    }

    public void setSponsorId(Long sponsorId) {
        this.sponsorId = sponsorId;
    }

    @JsonProperty("Imagine")
    public byte[] getImagine() {
        return Imagine;
    }

    public void setImagine(byte[] Imagine) {
        this.Imagine = Imagine;
    }

    @JsonProperty("numeComplet")
    public String getNumeComplet() {
        return numeComplet;
    }

    public void setNumeComplet(String numeComplet) {
        this.numeComplet = numeComplet;
    }

    @JsonProperty("linkSiteExtern")
    public String getLinkSiteExtern() {
        return linkSiteExtern;
    }

    public void setLinkSiteExtern(String linkSiteExtern) {
        this.linkSiteExtern = linkSiteExtern;
    }

    @JsonProperty("editia")
    public String getEditia() {
        return editia;
    }

    public void setEditia(String editia) {
        this.editia = editia;
    }
    @JsonProperty("isDeleted")
    public boolean isDeleted() {
        return isDeleted;
    }

    public void setDeleted(boolean deleted) {
        isDeleted = deleted;
    }
}
