package Cyberrules.demo.controller;
import Cyberrules.demo.model.Trofee;
import Cyberrules.demo.service.TrofeeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/trofee")
@CrossOrigin(methods = {RequestMethod.GET,RequestMethod.POST,RequestMethod.DELETE})

public class TrofeeController {
    private TrofeeService trofeeService;
    @Autowired
    public TrofeeController(TrofeeService trofeeService){
        this.trofeeService = trofeeService;
    }

    @GetMapping
    public List<Trofee> getTrofee()
    {
        return trofeeService.getTrofee();
    }

    @PostMapping
    public String postTrofeu(@RequestBody Trofee trofeu)
    {
        return trofeeService.addTrofeu(trofeu);
    }

    @DeleteMapping("/{trofeeid}")
    public String deleteTrofeu(@PathVariable Long trofeuid)
    {
        return trofeeService.deleteTrofeu(trofeuid);
    }

    @GetMapping("/{trofeeid}")
    public Trofee getTrofee(@PathVariable Long trofeuID){
        return trofeeService.getTrofeu(trofeuID);
    }

    @GetMapping("/an/{an}")
    public List<Trofee> getTrofeeAn(@PathVariable Integer an){
        return trofeeService.getTrofeuAn(an);
    }
    @GetMapping("/echipaid/{echipaid}")
    public List<Trofee> getTrofeeEchipa(@PathVariable Long echipaid){
        return trofeeService.getTrofeuEchipa(echipaid);
    }

    @GetMapping("/nume/{nume}")
    public List<Trofee> getTrofeeNume(@PathVariable String nume){
        return trofeeService.getTrofeuNume(nume);
    }
    @PutMapping("/{trofeeid}")
    public String updateTrofeu(@PathVariable Long trofeeid,@RequestBody Trofee trofeu){
        return trofeeService.updateTrofeu(trofeeid,trofeu);
    }

}
