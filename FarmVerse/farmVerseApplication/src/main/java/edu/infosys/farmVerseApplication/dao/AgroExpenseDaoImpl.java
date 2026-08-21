package edu.infosys.farmVerseApplication.dao;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import edu.infosys.farmVerseApplication.bean.AgroExpense;

@Repository
public class AgroExpenseDaoImpl implements AgroExpenseDao {

    @Autowired
    private AgroExpenseRepository repository;

    @Override
    public void addAgroExpense(AgroExpense agroExpense) {
        repository.save(agroExpense);
    }

    @Override
    public List<AgroExpense> getAllAgroExpenses() {
        return repository.findAll();
    }

    @Override
    public Integer getMaxExpenseId() {
        return repository.getMaxExpenseId();
    }

    @Override
    public void deleteAgroExpenseById(Integer expenseId) {
        repository.deleteById(expenseId);
    }

    @Override
    public AgroExpense getAgroExpenseById(Integer expenseId) {
        return repository.findById(expenseId).orElse(null);
    }
}