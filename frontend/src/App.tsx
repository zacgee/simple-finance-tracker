import { useEffect, useState } from "react";

type HealthResponse = {
  status: string;
};

type Transaction = {
  id: string;
  type: string;
  amount: number;
  date: string;
};

function App() {
  // State to hold transactions
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [editingTransaction, setEditingTransaction] = useState<Transaction | null>(null);

  const fetchTransactions = () => {
    fetch("http://localhost:4000/transactions")
      .then((res) => res.json())
      .then((data) => {
        setTransactions(data);
      });
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  // Handle form submission to add a new transaction
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    const type = formData.get("type") as string;
    const amount = Number(formData.get("amount"));
    const date = formData.get("date") as string;

    try {
      fetch("http://localhost:4000/transactions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: Math.random().toString(36).substr(2, 9),
          type,
          amount,
          date,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          form.reset();
          fetchTransactions();
        }); 
      } catch (error) {
        console.error("Error adding transaction:", error);
      }
  }

  // Handle deleting a transaction
  const handleDelete = (id: string) => {
    fetch(`http://localhost:4000/transactions/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then(() => {
        fetchTransactions();
      })
      .catch((error) => console.error("Error deleting transaction:", error));
  }

  // Group transactions by date
  const groupedTransactions = transactions.reduce((acc, tx) => {
    if (!acc[tx.date]) {
      acc[tx.date] = [];
    }
    acc[tx.date].push(tx);
    return acc;
  }, {} as Record<string, Transaction[]>);

  const sortedDates = Object.keys(groupedTransactions).sort().reverse();

  // Handle updating a transaction
  const handleUpdate = (id: string, updatedData: Partial<Transaction>) => {
    fetch(`http://localhost:4000/transactions/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedData),
    })
      .then((res) => res.json())
      .then(() => {
        fetchTransactions();
        setEditingTransaction(null);
      })
      .catch((error) => console.error("Error updating transaction:", error));
  }

  const handleSaveEdit = () => {
    if (editingTransaction) {
      handleUpdate(editingTransaction.id, {
        type: editingTransaction.type,
        amount: editingTransaction.amount,
        date: editingTransaction.date,
      });
    }
  }

  return (
    <div>
      <h1>Finance Tracker</h1>
      <form onSubmit={handleSubmit}>
        <h2>Add Transaction</h2>
        <label>
          Type:
          <input type="text" name="type" placeholder="e.g., Groceries, Gas, Salary" required />
        </label>
        <label>   
          Amount:
          <input type="number" name="amount" placeholder="0.00" step="0.01" required />
        </label>
        <label>
          Date:
          <input type="date" name="date" required />
        </label>
        <button type="submit">Add Transaction</button>
      </form>
      <h2>Transactions</h2>
      {sortedDates.length === 0 ? (
        <p className="no-transactions">No transactions yet</p>
      ) : (
        <div className="transactions-container">
          {sortedDates.map((date) => (
            <div key={date} className="day-group">
              <h3 className="day-header">{new Date(date + "T00:00:00").toLocaleDateString("en-US", { weekday: "long", month: "short", day: "numeric" })}</h3>
              <table className="transactions-table">
                <tbody>
                  {groupedTransactions[date].map((tx) => (
                    <tr key={tx.id} className="transaction-row">
                      <td className="type-cell">{tx.type}</td>
                      <td className="amount-cell">${tx.amount.toFixed(2)}</td>
                      <td className="action-cell">
                        <button type="button" className="delete-btn" onClick={() => handleDelete(tx.id)}>Delete</button>
                        <button type="button" className="edit-btn" onClick={() => setEditingTransaction(tx)}>Edit</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ))}
        </div>
      )}
      {editingTransaction && (
        <div className="modal-overlay">
          <div className="modal-card">
            <h2>Edit Transaction</h2>
            <div className="modal-content">
              <div className="modal-field">
                <label>Category:</label>
                <input 
                  type="text" 
                  value={editingTransaction.type}
                  onChange={(e) => setEditingTransaction({ ...editingTransaction, type: e.target.value })}
                />
              </div>
              <div className="modal-field">
                <label>Cost:</label>
                <input 
                  type="number" 
                  step="0.01"
                  value={editingTransaction.amount}
                  onChange={(e) => setEditingTransaction({ ...editingTransaction, amount: parseFloat(e.target.value) })}
                />
              </div>
              <div className="modal-field">
                <label>Date:</label>
                <input 
                  type="date"
                  value={editingTransaction.date}
                  onChange={(e) => setEditingTransaction({ ...editingTransaction, date: e.target.value })}
                />
              </div>
            </div>
            <div className="modal-actions">
              <button className="save-btn" onClick={handleSaveEdit}>Save Changes</button>
              <button className="exit-btn" onClick={() => setEditingTransaction(null)}>Exit</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
