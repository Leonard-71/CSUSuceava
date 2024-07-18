package Cyberrules.demo.controller;
import Cyberrules.demo.model.Meci;
import Cyberrules.demo.service.MeciuriService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.scheduling.concurrent.ThreadPoolTaskScheduler;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/meci")
@CrossOrigin(methods = {RequestMethod.GET,RequestMethod.POST,RequestMethod.DELETE})

public class MeciController {
    private MeciuriService meciService;
    @Autowired
    public MeciController(MeciuriService meciService){
        this.meciService = meciService;
    }

    @GetMapping
    public List<Meci> getMeciuri()
    {
        return meciService.getMeciuri();
    }

    @PostMapping
    public String postMeci(@RequestBody Meci meci)
    {
        return meciService.addMeci(meci);
    }

    @DeleteMapping("/{meciID}")
    public String deleteMeci(@PathVariable Long meciID)
    {
        return meciService.deleteMeci(meciID);
    }

    @GetMapping("/{meciID}")
    public Meci getMeci(@PathVariable Long meciID){
        return meciService.getMeci(meciID);
    }

    @GetMapping("editia/{editie}")
    public List<Meci> getMeciEditie(@PathVariable String editie){
        return meciService.getMeciEditie(editie);
    }

    @GetMapping("tip/{tipcampionat}")
    public List<Meci> getMeciTipCampionat(@PathVariable String tipcampionat){
        return meciService.getMeciTipCampionat(tipcampionat);
    }
    @PutMapping("/{meciID}")
    public String updateMeci(@PathVariable Long meciID,@RequestBody Meci meci){
        return meciService.updateMeci(meciID,meci);
    }
    @GetMapping("/ultimulmeci")
    public ResponseEntity<Meci> getLastMeciPlayed(){
        Meci lastMeci = meciService.getLastMeciPlayed();
        if(lastMeci != null)
        {
            return new ResponseEntity<>(lastMeci, HttpStatus.OK);
        } else{
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
    @GetMapping("/mecicurent")
    public ResponseEntity<Meci> getCurrentMatch(){
        Meci currentMeci = meciService.getCurrentMatch();
        if(currentMeci != null)
        {
            return new ResponseEntity<>(currentMeci, HttpStatus.OK);
        } else{
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
    @GetMapping("/meciviitor")
    public ResponseEntity<Meci> getNextMatch(){
        Meci nextMeci = meciService.getNextMatch();
        if(nextMeci != null)
        {
            return new ResponseEntity<>(nextMeci, HttpStatus.OK);
        } else{
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}
