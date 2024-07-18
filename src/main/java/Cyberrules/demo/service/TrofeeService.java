package Cyberrules.demo.service;
import Cyberrules.demo.model.Trofee;
import jakarta.persistence.criteria.CriteriaBuilder;
import org.springframework.stereotype.Service;
import java.sql.*;
import java.util.ArrayList;
import java.util.List;

@Service
public class TrofeeService {

    private static final String URL = "jdbc:postgresql://localhost:5432/cyberrules";
    private static final String USER = "postgres";
    private static final String PASSWORD = "cyberrules";

    public List<Trofee> getTrofee() {
        List<Trofee> trofee = new ArrayList<>();
        try (Connection conn = DriverManager.getConnection(URL, USER, PASSWORD);
             Statement st = conn.createStatement();
             ResultSet rs = st.executeQuery("SELECT * FROM trofee")) {

            while (rs.next()) {
                Trofee trofeu = new Trofee(
                        rs.getLong("trofeeid"),
                        rs.getString("nume"),
                        rs.getInt("an"),
                        rs.getLong("echipaid"),
                        rs.getBytes("imagine")
                );
                trofee.add(trofeu);
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return trofee;
    }
    public String addTrofeu(Trofee trofeu)
    {
        try (Connection conn = DriverManager.getConnection(URL, USER, PASSWORD);
             PreparedStatement ps = conn.prepareStatement(
                     "INSERT INTO trofee(nume, an, echipaid, imagine) VALUES (?, ?, ?, ?)",
                     Statement.RETURN_GENERATED_KEYS)) {

            ps.setString(1,trofeu.getNume());
            ps.setInt(2,trofeu.getAn());
            ps.setLong(3,trofeu.getEchipaid());
            ps.setBytes(4, trofeu.getImagine());

            int affectedRows = ps.executeUpdate();

            if (affectedRows == 0) {
                return "Creating trofeu failed, no rows affected.";
            }
            else{
                return "Trofeu added successfully";
            }

        } catch (SQLException e) {
            return "Failed to add trofeu - " + e.getMessage();
        }
    }
    public Trofee getTrofeu(Long trofeuID) {
        try (Connection conn = DriverManager.getConnection(URL, USER, PASSWORD);
             PreparedStatement ps = conn.prepareStatement("SELECT * FROM trofee WHERE trofeeid = ?")) {
            ps.setLong(1, trofeuID);
            ResultSet rs = ps.executeQuery();
            while (rs.next()) {
                    Trofee trofeu = new Trofee(
                            rs.getLong("trofeeid"),
                            rs.getString("nume"),
                            rs.getInt("an"),
                            rs.getLong("echipaid"),
                            rs.getBytes("imagine")
                    );
                   return trofeu;
                }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return null;
    }
    public List<Trofee> getTrofeuEchipa(Long echipaid) {
        List<Trofee> trofee = new ArrayList<>();
        try (Connection conn = DriverManager.getConnection(URL, USER, PASSWORD);
             PreparedStatement ps = conn.prepareStatement("SELECT * FROM trofee WHERE echipaid = ?")) {
            ps.setLong(1,echipaid);
            ResultSet rs = ps.executeQuery();
            while (rs.next()) {
                Trofee trofeu = new Trofee(
                        rs.getLong("trofeeid"),
                        rs.getString("nume"),
                        rs.getInt("an"),
                        rs.getLong("echipaid"),
                        rs.getBytes("imagine")
                );
                trofee.add(trofeu);
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return trofee;
    }

    public List<Trofee> getTrofeuAn(Integer an) {
        List<Trofee> trofee = new ArrayList<>();
        try (Connection conn = DriverManager.getConnection(URL, USER, PASSWORD);
             PreparedStatement ps = conn.prepareStatement("SELECT * FROM trofee WHERE an = ?")) {
            ps.setInt(1,an);
            ResultSet rs = ps.executeQuery();
            while (rs.next()) {
                Trofee trofeu = new Trofee(
                        rs.getLong("trofeeid"),
                        rs.getString("nume"),
                        rs.getInt("an"),
                        rs.getLong("echipaid"),
                        rs.getBytes("imagine")
                );

               trofee.add(trofeu);
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return trofee;
    }
    public List<Trofee> getTrofeuNume(String nume) {
        List<Trofee> trofee = new ArrayList<>();
        try (Connection conn = DriverManager.getConnection(URL, USER, PASSWORD);
             PreparedStatement ps = conn.prepareStatement("SELECT * FROM trofee WHERE nume = ?")) {
            ps.setString(1,nume);
            ResultSet rs = ps.executeQuery();
            while (rs.next()) {
                Trofee trofeu = new Trofee(
                        rs.getLong("trofeeid"),
                        rs.getString("nume"),
                        rs.getInt("an"),
                        rs.getLong("echipaid"),
                        rs.getBytes("imagine")
                );

                trofee.add(trofeu);
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return trofee;
    }

    public String deleteTrofeu(Long trofeeid) {
        try (Connection conn = DriverManager.getConnection(URL, USER, PASSWORD);
             PreparedStatement ps = conn.prepareStatement("DELETE FROM trofee WHERE trofeeid = ?")) {

            ps.setLong(1, trofeeid);

            int affectedRows = ps.executeUpdate();

            if (affectedRows == 0) {
                return "No trofeu found with ID: "+trofeeid;
            }
            else{
                return "Trofeu with ID " + trofeeid + " deleted successfully";
            }

        } catch (SQLException e) {
            return "Failed to delete trofeu - " + e.getMessage();
        }
    }

    public String updateTrofeu(Long trofeeid, Trofee trofeu) {
        try (Connection conn = DriverManager.getConnection(URL, USER, PASSWORD)) {

            String updateQuery = "UPDATE trofee\n" +
                    "\tSET nume=?,an=?, echipaid=?, imagine=?\n" +
                    "\t WHERE trofeeid=?";

            try (PreparedStatement ps = conn.prepareStatement(updateQuery)) {


                ps.setString(1, trofeu.getNume());
                ps.setInt(2, trofeu.getAn());
                ps.setLong(3,trofeu.getEchipaid());
                ps.setBytes(4,trofeu.getImagine());
                ps.setLong(5, trofeeid);

                int affectedRows = ps.executeUpdate();

                if (affectedRows == 0) {
                    return "No trofeu found with ID: " + trofeeid;
                } else {
                    return "Trofeu with ID " + trofeeid + " updated successfully";
                }
            }
        } catch (SQLException e) {
            return "Failed to update trofeu - " + e.getMessage();
        }
    }

}
