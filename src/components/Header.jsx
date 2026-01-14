import { Bell, Search } from 'lucide-react';

const Header = () => {
    return (
        <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-sm border-b border-slate-100 px-8 py-4 flex items-center justify-between">
            <div className="flex items-center gap-4 flex-1">
                <div className="relative w-96 hidden md:block">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                    <input
                        type="text"
                        placeholder="Tìm kiếm giao dịch..."
                        className="w-full pl-10 pr-4 py-2 bg-slate-50 border-none rounded-full focus:ring-2 focus:ring-indigo-100 outline-none text-slate-600 transition-all placeholder:text-slate-400"
                    />
                </div>
            </div>

            <div className="flex items-center gap-6">
                <button className="relative text-slate-500 hover:text-slate-700 transition-colors">
                    <Bell size={20} />
                    <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full border-2 border-white translate-x-1/3 -translate-y-1/3"></span>
                </button>

                <div className="h-8 w-[1px] bg-slate-200"></div>

                <div className="flex items-center gap-3">
                    <div className="text-right hidden sm:block">
                        <div className="text-sm font-semibold text-slate-700">Gia đình Việt</div>
                        <div className="text-xs text-slate-500">Admin</div>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center text-white font-bold shadow-md ring-4 ring-indigo-50">
                        G
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
