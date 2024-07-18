package Cyberrules.demo.model;

import com.fasterxml.jackson.annotation.JsonProperty;

public class EchipaClasament {
    private int pos;
    private String numeEchipa;
    private int meciuri;
    private int victorii;
    private int egaluri;
    private int infrangeri;
    private int goluriMarcate;
    private int goluriPrimite;
    private int diferentaGoluri;
    private int victoriiAcasa;
    private int egaluriAcasa;
    private int victoriiDeplasare;
    private int egaluriDeplasare;
    private int puncteAcasa;
    private int puncteDeplasare;
    private int puncte;

    // Constructor
    public EchipaClasament(int pos, String numeEchipa, int meciuri, int victorii, int egaluri, int infrangeri,
                           int goluriMarcate, int goluriPrimite, int diferentaGoluri, int victoriiAcasa,
                           int egaluriAcasa, int victoriiDeplasare, int egaluriDeplasare, int puncteAcasa,
                           int puncteDeplasare, int puncte) {
        this.pos = pos;
        this.numeEchipa = numeEchipa;
        this.meciuri = meciuri;
        this.victorii = victorii;
        this.egaluri = egaluri;
        this.infrangeri = infrangeri;
        this.goluriMarcate = goluriMarcate;
        this.goluriPrimite = goluriPrimite;
        this.diferentaGoluri = diferentaGoluri;
        this.victoriiAcasa = victoriiAcasa;
        this.egaluriAcasa = egaluriAcasa;
        this.victoriiDeplasare = victoriiDeplasare;
        this.egaluriDeplasare = egaluriDeplasare;
        this.puncteAcasa = puncteAcasa;
        this.puncteDeplasare = puncteDeplasare;
        this.puncte = puncte;
    }

    // Getters and setters (if needed)
    // You can generate getters and setters for the fields using your IDE.

    // You can also override the toString() method to provide a custom string representation

        @Override
        public String toString() {
            return String.format("Position: %d" +
                            "Team Name: %s" +
                            "Players: %d" +
                            "Wins: %d" +
                            "Draws: %d" +
                            "Losses: %d" +
                            "Goals Scored: %d" +
                            "Goals Conceded: %d" +
                            "Goal Difference: %d" +
                            "Home Wins: %d" +
                            "Home Draws: %d" +
                            "Away Wins: %d" +
                            "Away Draws: %d" +
                            "Home Points: %d" +
                            "Away Points: %d" +
                            "Total Points: %d",
                    pos, numeEchipa, meciuri, victorii, egaluri, infrangeri,
                    goluriMarcate, goluriPrimite, diferentaGoluri, victoriiAcasa,
                    egaluriAcasa, victoriiDeplasare, egaluriDeplasare, puncteAcasa,
                    puncteDeplasare, puncte);
        }
    @JsonProperty("Pos")
    public int getPos() {
        return pos;
    }

    @JsonProperty("NumeEchipa")
    public String getNumeEchipa() {
        return numeEchipa;
    }

    @JsonProperty("Meciuri")
    public int getMeciuri() {
        return meciuri;
    }

    @JsonProperty("Victorii")
    public int getVictorii() {
        return victorii;
    }

    @JsonProperty("Egaluri")
    public int getEgaluri() {
        return egaluri;
    }

    @JsonProperty("Infrangeri")
    public int getInfrangeri() {
        return infrangeri;
    }

    @JsonProperty("GoluriMarcate")
    public int getGoluriMarcate() {
        return goluriMarcate;
    }

    @JsonProperty("GoluriPrimite")
    public int getGoluriPrimite() {
        return goluriPrimite;
    }

    @JsonProperty("DiferentaGoluri")
    public int getDiferentaGoluri() {
        return diferentaGoluri;
    }

    @JsonProperty("VictoriiAcasa")
    public int getVictoriiAcasa() {
        return victoriiAcasa;
    }

    @JsonProperty("EgaluriAcasa")
    public int getEgaluriAcasa() {
        return egaluriAcasa;
    }

    @JsonProperty("VictoriiDeplasare")
    public int getVictoriiDeplasare() {
        return victoriiDeplasare;
    }

    @JsonProperty("EgaluriDeplasare")
    public int getEgaluriDeplasare() {
        return egaluriDeplasare;
    }

    @JsonProperty("PuncteAcasa")
    public int getPuncteAcasa() {
        return puncteAcasa;
    }

    @JsonProperty("PuncteDeplasare")
    public int getPuncteDeplasare() {
        return puncteDeplasare;
    }

    @JsonProperty("Puncte")
    public int getPuncte() {
        return puncte;
    }
}
