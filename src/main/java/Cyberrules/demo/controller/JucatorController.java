package Cyberrules.demo.controller;

import Cyberrules.demo.model.Jucator;
import Cyberrules.demo.service.JucatorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.sql.SQLException;
import java.text.ParseException;
import java.util.List;

@RestController
@RequestMapping("/api/jucator")
@CrossOrigin(methods = {RequestMethod.GET,RequestMethod.POST,RequestMethod.DELETE, RequestMethod.PUT})
public class JucatorController {
    private JucatorService jucatorService;
    @Autowired
    public JucatorController(JucatorService jucatorService){
        this.jucatorService = jucatorService;
    }
    @GetMapping
    public ResponseEntity<?> getJucatori() {
        try {
            List<Jucator> jucatori = jucatorService.getJucatori();
            if (jucatori.isEmpty()) {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            } else {
                return new ResponseEntity<>(jucatori, HttpStatus.OK);
            }
        } catch (SQLException e) {
            return new ResponseEntity<>(e.getMessage(),HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    @GetMapping("/{jucatorID}")
    public ResponseEntity<?> getJucator(@PathVariable Long jucatorID) {
        try {
            Jucator jucator = jucatorService.getJucator(jucatorID);
            return jucator != null ?
                    new ResponseEntity<>(jucator, HttpStatus.OK) :
                    new ResponseEntity<>(HttpStatus.NOT_FOUND);
        } catch (SQLException e) {
            return new ResponseEntity<>(e.getMessage(),HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    @GetMapping("/echipa/{echipaID}")
    public ResponseEntity<?> getJucatorEchipa(@PathVariable Long EchipaID) {
        try {
            List<Jucator> jucatori = jucatorService.getJucatoriEchipa(EchipaID);
            if (jucatori.isEmpty()) {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            } else {
                return new ResponseEntity<>(jucatori, HttpStatus.OK);
            }
        } catch (SQLException e) {
            return new ResponseEntity<>(e.getMessage(),HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/echipa/{numeEchipa}/editia/{editia}/categoria/{categoria}")
    public ResponseEntity<?> getJucatoriEchipaEditie(@PathVariable String numeEchipa, @PathVariable String editia, @PathVariable String categoria) {
        try {
            List<Jucator> jucatori = jucatorService.getJucatoriEchipaEditie(numeEchipa, editia, categoria);
            if (jucatori.isEmpty()) {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            } else {
                return new ResponseEntity<>(jucatori, HttpStatus.OK);
            }
        } catch (SQLException e) {
            return new ResponseEntity<>(e.getMessage(),HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/nume/{numeJucator}")
    public ResponseEntity<?> getJucatoriNume(@PathVariable String numeJucator) {
        try {
            List<Jucator> jucatori = jucatorService.getJucatoriNume(numeJucator);
            if (jucatori.isEmpty()) {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            } else {
                return new ResponseEntity<>(jucatori, HttpStatus.OK);
            }
        } catch (SQLException e) {
            return new ResponseEntity<>(e.getMessage(),HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/prenume/{prenumeJucator}")
    public ResponseEntity<?> getJucatoriPrenume(@PathVariable String prenumeJucator) {
        try {
            List<Jucator> jucatori = jucatorService.getJucatoriPrenume(prenumeJucator);
            if (jucatori.isEmpty()) {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            } else {
                return new ResponseEntity<>(jucatori, HttpStatus.OK);
            }
        } catch (SQLException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping
    public ResponseEntity<String> postJucator(@RequestBody Jucator jucator) {
        try {
            String result = jucatorService.addJucator(jucator);
            if(result.equals("Jucator added successfully"))
                return new ResponseEntity<>(result, HttpStatus.CREATED);
        } catch (SQLException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return new ResponseEntity<>("Creating jucator failed, no rows affected.", HttpStatus.BAD_REQUEST);
    }

    @DeleteMapping("/{jucatorID}")
    public ResponseEntity<String> deleteJucator(@PathVariable Long jucatorID) {
        try {
            String result = jucatorService.deleteJucator(jucatorID);
            String deleted_message = "Jucator with ID " + jucatorID + " deleted successfully";
            if(result.equals(deleted_message))
                return new ResponseEntity<>(result, HttpStatus.NO_CONTENT);
        } catch (SQLException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return new ResponseEntity<>("No jucator found with ID: "+jucatorID, HttpStatus.NOT_FOUND);
    }

    @DeleteMapping("/echipa/{echipaID}")
    public ResponseEntity<String> deleteJucatorEchipa(@PathVariable Long echipaID) {
        try {
            String result = jucatorService.deleteJucatorEchipa(echipaID);
            String deleted_message = "Jucator with echipa ID " + echipaID + " deleted successfully";
            if(result.equals(deleted_message))
                return new ResponseEntity<>(result, HttpStatus.NO_CONTENT);
        } catch (SQLException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return new ResponseEntity<>("No jucator found with echipa ID: "+echipaID, HttpStatus.NOT_FOUND);
    }

    @PutMapping("/{jucatorID}")
    public ResponseEntity<String> putJucator(@RequestBody Jucator jucator) {
        try {
            String result = jucatorService.putJucator(jucator);
            String update_message = "Jucator with ID " + jucator.getJucatorID() + " updated successfully";
            if(result.equals(update_message))
                return new ResponseEntity<>(result, HttpStatus.OK);
        } catch (SQLException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return new ResponseEntity<>("No jucator found with ID: "+jucator.getJucatorID(), HttpStatus.NOT_FOUND);
    }
}
