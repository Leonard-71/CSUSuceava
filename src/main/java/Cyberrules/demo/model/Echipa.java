package Cyberrules.demo.model;
import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.Date;

public class Echipa {
    private Long echipaId;
    private String categorie;
    private String nume;
    private byte[] imagine;
    private boolean isDeleted;
    private String editia;

    public Echipa() {
    }

    public Echipa(Long echipaId, String categorie, String nume, byte[] imagine, boolean isDeleted, String editia) {
        this.echipaId = echipaId;
        this.categorie = categorie;
        this.nume = nume;
        this.imagine = imagine;
        this.isDeleted = isDeleted;
        this.editia = editia;
    }

    @JsonProperty("echipaId")
    public Long getEchipaId() {
        return echipaId;
    }

    public void setEchipaId(Long echipaId) {
        this.echipaId = echipaId;
    }

    @JsonProperty("categorie")
    public String getCategorie() {
        return categorie;
    }

    public void setCategorie(String categorie) {
        this.categorie = categorie;
    }

    @JsonProperty("nume")
    public String getNume() {
        return nume;
    }

    public void setNume(String nume) {
        this.nume = nume;
    }

    @JsonProperty("imagine")
    public byte[] getImagine() {
        return imagine;
    }

    public void setImagine(byte[] imagine) {
        this.imagine = imagine;
    }

    @JsonProperty("isDeleted")
    public boolean isDeleted() {
        return isDeleted;
    }
    public void setDeleted(boolean deleted) {
        isDeleted = deleted;
    }
    @JsonProperty("editia")
    public String getEditia() {
        return editia;
    }
    public void setEditia(String editia) {
        this.editia = editia;
    }
}
