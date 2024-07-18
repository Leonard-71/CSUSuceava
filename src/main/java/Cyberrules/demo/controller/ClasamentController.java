package Cyberrules.demo.controller;

import Cyberrules.demo.model.EchipaClasament;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;

import java.io.IOException;
import java.util.ArrayList;

@RestController
@RequestMapping("api/clasament")
@CrossOrigin(methods = {RequestMethod.GET})
public class ClasamentController {

    @GetMapping
    public ResponseEntity<ArrayList<EchipaClasament>> getClasament() {
            ArrayList<EchipaClasament> clasament = new ArrayList<>();
            String url = "https://frh.ro/clasament.php?id=927";
            try {
                Document doc = Jsoup.connect(url).get();
                Element table = doc.select("table.table").first();
                if (table != null) {
                    Elements rows = table.select("tr");
                    for (Element row : rows) {
                        Elements columns = row.select("td");
                        if (columns.size() >= 15) {
                            int pos = Integer.parseInt(columns.get(0).text());
                            String numeEchipa = columns.get(1).text();
                            int meciuri = Integer.parseInt(columns.get(2).text());
                            int victorii = Integer.parseInt(columns.get(3).text());
                            int egaluri = Integer.parseInt(columns.get(4).text());
                            int infrangeri = Integer.parseInt(columns.get(5).text());
                            int goluriMarcate = Integer.parseInt(columns.get(6).text());
                            int goluriPrimite = Integer.parseInt(columns.get(7).text());
                            int diferentaGoluri = Integer.parseInt(columns.get(8).text());
                            int victoriiAcasa = Integer.parseInt(columns.get(9).text());
                            int egaluriAcasa = Integer.parseInt(columns.get(10).text());
                            int victoriiDeplasare = Integer.parseInt(columns.get(11).text());
                            int egaluriDeplasare = Integer.parseInt(columns.get(12).text());
                            int puncteAcasa = Integer.parseInt(columns.get(13).text());
                            int puncteDeplasare = Integer.parseInt(columns.get(14).text());
                            String puncteText = columns.get(15).text();
                            puncteText = puncteText.replace("*", "").trim();
                            int puncte = Integer.parseInt(puncteText);
                            EchipaClasament echipaClasament = new EchipaClasament(pos, numeEchipa, meciuri, victorii, egaluri, infrangeri,
                                    goluriMarcate, goluriPrimite, diferentaGoluri, victoriiAcasa, egaluriAcasa,
                                    victoriiDeplasare, egaluriDeplasare, puncteAcasa, puncteDeplasare, puncte);
                            clasament.add(echipaClasament);
                        }
                    }
                }
                return new ResponseEntity<>(clasament, HttpStatus.OK);
            } catch (IOException e) {
                e.printStackTrace();
                return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
            }
    }
}
