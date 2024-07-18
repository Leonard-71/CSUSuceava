package Cyberrules.demo.model;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.sql.Date;

public class Jucator {
    private Long JucatorID;
    private String Nume;
    private String Prenume;
    private String Pozitie;
    private Integer Numar;
    private Date DataNasterii;
    private String Nationalitate;
    private Double Inaltime;
    private String Descriere;
    private byte[] imagine;
    private Long EchipaID;
    private boolean isDeleted;

    public Jucator() {
    }

    public Jucator(Long jucatorID, String nume, String prenume, String pozitie, Integer numar, Date dataNasterii, String nationalitate, Double inaltime, String descriere, byte[] imagine, Long echipaID, boolean isDeleted) {
        JucatorID = jucatorID;
        Nume = nume;
        Prenume = prenume;
        Pozitie = pozitie;
        Numar = numar;
        DataNasterii = dataNasterii;
        Nationalitate = nationalitate;
        Inaltime = inaltime;
        Descriere = descriere;
        this.imagine = imagine;
        EchipaID = echipaID;
        this.isDeleted = isDeleted;
    }
    @JsonProperty("jucatorID")
    public Long getJucatorID() {
        return JucatorID;
    }

    public void setJucatorID(Long jucatorID) {
        JucatorID = jucatorID;
    }
    @JsonProperty("nume")
    public String getNume() {
        return Nume;
    }
    public void setNume(String nume) {
        Nume = nume;
    }
    @JsonProperty("prenume")
    public String getPrenume() {
        return Prenume;
    }

    public void setPrenume(String prenume) {
        Prenume = prenume;
    }
    @JsonProperty("pozitie")
    public String getPozitie() {
        return Pozitie;
    }

    public void setPozitie(String pozitie) {
        Pozitie = pozitie;
    }
    @JsonProperty("numar")
    public Integer getNumar() {
        return Numar;
    }

    public void setNumar(Integer numar) {
        Numar = numar;
    }
    @JsonProperty("dataNasterii")
    public Date getDataNasterii() {
        return DataNasterii;
    }

    public void setDataNasterii(Date dataNasterii) {
        DataNasterii = dataNasterii;
    }
    @JsonProperty("nationalitate")
    public String getNationaliate() {
        return Nationalitate;
    }
    public void setNationaliate(String nationalitate) {
        Nationalitate = nationalitate;
    }
    @JsonProperty("inaltime")
    public Double getInaltime() {
        return Inaltime;
    }

    public void setInaltime(Double inaltime) {
        Inaltime = inaltime;
    }
    @JsonProperty("descriere")
    public String getDescriere() {
        return Descriere;
    }

    public void setDescriere(String descriere) {
        Descriere = descriere;
    }
    @JsonProperty("imagine")
    public byte[] getImagine() {
        return imagine;
    }

    public void setImagine(byte[] imagine) {
        this.imagine = imagine;
    }
    @JsonProperty("echipaID")
    public Long getEchipaID() {
        return EchipaID;
    }

    public void setEchipaID(Long echipaID) {
        EchipaID = echipaID;
    }
    @JsonProperty("isDeleted")
    public boolean isDeleted() {
        return isDeleted;
    }

    public void setDeleted(boolean deleted) {
        isDeleted = deleted;
    }
}
