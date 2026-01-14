import { useFinance } from '../context/FinanceContext';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import { PieChart as PieIcon, TrendingUp } from 'lucide-react';

const COLORS = ['#6366f1', '#ec4899', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#06b6d4', '#64748b'];

const Reports = () => {
    const { transactions } = useFinance();

    // Process data for Expense by Category
    const expenseByCategory = transactions
        .filter(t => t.type === 'expense')
        .reduce((acc, t) => {
            acc[t.category] = (acc[t.category] || 0) + Number(t.amount);
            return acc;
        }, {});

    const expensePieData = Object.keys(expenseByCategory).map((key) => ({
        name: key,
        value: expenseByCategory[key]
    }));

    // Process data for Income by Category
    const incomeByCategory = transactions
        .filter(t => t.type === 'income')
        .reduce((acc, t) => {
            acc[t.category] = (acc[t.category] || 0) + Number(t.amount);
            return acc;
        }, {});

    const incomePieData = Object.keys(incomeByCategory).map((key) => ({
        name: key,
        value: incomeByCategory[key]
    }));

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
    };

    const EmptyPlaceholder = ({ text }) => (
        <div className="h-full flex items-center justify-center text-slate-400">
            {text}
        </div>
    );

    const ChartSection = ({ title, data, color, emptyText }) => (
        <div className="contents">
            <div className="card">
                <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
                    <span className={`w-1 h-6 rounded-full ${color}`}></span>
                    {title}
                </h3>
                <div className="h-80 w-full">
                    {data.length > 0 ? (
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={data}
                                    cx="50%"
                                    cy="50%"
                                    labelLine={false}
                                    outerRadius={80}
                                    fill="#8884d8"
                                    dataKey="value"
                                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                                >
                                    {data.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip formatter={(value) => formatCurrency(value)} />
                            </PieChart>
                        </ResponsiveContainer>
                    ) : (
                        <EmptyPlaceholder text={emptyText} />
                    )}
                </div>
            </div>

            <div className="card">
                <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
                    <span className={`w-1 h-6 rounded-full ${color}`}></span>
                    Chi tiết
                </h3>
                <div className="space-y-4">
                    {data.sort((a, b) => b.value - a.value).map((item, index) => (
                        <div key={item.name} className="flex items-center justify-between p-3 hover:bg-slate-50 rounded-lg transition-colors">
                            <div className="flex items-center gap-3">
                                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[index % COLORS.length] }}></div>
                                <span className="font-medium text-slate-700">{item.name}</span>
                            </div>
                            <div className="font-bold text-slate-800">{formatCurrency(item.value)}</div>
                        </div>
                    ))}
                    {data.length === 0 && (
                        <div className="text-center py-12 text-slate-400">Chưa có dữ liệu</div>
                    )}
                </div>
            </div>
        </div>
    );

    return (
        <div className="space-y-8">
            <div className="flex items-center gap-3 mb-8">
                <div className="p-3 bg-purple-100 rounded-xl text-purple-600">
                    <PieIcon size={32} />
                </div>
                <div>
                    <h2 className="text-2xl font-bold text-slate-800">Báo cáo Tài chính</h2>
                    <p className="text-slate-500">Phân tích chi tiết thu chi của bạn</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <ChartSection
                    title="Phân bổ Thu Nhập"
                    data={incomePieData}
                    color="bg-emerald-500"
                    emptyText="Chưa có dữ liệu thu nhập"
                />

                <ChartSection
                    title="Phân bổ Chi Tiêu"
                    data={expensePieData}
                    color="bg-rose-500"
                    emptyText="Chưa có dữ liệu chi tiêu"
                />
            </div>
        </div>
    );
};

export default Reports;
