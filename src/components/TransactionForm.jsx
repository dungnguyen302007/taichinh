import { useState } from 'react';
import { useFinance } from '../context/FinanceContext';
import { Plus, Save, X } from 'lucide-react';

const CATEGORIES = {
    income: ['Lương', 'Thưởng', 'Đầu tư', 'Khác'],
    expense: ['Ăn uống', 'Di chuyển', 'Nhà ở', 'Hóa đơn', 'Mua sắm', 'Giải trí', 'Sức khỏe', 'Khác']
};

const TransactionForm = ({ type, onClose }) => {
    const { addTransaction } = useFinance();
    const [amount, setAmount] = useState('');
    const [category, setCategory] = useState(CATEGORIES[type][0]);
    const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
    const [note, setNote] = useState('');

    const formatValue = (value) => {
        // Remove all non-digit characters
        const number = value.replace(/\D/g, '');
        // Format with dots
        return new Intl.NumberFormat('vi-VN').format(number);
    };

    const handleAmountChange = (e) => {
        const value = e.target.value;
        // Remove dots to check if it's a number
        const rawValue = value.replace(/\./g, '');

        if (rawValue === '') {
            setAmount('');
            return;
        }

        if (!isNaN(rawValue)) {
            setAmount(formatValue(rawValue));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!amount) return;

        addTransaction({
            type,
            amount: parseFloat(amount.replace(/\./g, '')),
            category,
            date,
            note
        });

        // Reset or close
        if (onClose) onClose();
        else {
            setAmount('');
            setNote('');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Số tiền</label>
                    <div className="relative">
                        <input
                            type="text"
                            value={amount}
                            onChange={handleAmountChange}
                            className="w-full pl-4 pr-12 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all text-lg font-semibold text-slate-800"
                            placeholder="0"
                            required
                        />
                        <div className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 font-medium">VND</div>
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Danh mục</label>
                    <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none appearance-none"
                    >
                        {CATEGORIES[type].map(c => (
                            <option key={c} value={c}>{c}</option>
                        ))}
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Ngày</label>
                    <input
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Ghi chú</label>
                    <input
                        type="text"
                        value={note}
                        onChange={(e) => setNote(e.target.value)}
                        placeholder="Ví dụ: Ăn trưa"
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                    />
                </div>
            </div>

            <div className="mt-6 flex justify-end gap-3">
                <button
                    type="submit"
                    className={`
            flex items-center gap-2 px-6 py-3 rounded-lg text-white font-medium shadow-lg hover:shadow-xl transition-all
            ${type === 'income' ? 'bg-emerald-500 hover:bg-emerald-600 shadow-emerald-200' : 'bg-rose-500 hover:bg-rose-600 shadow-rose-200'}
          `}
                >
                    <Save size={20} />
                    <span>Lưu Giao Dịch</span>
                </button>
            </div>
        </form>
    );
};

export default TransactionForm;
