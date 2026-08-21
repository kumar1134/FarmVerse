package edu.infosys.farmVerseApplication.dao;
import java.util.List;
import edu.infosys.farmVerseApplication.bean.AgroExpense;

public interface AgroExpenseDao {

	    public void addAgroExpense(AgroExpense agroExpense);

	    public List<AgroExpense> getAllAgroExpenses();

	    public Integer getMaxExpenseId();

	    public void deleteAgroExpenseById(Integer expenseId);

	    public AgroExpense getAgroExpenseById(Integer expenseId);

	}
	
	


