package Cyberrules.demo.service;

import Cyberrules.demo.model.Jucator;
import org.springframework.stereotype.Service;

import java.sql.*;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.List;
@Service
public class JucatorService {
    private static final String URL = "jdbc:postgresql://localhost:5432/cyberrules";
    private static final String USER = "postgres";
    private static final String PASSWORD = "cyberrules";
    private Jucator buildJucatorFromResultSet(ResultSet rs) throws SQLException {
        return new Jucator(
                rs.getLong("JucatorID"),
                rs.getString("Nume"),
                rs.getString("Prenume"),
                rs.getString("Post"),
                rs.getInt("Numar"),
                rs.getDate("DataNasterii"),
                rs.getString("Nationalitate"),
                rs.getDouble("Inaltime"),
                rs.getString("Descriere"),
                rs.getBytes("imagine"),
                rs.getLong("EchipaID"),
                rs.getBoolean("isDeleted")
        );
    }

    public List<Jucator> getJucatori() throws SQLException {
        List<Jucator> jucatori = new ArrayList<>();
        try (Connection conn = DriverManager.getConnection(URL, USER, PASSWORD);
             Statement st = conn.createStatement();
             ResultSet rs = st.executeQuery("SELECT * FROM Jucatori")){
            while(rs.next())
            {
                Jucator jucator = buildJucatorFromResultSet(rs);
                jucatori.add(jucator);
            }
        }
        return jucatori;
    }
    public Jucator getJucator(Long jucatorID) throws SQLException {
        try (Connection conn = DriverManager.getConnection(URL, USER, PASSWORD);
             PreparedStatement ps = conn.prepareStatement("SELECT * FROM Jucatori WHERE JucatorID = ?")){
            ps.setLong(1,jucatorID);
            ResultSet rs = ps.executeQuery();
            while(rs.next()) {
                Jucator jucator = buildJucatorFromResultSet(rs);
                return jucator;
            }
        }
        return null;
    }
    public List<Jucator> getJucatoriEchipa(Long EchipaID) throws SQLException {
        List<Jucator> jucatori = new ArrayList<>();
        try (Connection conn = DriverManager.getConnection(URL, USER, PASSWORD);
             PreparedStatement ps = conn.prepareStatement("SELECT * FROM Jucatori WHERE EchipaID = ?")){
            ps.setLong(1,EchipaID);
            ResultSet rs = ps.executeQuery();
            while(rs.next()) {
                Jucator jucator = buildJucatorFromResultSet(rs);
                jucatori.add(jucator);
            }
        }
        return jucatori;
    }

    public List<Jucator> getJucatoriEchipaEditie(String numeEchipa,String editia, String categoria) throws SQLException {
        List<Jucator> jucatori = new ArrayList<>();
        try (Connection conn = DriverManager.getConnection(URL, USER, PASSWORD);
             PreparedStatement ps = conn.prepareStatement("SELECT j.* FROM Jucatori j, Echipa e WHERE j.echipaid=e.echipaid AND e.nume = ? AND e.editia = ? AND e.categorie = ?")){
            ps.setString(1,numeEchipa);
            ps.setString(2,editia);
            ps.setString(3,categoria);
            ResultSet rs = ps.executeQuery();
            while(rs.next()) {
                Jucator jucator = buildJucatorFromResultSet(rs);
                jucatori.add(jucator);
            }
        }
        return jucatori;
    }

    public List<Jucator> getJucatoriNume(String numeJucator) throws SQLException {
        List<Jucator> jucatori = new ArrayList<>();
        try (Connection conn = DriverManager.getConnection(URL, USER, PASSWORD);
             PreparedStatement ps = conn.prepareStatement("SELECT * FROM Jucatori WHERE Nume = ?")){
            ps.setString(1,numeJucator);
            ResultSet rs = ps.executeQuery();
            while(rs.next()) {
                Jucator jucator = buildJucatorFromResultSet(rs);
                jucatori.add(jucator);
            }
        }
        return jucatori;
    }

    public List<Jucator> getJucatoriPrenume(String prenumeJucator) throws SQLException {
        List<Jucator> jucatori = new ArrayList<>();
        try (Connection conn = DriverManager.getConnection(URL, USER, PASSWORD);
             PreparedStatement ps = conn.prepareStatement("SELECT * FROM Jucatori WHERE Prenume = ?")){
            ps.setString(1,prenumeJucator);
            ResultSet rs = ps.executeQuery();
            while(rs.next()) {
                Jucator jucator = buildJucatorFromResultSet(rs);
                jucatori.add(jucator);
            }
        }
        return jucatori;
    }

    public String addJucator(Jucator jucator) throws SQLException{
        try (Connection conn = DriverManager.getConnection(URL, USER, PASSWORD);
             PreparedStatement ps = conn.prepareStatement(
                     "INSERT INTO Jucatori (Nume, Prenume, Post, Numar, DataNasterii, Nationalitate, Inaltime, Descriere, imagine, EchipaID, isDeleted) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
                     Statement.RETURN_GENERATED_KEYS)){
            System.out.println(jucator.getNationaliate());
            ps.setString(1,jucator.getNume());
            ps.setString(2,jucator.getPrenume());
            ps.setString(3,jucator.getPozitie());
            ps.setInt(4,jucator.getNumar());
            ps.setDate(5,jucator.getDataNasterii());
            ps.setString(6,jucator.getNationaliate());
            ps.setDouble(7,jucator.getInaltime());
            ps.setString(8,jucator.getDescriere());
            ps.setBytes(9,jucator.getImagine());
            ps.setLong(10,jucator.getEchipaID());
            ps.setBoolean(11,jucator.isDeleted());

            int affectedRows = ps.executeUpdate();
            if (affectedRows == 0) {
                return "Creating jucator failed, no rows affected.";
            }
            else{
                return "Jucator added successfully";
            }
        }
    }

    public String deleteJucator(Long jucatorID) throws SQLException{
        try (Connection conn = DriverManager.getConnection(URL, USER, PASSWORD);
             PreparedStatement ps = conn.prepareStatement("DELETE FROM Jucatori WHERE JucatorID = ?")) {
            ps.setLong(1, jucatorID);

            int affectedRows = ps.executeUpdate();
            if (affectedRows == 0) {
                return "No jucator found with ID: "+jucatorID;
            }
            else{
                return "Jucator with ID " + jucatorID + " deleted successfully";
            }
        }
    }
    public String deleteJucatorEchipa(Long echipaID) throws SQLException{
        try (Connection conn = DriverManager.getConnection(URL, USER, PASSWORD);
             PreparedStatement ps = conn.prepareStatement("DELETE FROM Jucatori WHERE EchipaID = ?")) {
            ps.setLong(1, echipaID);

            int affectedRows = ps.executeUpdate();
            if (affectedRows == 0) {
                return "No jucator found with echipa ID: "+echipaID;
            }
            else{
                return "Jucator with echipa ID " + echipaID + " deleted successfully";
            }
        }
    }

    public String putJucator(Jucator jucator) throws SQLException{
        try (Connection conn = DriverManager.getConnection(URL, USER, PASSWORD);
             PreparedStatement ps = conn.prepareStatement("UPDATE Jucatori SET Nume = ?, Prenume = ?, Post = ?, Numar = ?, DataNasterii = ?, Nationalitate = ?, Inaltime = ?, Descriere = ?, imagine = ?, EchipaID = ?, isDeleted = ? " +
                     "WHERE JucatorID = ?")){

            ps.setString(1,jucator.getNume());
            ps.setString(2,jucator.getPrenume());
            ps.setString(3,jucator.getPozitie());
            ps.setInt(4,jucator.getNumar());
            ps.setDate(5,jucator.getDataNasterii());
            ps.setString(6,jucator.getNationaliate());
            ps.setDouble(7,jucator.getInaltime());
            ps.setString(8,jucator.getDescriere());
            ps.setBytes(9,jucator.getImagine());
            ps.setLong(10,jucator.getEchipaID());
            ps.setBoolean(11,jucator.isDeleted());
            ps.setLong(12,jucator.getJucatorID());

            int affectedRows = ps.executeUpdate();
            if (affectedRows == 0) {
                return "No jucator found with ID: "+jucator.getJucatorID();
            }
            else{
                return "Jucator with ID " + jucator.getJucatorID() + " updated successfully";
            }
        }
    }
}
