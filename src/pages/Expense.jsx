import { useFinance } from '../context/FinanceContext';
import TransactionForm from '../components/TransactionForm';
import { Trash2, TrendingDown } from 'lucide-react';

const Expense = () => {
    const { transactions, deleteTransaction } = useFinance();

    const expenseTransactions = transactions
        .filter(t => t.type === 'expense')
        .sort((a, b) => new Date(b.date) - new Date(a.date));

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center gap-3 mb-8">
                <div className="p-3 bg-rose-100 rounded-xl text-rose-600">
                    <TrendingDown size={32} />
                </div>
                <div>
                    <h2 className="text-2xl font-bold text-slate-800">Quản lý Chi Tiêu</h2>
                    <p className="text-slate-500">Kiểm soát chi tiêu gia đình hiệu quả</p>
                </div>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
                {/* Form Section */}
                <div className="xl:col-span-1">
                    <h3 className="text-lg font-bold text-slate-700 mb-4">Thêm Khoản Chi Mới</h3>
                    <TransactionForm type="expense" />
                </div>

                {/* List Section */}
                <div className="xl:col-span-2 space-y-4">
                    <h3 className="text-lg font-bold text-slate-700 mb-4">Lịch sử Chi Tiêu</h3>
                    {expenseTransactions.length === 0 ? (
                        <div className="text-center py-12 bg-white rounded-xl border border-dashed border-slate-300">
                            <p className="text-slate-400">Chưa có khoản chi nào được ghi nhận</p>
                        </div>
                    ) : (
                        <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
                            <table className="w-full text-left">
                                <thead className="bg-slate-50 border-b border-slate-100">
                                    <tr>
                                        <th className="px-6 py-4 font-semibold text-slate-600 text-sm">Ngày</th>
                                        <th className="px-6 py-4 font-semibold text-slate-600 text-sm">Danh mục</th>
                                        <th className="px-6 py-4 font-semibold text-slate-600 text-sm">Ghi chú</th>
                                        <th className="px-6 py-4 font-semibold text-slate-600 text-sm text-right">Số tiền</th>
                                        <th className="px-6 py-4 font-semibold text-slate-600 text-sm text-right"></th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100">
                                    {expenseTransactions.map((t) => (
                                        <tr key={t.id} className="hover:bg-slate-50/50 transition-colors">
                                            <td className="px-6 py-4 text-slate-600">{new Date(t.date).toLocaleDateString('vi-VN')}</td>
                                            <td className="px-6 py-4">
                                                <span className="px-3 py-1 rounded-full text-xs font-medium bg-rose-50 text-rose-700 border border-rose-100">
                                                    {t.category}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-slate-700">{t.note}</td>
                                            <td className="px-6 py-4 text-right font-bold text-rose-600">
                                                -{formatCurrency(t.amount)}
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <button
                                                    onClick={() => deleteTransaction(t.id)}
                                                    className="p-2 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-lg transition-all"
                                                    title="Xóa"
                                                >
                                                    <Trash2 size={18} />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Expense;
