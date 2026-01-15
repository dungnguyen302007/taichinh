import { createContext, useContext, useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, addDoc, deleteDoc, doc, onSnapshot, query, orderBy, updateDoc } from 'firebase/firestore';

const FinanceContext = createContext();

export const useFinance = () => useContext(FinanceContext);

export const FinanceProvider = ({ children }) => {
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Real-time listener for transactions
    useEffect(() => {
        // Requires "transactions" collection in Firestore
        const q = query(collection(db, "transactions"), orderBy("createdAt", "desc"));

        // Subscribe to updates
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const transactionsData = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            setTransactions(transactionsData);
            setLoading(false);
            setError(null); // Clear error on success
        }, (err) => {
            console.error("Error connecting to Firestore: ", err);
            setError("Lỗi kết nối: " + err.message);
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    const addTransaction = async (transaction) => {
        try {
            await addDoc(collection(db, "transactions"), {
                ...transaction,
                createdAt: new Date().toISOString()
            });
            setError(null);
        } catch (e) {
            console.error("Error adding document: ", e);
            setError("Không thể thêm: " + e.message);
            alert("Lỗi thêm dữ liệu: " + e.message);
        }
    };

    const deleteTransaction = async (id) => {
        try {
            if (!id) return;
            await deleteDoc(doc(db, "transactions", id));
            setError(null);
        } catch (e) {
            console.error("Error deleting document: ", e);
            setError("Không thể xóa: " + e.message);
            alert("Lỗi xóa dữ liệu: " + e.message);
        }
    };

    const updateTransaction = async (id, updatedData) => {
        try {
            if (!id) return;
            await updateDoc(doc(db, "transactions", id), updatedData);
        } catch (e) {
            console.error("Error updating document: ", e);
            setError("Lỗi cập nhật: " + e.message);
        }
    };

    // derived state
    const totalIncome = transactions
        .filter(t => t.type === 'income')
        .reduce((sum, t) => sum + Number(t.amount), 0);

    const totalExpense = transactions
        .filter(t => t.type === 'expense')
        .reduce((sum, t) => sum + Number(t.amount), 0);

    const balance = totalIncome - totalExpense;

    return (
        <FinanceContext.Provider value={{
            transactions,
            addTransaction,
            deleteTransaction,
            updateTransaction,
            totalIncome,
            totalExpense,
            balance,
            loading,
            error
        }}>
            {children}
        </FinanceContext.Provider>
    );
};
