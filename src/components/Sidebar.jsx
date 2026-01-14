import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Wallet, TrendingUp, TrendingDown, PieChart } from 'lucide-react';

const Sidebar = () => {
    const navItems = [
        { path: '/', label: 'Tổng quan', icon: LayoutDashboard },
        { path: '/income', label: 'Thu nhập', icon: TrendingUp },
        { path: '/expense', label: 'Chi tiêu', icon: TrendingDown },
        { path: '/reports', label: 'Báo cáo', icon: PieChart },
    ];

    return (
        <aside className="fixed left-0 top-0 h-full w-64 bg-white/80 backdrop-blur-md border-r border-slate-200 z-50 flex flex-col shadow-sm">
            <div className="p-6">
                <div className="flex items-center gap-3">
                    <div className="h-10 w-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white shadow-indigo-200 shadow-lg">
                        <Wallet size={24} />
                    </div>
                    <h1 className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                        FinFamily
                    </h1>
                </div>
            </div>

            <nav className="flex-1 px-4 py-4 space-y-2">
                {navItems.map((item) => (
                    <NavLink
                        key={item.path}
                        to={item.path}
                        className={({ isActive }) => `
              flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 group
              ${isActive
                                ? 'bg-indigo-50 text-indigo-600 shadow-sm'
                                : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'}
            `}
                    >
                        <item.icon size={20} className="group-hover:scale-110 transition-transform duration-200" />
                        <span className="font-medium">{item.label}</span>
                    </NavLink>
                ))}
            </nav>

            <div className="p-4 m-4 bg-slate-50 rounded-xl border border-slate-100">
                <div className="text-xs font-semibold text-slate-400 uppercase mb-2">Trạng thái</div>
                <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-sm text-slate-600">Đang hoạt động</span>
                </div>
            </div>
        </aside>
    );
};

export default Sidebar;
