package Cyberrules.demo.service;
import java.sql.*;
import java.util.ArrayList;
import java.util.List;
import Cyberrules.demo.model.Echipa;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

@Service
public class EchipaService {
    private final JdbcTemplate jdbcTemplate;
    @Autowired
    public EchipaService(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    public List<Echipa> getEchipa() {
        String sql = "SELECT * FROM echipa";
        return jdbcTemplate.query(sql, (rs, rowNum) ->
                new Echipa(
                        rs.getLong("echipaid"),
                        rs.getString("categorie"),
                        rs.getString("nume"),
                        rs.getBytes("imagine"),
                        rs.getBoolean("isDeleted"),
                        rs.getString("editia")
                ));
    }

    public String addEchipa(Echipa echipa) {
        String sql = "INSERT INTO Echipa(categorie, nume, imagine, isdeleted, editia) VALUES (?, ?, ?, ?, ?)";
        int affectedRows = jdbcTemplate.update(sql,
                echipa.getCategorie(),
                echipa.getNume(),
                echipa.getImagine(),
                echipa.isDeleted(),
                echipa.getEditia());

        if (affectedRows == 0) {
            return "Creating echipa failed, no rows affected.";
        } else {
            return "Echipa added successfully";
        }
    }

    public String deleteEchipa(Long echipaID) {
        String jucatoriSql = "DELETE FROM jucatori WHERE echipaid = ?";
        jdbcTemplate.update(jucatoriSql, echipaID);

        String echipaSql = "DELETE FROM Echipa WHERE echipaid = ?";
        int affectedRows = jdbcTemplate.update(echipaSql, echipaID);

        if (affectedRows == 0) {
            return "No echipa found with ID: " + echipaID;
        } else {
            return "Echipa with ID " + echipaID + " deleted successfully";
        }
    }
    public Echipa getEchipa(Long echipaID) {
        String sql = "SELECT * FROM Echipa WHERE echipaID = ?";
        return jdbcTemplate.queryForObject(sql, new Object[]{echipaID}, (rs, rowNum) ->
                new Echipa(
                        rs.getLong("echipaid"),
                        rs.getString("categorie"),
                        rs.getString("nume"),
                        rs.getBytes("imagine"),
                        rs.getBoolean("isDeleted"),
                        rs.getString("editia")
                ));
    }
    public List<Echipa> getEchipaNumeEditieCategorie(String nume, String editie, String categorie) {
        String sql = "SELECT * FROM Echipa WHERE nume = ? AND editia = ? AND categorie = ?";
        return jdbcTemplate.query(sql, new Object[]{nume, editie, categorie}, (rs, rowNum) ->
                new Echipa(
                        rs.getLong("echipaid"),
                        rs.getString("categorie"),
                        rs.getString("nume"),
                        rs.getBytes("imagine"),
                        rs.getBoolean("isDeleted"),
                        rs.getString("editia")
                ));
    }

    public List<Echipa> getEchipaCategorie(String categorie) {
        String sql = "SELECT * FROM Echipa WHERE categorie = ?";
        return jdbcTemplate.query(sql, new Object[]{categorie}, (rs, rowNum) ->
                new Echipa(
                        rs.getLong("echipaid"),
                        rs.getString("categorie"),
                        rs.getString("nume"),
                        rs.getBytes("imagine"),
                        rs.getBoolean("isDeleted"),
                        rs.getString("editia")
                ));
    }

    public String updateEchipa(Long echipaID, Echipa echipa) {
        String updateQuery = "UPDATE echipa SET echipaid=?, categorie=?, nume=?, imagine=?,isdeleted=?, editia=? WHERE echipaid=?";
        int affectedRows = jdbcTemplate.update(updateQuery,
                echipa.getEchipaId(),
                echipa.getCategorie(),
                echipa.getNume(),
                echipa.getImagine(),
                echipa.isDeleted(),
                echipa.getEditia(),
                echipaID);

        if (affectedRows == 0) {
            return "No echipa found with ID: " + echipaID;
        } else {
            return "Echipa with ID " + echipaID + " updated successfully";
        }
    }

    public List<Echipa> getEchipaNumeCategorie(String nume, String categorie) {
        String sql = "SELECT * FROM Echipa WHERE nume = ? AND categorie = ?";
        return jdbcTemplate.query(sql, new Object[]{nume, categorie}, (rs, rowNum) ->
                new Echipa(
                        rs.getLong("echipaid"),
                        rs.getString("categorie"),
                        rs.getString("nume"),
                        rs.getBytes("imagine"),
                        rs.getBoolean("isDeleted"),
                        rs.getString("editia")
                ));
    }
}
