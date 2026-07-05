import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { BookOpen, PlusCircle, BookmarkCheck, LogOut, User, Library, Shield, LayoutDashboard } from 'lucide-react';

const Sidebar = ({ activeTab, setActiveTab }) => {
  const { user, logout } = useContext(AuthContext);

  const baseItems = [
    { id: 'overview', name: 'Overview Home', icon: LayoutDashboard },
    { id: 'list', name: 'Book Inventory', icon: BookOpen },
  ];

  const adminItems = [
    { id: 'add', name: 'Add New Book', icon: PlusCircle },
    { id: 'issue', name: 'Issue Book Loan', icon: BookmarkCheck },
  ];

  const menuItems = user?.role === 'Admin' ? [...baseItems, ...adminItems] : baseItems;

  return (
    <aside className="w-80 bg-[#0f172a] border-r border-gray-800/60 flex flex-col min-h-screen text-gray-300">
      {/* Brand Header */}
      <div className="p-6 border-b border-gray-800/40 flex items-center space-x-3">
        <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-500 to-purple-600 flex items-center justify-center shadow-md shadow-indigo-500/10">
          <Library className="w-5 h-5 text-white" />
        </div>
        <span className="text-lg font-bold tracking-tight text-white">Libraro Admin</span>
      </div>

      {/* User Profile Info */}
      {user && (
        <div className="p-6 border-b border-gray-800/40 bg-gray-900/10">
          <div className="flex items-center space-x-3.5">
            <div className="w-11 h-11 rounded-2xl bg-indigo-500/10 flex items-center justify-center border border-indigo-500/20 shadow-inner">
              <User className="w-5.5 h-5.5 text-indigo-400" />
            </div>
            <div className="overflow-hidden">
              <h4 className="text-sm font-semibold text-gray-100 truncate">{user.name}</h4>
              <p className="text-xs text-gray-500 truncate mb-1">{user.email}</p>
              <div className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-indigo-400 bg-indigo-500/5 border border-indigo-500/20 px-2.5 py-0.5 rounded-full">
                <Shield className="w-3 h-3" />
                {user.role}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Navigation Menu */}
      <nav className="flex-1 px-4 py-6 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center space-x-3.5 px-4 py-3.5 rounded-xl text-sm font-semibold tracking-wide transition-all duration-300 ${
                isActive
                  ? 'bg-gradient-to-r from-indigo-500/10 to-indigo-600/5 text-indigo-400 border border-indigo-500/25 shadow-sm'
                  : 'text-gray-400 hover:bg-gray-800/30 hover:text-gray-200 border border-transparent'
              }`}
            >
              <Icon className={`w-5.5 h-5.5 transition-colors ${isActive ? 'text-indigo-400' : 'text-gray-500'}`} />
              <span>{item.name}</span>
            </button>
          );
        })}
      </nav>

      {/* Logout Action */}
      <div className="p-4 border-t border-gray-800/40">
        <button
          onClick={logout}
          className="w-full flex items-center space-x-3.5 px-4 py-3.5 rounded-xl text-sm font-semibold text-red-400 hover:bg-red-500/5 hover:text-red-300 border border-transparent hover:border-red-500/10 transition-all duration-300"
        >
          <LogOut className="w-5.5 h-5.5 text-red-400/80" />
          <span>Log Out Portal</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
