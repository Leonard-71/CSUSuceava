package Cyberrules.demo.model;
import com.fasterxml.jackson.annotation.JsonProperty;

import java.sql.Timestamp;


public class Meci {
    private Long meciId;
    private Timestamp datameci;
    private Long echipaid;
    private Long adversarid;
    private String locatie;
    private Integer scorechipa;
    private Integer scoradversar;
    private String editia;
    private String tipcampionat;
    private String linkmeci;
    private boolean isDeleted;
    private boolean isFinished;
    public Meci(){

    }
    public Meci(Long meciId, Timestamp datameci, Long echipaid, Long adversarid, String locatie, Integer scorechipa, Integer scoradversar, String editia, String tipcampionat, String linkmeci, boolean isDeleted,boolean isFinished) {
        this.meciId = meciId;
        this.datameci = datameci;
        this.echipaid = echipaid;
        this.adversarid = adversarid;
        this.locatie = locatie;
        this.scorechipa = scorechipa;
        this.scoradversar = scoradversar;
        this.editia = editia;
        this.tipcampionat = tipcampionat;
        this.linkmeci = linkmeci;
        this.isDeleted = isDeleted;
        this.isFinished = isFinished;
    }
    @JsonProperty("meciId")
    public Long getMeciId() {
        return meciId;
    }

    public void setMeciId(Long meciId) {
        this.meciId = meciId;
    }
    @JsonProperty("datameci")
    public Timestamp getDatameci() {
        return  datameci;
    }

    public void setDatameci(Timestamp datameci) {
        this.datameci = datameci;
    }

    @JsonProperty("echipaid")
    public Long getEchipaid() {
        return echipaid;
    }

    public void setEchipaid(Long echipaid) {
        this.echipaid = echipaid;
    }

    @JsonProperty("adversarid")
    public Long getAdversarid() {
        return adversarid;
    }

    public void setAdversarid(Long adversarid) {
        this.adversarid = adversarid;
    }

    @JsonProperty("locatie")
    public String getLocatie() {
        return locatie;
    }

    public void setLocatie(String locatie) {
        this.locatie = locatie;
    }

    @JsonProperty("scorechipa")
    public Integer getScorechipa() {
        return scorechipa;
    }

    public void setScorechipa(Integer scorechipa) {
        this.scorechipa = scorechipa;
    }

    @JsonProperty("scoradversar")
    public Integer getScoradversar() {
        return scoradversar;
    }

    public void setScoradversar(Integer scoradversar) {
        this.scoradversar = scoradversar;
    }

    @JsonProperty("editia")
    public String getEditia() {
        return editia;
    }

    public void setEditia(String editia) {
        this.editia = editia;
    }

    @JsonProperty("tipcampionat")
    public String getTipcampionat() {
        return tipcampionat;
    }

    public void setTipcampionat(String tipcampionat) {
        this.tipcampionat = tipcampionat;
    }

    @JsonProperty("linkmeci")
    public String getLinkmeci() {
        return linkmeci;
    }

    public void setLinkmeci(String linkmeci) {
        this.linkmeci = linkmeci;
    }

    @JsonProperty("isDeleted")
    public boolean isDeleted() {
        return isDeleted;
    }

    public void setDeleted(boolean deleted) {
        isDeleted = deleted;
    }
    @JsonProperty("isFinished")
    public boolean isFinished() {
        return isFinished;
    }

    public void setFinished(boolean finished) {
        isFinished = finished;
    }
}
