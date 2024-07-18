package Cyberrules.demo.service;
import Cyberrules.demo.model.Stire;
import org.springframework.stereotype.Service;
import java.sql.*;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.List;
@Service
public class StireService {
    private static final String URL = "jdbc:postgresql://localhost:5432/cyberrules";
    private static final String USER = "postgres";
    private static final String PASSWORD = "cyberrules";
    public List<Stire> getStire() {
        List<Stire> stiri = new ArrayList<>();
        try (Connection conn = DriverManager.getConnection(URL, USER, PASSWORD);
             Statement st = conn.createStatement();
             ResultSet rs = st.executeQuery("SELECT * FROM Stiri")) {

            while (rs.next()) {
                Stire stire = new Stire(
                        rs.getLong("stireID"),
                        rs.getTimestamp("datapublicarii"),
                        rs.getString("titlu"),
                        rs.getString("continut"),
                        rs.getString("username"),
                        rs.getBoolean("isinfuture"),
                        rs.getBoolean("isDeleted"),
                        rs.getBytes("imagine1"),
                        rs.getBytes("imagine2"),
                        rs.getBytes("imagine3"),
                        rs.getBytes("video")
                );

                stiri.add(stire);
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return stiri;
    }
    public String addStire(Stire stire)
    {
        try (Connection conn = DriverManager.getConnection(URL, USER, PASSWORD);
             PreparedStatement ps = conn.prepareStatement(
                     "INSERT INTO stiri(datapublicarii, titlu, continut, username, isinfuture, isdeleted, imagine1, imagine2, imagine3, video) VALUES ( ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
            Statement.RETURN_GENERATED_KEYS)) {
            ps.setTimestamp(1, stire.getDatapublicarii());
            ps.setString(2, stire.getTitlu());
            ps.setString(3, stire.getContinut());
            ps.setString(4, stire.getUserName());
            ps.setBoolean(5, stire.isIsinfuture());
            ps.setBoolean(6, stire.isDeleted());
            ps.setBytes(7, stire.getImagine1());
            ps.setBytes(8, stire.getImagine2());
            ps.setBytes(9, stire.getImagine3());
            ps.setBytes(10,stire.getVideo());

            int affectedRows = ps.executeUpdate();

            if (affectedRows == 0) {
                return "Creating stire failed, no rows affected.";
            }
            else{
                return "Stire added successfully";
            }

        } catch (SQLException e) {
            return "Failed to add stire - " + e.getMessage();
        }
    }
    public String deleteStire(Long stireID) {
        try (Connection conn = DriverManager.getConnection(URL, USER, PASSWORD);
             PreparedStatement ps = conn.prepareStatement("DELETE FROM Stiri WHERE stireId = ?")) {

            ps.setLong(1, stireID);

            int affectedRows = ps.executeUpdate();

            if (affectedRows == 0) {
                return "No stire found with ID: "+stireID;
            }
            else{
                return "Stire with ID " + stireID + " deleted successfully";
            }

        } catch (SQLException e) {
            return "Failed to delete stire - " + e.getMessage();
        }
    }
    public Stire getStire(Long stireID) {
        try (Connection conn = DriverManager.getConnection(URL, USER, PASSWORD);
             PreparedStatement ps = conn.prepareStatement("SELECT * FROM Stiri WHERE stireID = ?")) {
            ps.setLong(1, stireID);
            ResultSet rs = ps.executeQuery();
            while (rs.next()) {
                Stire stire = new Stire(
                        rs.getLong("stireID"),
                        rs.getTimestamp("datapublicarii"),
                        rs.getString("titlu"),
                        rs.getString("continut"),
                        rs.getString("username"),
                        rs.getBoolean("isinfuture"),
                        rs.getBoolean("isDeleted"),
                        rs.getBytes("imagine1"),
                        rs.getBytes("imagine2"),
                        rs.getBytes("imagine3"),
                        rs.getBytes("video")
                );
                return stire;
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return null;
    }


    public String updateStire(Long stireID, Stire stire) {
        try (Connection conn = DriverManager.getConnection(URL, USER, PASSWORD)) {

            String updateQuery = "UPDATE stiri\n" +
                    "\tSET  datapublicarii=?, titlu=?, continut=?, username=?, isinfuture=?, isdeleted=?, imagine1=?, imagine2=?, imagine3=?, video=?\n" +
                    "\tWHERE stireid=?";

            try (PreparedStatement ps = conn.prepareStatement(updateQuery)) {
                ps.setTimestamp(1, stire.getDatapublicarii());
                ps.setString(2, stire.getTitlu());
                ps.setString(3, stire.getContinut());
                ps.setString(4, stire.getUserName());
                ps.setBoolean(5, stire.isIsinfuture());
                ps.setBoolean(6,stire.isDeleted());
                ps.setBytes(7, stire.getImagine1());
                ps.setBytes(8, stire.getImagine2());
                ps.setBytes(9, stire.getImagine3());
                ps.setBytes(10, stire.getVideo());
                ps.setLong(11, stireID);

                int affectedRows = ps.executeUpdate();

                if (affectedRows == 0) {
                    return "No stire found with ID: " + stireID;
                } else {
                    return "Stire with ID " + stireID + " updated successfully";
                }
            }
        } catch (SQLException e) {
            return "Failed to update stire - " + e.getMessage();
        }
    }

}
