import { useFinance } from '../context/FinanceContext';
import { ArrowUpRight, ArrowDownRight, DollarSign, Wallet } from 'lucide-react';

const Dashboard = () => {
    const { balance, totalIncome, totalExpense, transactions } = useFinance();

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
    };

    return (
        <div className="space-y-8">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Balance Card */}
                <div className="card bg-gradient-to-br from-indigo-500 to-purple-600 text-white border-none relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform duration-500">
                        <Wallet size={100} />
                    </div>
                    <div className="relative z-10">
                        <h3 className="text-indigo-100 font-medium mb-1">Tổng Số Dư</h3>
                        <div className="text-3xl font-bold mb-4">{formatCurrency(balance)}</div>
                        <div className="inline-flex items-center gap-1 bg-white/20 backdrop-blur-sm px-2 py-1 rounded-lg text-xs font-medium text-white">
                            <span>Cập nhật liên tục</span>
                        </div>
                    </div>
                </div>

                {/* Income Card */}
                <div className="card border-l-4 border-l-emerald-500 hover:shadow-emerald-100">
                    <div className="flex items-start justify-between">
                        <div>
                            <h3 className="text-slate-500 font-medium mb-1">Tổng Thu Nhập</h3>
                            <div className="text-2xl font-bold text-slate-800">{formatCurrency(totalIncome)}</div>
                        </div>
                        <div className="p-3 bg-emerald-50 rounded-lg text-emerald-600">
                            <ArrowUpRight size={24} />
                        </div>
                    </div>
                    <div className="mt-4 flex items-center gap-2 text-xs text-emerald-600 font-medium">
                        <span>+ Thu nhập tháng này</span>
                    </div>
                </div>

                {/* Expense Card */}
                <div className="card border-l-4 border-l-rose-500 hover:shadow-rose-100">
                    <div className="flex items-start justify-between">
                        <div>
                            <h3 className="text-slate-500 font-medium mb-1">Tổng Chi Tiêu</h3>
                            <div className="text-2xl font-bold text-slate-800">{formatCurrency(totalExpense)}</div>
                        </div>
                        <div className="p-3 bg-rose-50 rounded-lg text-rose-600">
                            <ArrowDownRight size={24} />
                        </div>
                    </div>
                    <div className="mt-4 flex items-center gap-2 text-xs text-rose-600 font-medium">
                        <span>- Chi tiêu tháng này</span>
                    </div>
                </div>
            </div>

            {/* Recent Transactions Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="card">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="text-lg font-bold text-slate-800">Giao dịch gần đây</h3>
                        <button className="text-sm text-indigo-600 font-medium hover:text-indigo-700">Xem tất cả</button>
                    </div>

                    <div className="space-y-4">
                        {transactions.length === 0 ? (
                            <div className="text-center py-8 text-slate-400">
                                <p>Chưa có giao dịch nào</p>
                            </div>
                        ) : (
                            transactions.slice(0, 5).map((t) => (
                                <div key={t.id} className="flex items-center justify-between p-3 hover:bg-slate-50 rounded-lg transition-colors group">
                                    <div className="flex items-center gap-4">
                                        <div className={`
                      w-10 h-10 rounded-full flex items-center justify-center
                      ${t.type === 'income' ? 'bg-emerald-100 text-emerald-600' : 'bg-rose-100 text-rose-600'}
                    `}>
                                            {t.type === 'income' ? <ArrowUpRight size={18} /> : <ArrowDownRight size={18} />}
                                        </div>
                                        <div>
                                            <p className="font-medium text-slate-800">{t.note || 'Không có ghi chú'}</p>
                                            <p className="text-xs text-slate-500">{new Date(t.createdAt).toLocaleDateString('vi-VN')}</p>
                                        </div>
                                    </div>
                                    <div className={`font-bold ${t.type === 'income' ? 'text-emerald-600' : 'text-rose-600'}`}>
                                        {t.type === 'income' ? '+' : '-'}{formatCurrency(t.amount)}
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>

                {/* Quick Report Placeholder */}
                <div className="card flex flex-col items-center justify-center text-center p-8 bg-gradient-to-br from-slate-800 to-slate-900 text-slate-300">
                    <div className="mb-4 p-4 bg-white/10 rounded-full">
                        <DollarSign size={32} className="text-indigo-400" />
                    </div>
                    <h3 className="text-white text-lg font-bold mb-2">Quản lý Thông minh</h3>
                    <p className="text-sm max-w-xs mx-auto opacity-80">
                        Biểu đồ và báo cáo chi tiết sẽ xuất hiện tại đây khi bạn có nhiều dữ liệu hơn.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
