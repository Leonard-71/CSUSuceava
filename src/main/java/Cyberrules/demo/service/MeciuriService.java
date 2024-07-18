package Cyberrules.demo.service;
import java.sql.*;
import java.util.ArrayList;
import java.util.List;
import Cyberrules.demo.model.Meci;
import org.springframework.stereotype.Service;

@Service
public class MeciuriService {
    private static final String URL = "jdbc:postgresql://localhost:5432/cyberrules";
    private static final String USER = "postgres";
    private static final String PASSWORD = "cyberrules";
    public List<Meci> getMeciuri() {
        List<Meci> meciuri = new ArrayList<>();
        try (Connection conn = DriverManager.getConnection(URL, USER, PASSWORD);
             Statement st = conn.createStatement();
             ResultSet rs = st.executeQuery("SELECT * FROM Meciuri")) {

            while (rs.next()) {
                Meci meci = new Meci(
                        rs.getLong("meciid"),
                        rs.getTimestamp("datameci"),
                        rs.getLong("echipaid"),
                        rs.getLong("adversarid"),
                        rs.getString("locatie"),
                        rs.getInt("scorechipa"),
                        rs.getInt("scoradversar"),
                        rs.getString("Editia"),
                        rs.getString("TipCampionat"),
                        rs.getString("LinkMeci"),
                        rs.getBoolean("isDeleted"),
                        rs.getBoolean("isFinished")
                );

                meciuri.add(meci);
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return meciuri;
    }
    public String addMeci(Meci meci)
    {
        try (Connection conn = DriverManager.getConnection(URL, USER, PASSWORD);
             PreparedStatement ps = conn.prepareStatement(
                     "INSERT INTO Meciuri( datameci, echipaid, adversarid, locatie, scorechipa, scoradversar, editia, tipcampionat, linkmeci, isdeleted, isfinished) VALUES ( ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
                     Statement.RETURN_GENERATED_KEYS)) {
            java.util.Date dataUtil = meci.getDatameci();
            java.sql.Timestamp dataSql = new java.sql.Timestamp(dataUtil.getTime());
            ps.setTimestamp(1, dataSql);
            ps.setLong(2, meci.getEchipaid());
            ps.setLong(3, meci.getAdversarid());
            ps.setString(4, meci.getLocatie());
            ps.setInt(5, meci.getScorechipa());
            ps.setInt(6, meci.getScoradversar());
            ps.setString(7, meci.getEditia());
            ps.setString(8, meci.getTipcampionat());
            ps.setString(9, meci.getLinkmeci());
            ps.setBoolean(10, meci.isDeleted());
            ps.setBoolean(11, meci.isFinished());

            int affectedRows = ps.executeUpdate();

            if (affectedRows == 0) {
                return "Creating meci failed, no rows affected.";
            }
            else{
                return "Meci added successfully";
            }

        } catch (SQLException e) {
            return "Failed to add meci - " + e.getMessage();
        }
    }

    public String deleteMeci(Long meciID) {
        try (Connection conn = DriverManager.getConnection(URL, USER, PASSWORD);
             PreparedStatement ps = conn.prepareStatement("DELETE FROM Meciuri WHERE meciId = ?")) {

            ps.setLong(1, meciID);


            int affectedRows = ps.executeUpdate();

            if (affectedRows == 0) {
                return "No meci found with ID: "+meciID;
            }
            else{
                return "Meci with ID " + meciID + " deleted successfully";
            }

        } catch (SQLException e) {
            return "Failed to delete meci - " + e.getMessage();
        }
    }
    public Meci getMeci(Long meciID) {
        try (Connection conn = DriverManager.getConnection(URL, USER, PASSWORD);
             PreparedStatement ps = conn.prepareStatement("SELECT * FROM Meciuri WHERE meciID = ?")) {
            ps.setLong(1, meciID);
            ResultSet rs = ps.executeQuery();
            while (rs.next()) {
                Meci meci = new Meci(
                rs.getLong("meciid"),
                        rs.getTimestamp("datameci"),
                        rs.getLong("echipaid"),
                        rs.getLong("adversarid"),
                        rs.getString("locatie"),
                        rs.getInt("scorechipa"),
                        rs.getInt("scoradversar"),
                        rs.getString("Editia"),
                        rs.getString("TipCampionat"),
                        rs.getString("LinkMeci"),
                        rs.getBoolean("isDeleted"),
                        rs.getBoolean("isFinished")
                         );
                return meci;
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return null;
    }
    public List<Meci> getMeciEditie(String editie) {
        List<Meci> meciuri  = new ArrayList<>();
        try (Connection conn = DriverManager.getConnection(URL, USER, PASSWORD);
             PreparedStatement ps = conn.prepareStatement("SELECT * FROM Meciuri WHERE editia = ?")) {
            ps.setString(1, editie);
            ResultSet rs = ps.executeQuery();
            while (rs.next()) {
                Meci meci = new Meci(
                        rs.getLong("meciid"),
                        rs.getTimestamp("datameci"),
                        rs.getLong("echipaid"),
                        rs.getLong("adversarid"),
                        rs.getString("locatie"),
                        rs.getInt("scorechipa"),
                        rs.getInt("scoradversar"),
                        rs.getString("Editia"),
                        rs.getString("TipCampionat"),
                        rs.getString("LinkMeci"),
                        rs.getBoolean("isDeleted"),
                        rs.getBoolean("isFinished")
                );
                meciuri.add(meci);
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return meciuri;
    }
    public List<Meci> getMeciTipCampionat(String tipcampionat) {
        List<Meci> meciuri  = new ArrayList<>();
        try (Connection conn = DriverManager.getConnection(URL, USER, PASSWORD);
             PreparedStatement ps = conn.prepareStatement("SELECT * FROM Meciuri WHERE tipcampionat = ?")) {
            ps.setString(1, tipcampionat);
            ResultSet rs = ps.executeQuery();
            while (rs.next()) {
                Meci meci = new Meci(
                        rs.getLong("meciid"),
                        rs.getTimestamp("datameci"),
                        rs.getLong("echipaid"),
                        rs.getLong("adversarid"),
                        rs.getString("locatie"),
                        rs.getInt("scorechipa"),
                        rs.getInt("scoradversar"),
                        rs.getString("Editia"),
                        rs.getString("TipCampionat"),
                        rs.getString("LinkMeci"),
                        rs.getBoolean("isDeleted"),
                        rs.getBoolean("isFinished")
                );
                meciuri.add(meci);
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return meciuri;
    }
    public String updateMeci(Long meciID, Meci meci) {
        try (Connection conn = DriverManager.getConnection(URL, USER, PASSWORD)) {

            String updateQuery = "UPDATE meciuri SET datameci=?, echipaid=?, adversarid=?, locatie=?, scorechipa=?, scoradversar=?, editia=?, tipcampionat=?, linkmeci=?, isdeleted=?,isfinished=? WHERE meciid=?";

            try (PreparedStatement ps = conn.prepareStatement(updateQuery)) {

                ps.setTimestamp(1, new java.sql.Timestamp(meci.getDatameci().getTime()));
                ps.setLong(2, meci.getEchipaid());
                ps.setLong(3, meci.getAdversarid());
                ps.setString(4, meci.getLocatie());
                ps.setInt(5, meci.getScorechipa());
                ps.setInt(6, meci.getScoradversar());
                ps.setString(7, meci.getEditia());
                ps.setString(8, meci.getTipcampionat());
                ps.setString(9, meci.getLinkmeci());
                ps.setBoolean(10, meci.isDeleted());
                ps.setBoolean(11,meci.isFinished());
                ps.setLong(12, meciID);

                int affectedRows = ps.executeUpdate();

                if (affectedRows == 0) {
                    return "No meci found with ID: " + meciID;
                } else {
                    return "Meci with ID " + meciID + " updated successfully";
                }
            }
        } catch (SQLException e) {
            return "Failed to update meci - " + e.getMessage();
        }
    }

    public Meci getLastMeciPlayed() {
        try (Connection conn = DriverManager.getConnection(URL, USER, PASSWORD);
             PreparedStatement ps = conn.prepareStatement("SELECT * FROM meciuri WHERE datameci <= CURRENT_DATE AND isfinished = true ORDER BY datameci DESC LIMIT 1;")) {
            ResultSet rs = ps.executeQuery();
            while (rs.next()) {
                Meci meci = new Meci(
                        rs.getLong("meciid"),
                        rs.getTimestamp("datameci"),
                        rs.getLong("echipaid"),
                        rs.getLong("adversarid"),
                        rs.getString("locatie"),
                        rs.getInt("scorechipa"),
                        rs.getInt("scoradversar"),
                        rs.getString("Editia"),
                        rs.getString("TipCampionat"),
                        rs.getString("LinkMeci"),
                        rs.getBoolean("isDeleted"),
                        rs.getBoolean("isFinished")
                );
                return meci;
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return null;
    }

    public Meci getCurrentMatch() {
        try (Connection conn = DriverManager.getConnection(URL, USER, PASSWORD);
             PreparedStatement ps = conn.prepareStatement("SELECT * FROM meciuri " +
                     "WHERE DATE(datameci) = CURRENT_DATE " +
                     "AND (" +
                     "  (EXTRACT(HOUR FROM datameci) * 3600 + EXTRACT(MINUTE FROM datameci) * 60 + EXTRACT(SECOND FROM datameci) < " +
                     "  EXTRACT(HOUR FROM CURRENT_TIMESTAMP AT TIME ZONE 'EET') * 3600 + EXTRACT(MINUTE FROM CURRENT_TIMESTAMP AT TIME ZONE 'EET') * 60 + EXTRACT(SECOND FROM CURRENT_TIMESTAMP AT TIME ZONE 'EET')) " +
                     "  AND " +
                     "  isfinished = false " +
                     ") " +
                     "ORDER BY datameci ASC " +
                     "LIMIT 1;")) {
            ResultSet rs = ps.executeQuery();
            while (rs.next()) {
                Meci meci = new Meci(
                        rs.getLong("meciid"),
                        rs.getTimestamp("datameci"),
                        rs.getLong("echipaid"),
                        rs.getLong("adversarid"),
                        rs.getString("locatie"),
                        rs.getInt("scorechipa"),
                        rs.getInt("scoradversar"),
                        rs.getString("Editia"),
                        rs.getString("TipCampionat"),
                        rs.getString("LinkMeci"),
                        rs.getBoolean("isDeleted"),
                        rs.getBoolean("isFinished")
                );
                return meci;
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return null;
    }

    public Meci getNextMatch() {
        try (Connection conn = DriverManager.getConnection(URL, USER, PASSWORD);
             PreparedStatement ps = conn.prepareStatement("SELECT * FROM meciuri " +
                     "WHERE datameci > CURRENT_TIMESTAMP " +
                     "AND isfinished = false " +
                     "ORDER BY datameci ASC " +
                     "LIMIT 1;")) {
            ResultSet rs = ps.executeQuery();
            while (rs.next()) {
                Meci meci = new Meci(
                        rs.getLong("meciid"),
                        rs.getTimestamp("datameci"),
                        rs.getLong("echipaid"),
                        rs.getLong("adversarid"),
                        rs.getString("locatie"),
                        rs.getInt("scorechipa"),
                        rs.getInt("scoradversar"),
                        rs.getString("Editia"),
                        rs.getString("TipCampionat"),
                        rs.getString("LinkMeci"),
                        rs.getBoolean("isDeleted"),
                        rs.getBoolean("isFinished")
                );
                return meci;
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return null;
    }
}
