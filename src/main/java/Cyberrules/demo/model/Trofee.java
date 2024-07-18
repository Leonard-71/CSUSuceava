package Cyberrules.demo.model;

import com.fasterxml.jackson.annotation.JsonProperty;

public class Trofee {
    private Long trofeeid;
    private String nume;
    private Integer an;
    private Long echipaid;
    private byte[] imagine;

    public Trofee() {
    }

    public Trofee(Long trofeeid, String nume, Integer an, Long echipaid, byte[] imagine) {
        this.trofeeid = trofeeid;
        this.nume = nume;
        this.an = an;
        this.echipaid = echipaid;
        this.imagine = imagine;
    }

    @JsonProperty("trofeeid")
    public Long getTrofeid() {
        return trofeeid;
    }

    public void setTrofeid(Long trofeid) {
        this.trofeeid = trofeid;
    }

    @JsonProperty("nume")
    public String getNume() {
        return nume;
    }

    public void setNume(String nume) {
        this.nume = nume;
    }

    @JsonProperty("an")
    public Integer getAn() {
        return an;
    }

    public void setAn(Integer an) {
        this.an = an;
    }

    @JsonProperty("echipaid")
    public Long getEchipaid() {
        return echipaid;
    }

    public void setEchipaid(Long echipaid) {
        this.echipaid = echipaid;
    }

    @JsonProperty("imagine")
    public byte[] getImagine() {
        return imagine;
    }

    public void setImagine(byte[] imagine) {
        this.imagine = imagine;
    }
}
