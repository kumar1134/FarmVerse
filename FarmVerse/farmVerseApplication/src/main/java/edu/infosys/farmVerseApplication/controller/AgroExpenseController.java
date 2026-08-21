package edu.infosys.farmVerseApplication.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import edu.infosys.farmVerseApplication.bean.AgroExpense;
import edu.infosys.farmVerseApplication.dao.AgroExpenseDao;
import edu.infosys.farmVerseApplication.service.AgroExpenseService;

@RestController
@RequestMapping("/farmverse/")
@CrossOrigin(origins = "http://localhost:3636", allowCredentials = "true")
public class AgroExpenseController {

    @Autowired
    private AgroExpenseDao agroExpenseDao;

    @Autowired
    private AgroExpenseService service;

    @PostMapping("/exp")
    public void addAgroExpense(@RequestBody AgroExpense agroExpense) {
        agroExpense.setExpenseId(service.generateExpenseId());
        agroExpenseDao.addAgroExpense(agroExpense);
    }

    @PutMapping("/exp")
    public void updateAgroExpense(@RequestBody AgroExpense agroExpense) {
        agroExpenseDao.addAgroExpense(agroExpense);
    }

    @GetMapping("/exp/{id}")
    public AgroExpense getAgroExpenseById(@PathVariable Integer id) {
        return agroExpenseDao.getAgroExpenseById(id);
    }

    @GetMapping("/agroexpense")
    public List<AgroExpense> getAllAgroExpenses() {
        return agroExpenseDao.getAllAgroExpenses();
    }

    @DeleteMapping("/exp/{id}")
    public void deleteAgroExpenseById(@PathVariable Integer id) {
        agroExpenseDao.deleteAgroExpenseById(id);
    }

    @GetMapping("/exp-id")
    public Integer generateExpenseId() {
        return service.generateExpenseId();
    }
}