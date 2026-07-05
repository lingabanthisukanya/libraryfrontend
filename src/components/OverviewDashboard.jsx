import React from 'react';
import { BookOpen, CheckCircle, BookmarkCheck, Users, Calendar, Mail, User } from 'lucide-react';

const OverviewDashboard = ({ stats, loading, onRefresh }) => {
  // Destructure stats with fallbacks
  const {
    totalBooks = 0,
    availableBooks = 0,
    issuedBooks = 0,
    activeUsers = 0,
    recentTransactions = [],
  } = stats || {};

  // Formatter for join dates
  const formatDate = (dateStr) => {
    if (!dateStr) return 'N/A';
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const cards = [
    {
      title: 'Total Books Catalogued',
      value: totalBooks,
      icon: BookOpen,
      color: 'text-indigo-400',
      bgColor: 'bg-indigo-500/5',
      borderColor: 'border-indigo-500/20 hover:border-indigo-500/40',
      shadowColor: 'shadow-indigo-500/5',
    },
    {
      title: 'Available Books',
      value: availableBooks,
      icon: CheckCircle,
      color: 'text-emerald-400',
      bgColor: 'bg-emerald-500/5',
      borderColor: 'border-emerald-500/20 hover:border-emerald-500/40',
      shadowColor: 'shadow-emerald-500/5',
    },
    {
      title: 'Issued Books',
      value: issuedBooks,
      icon: BookmarkCheck,
      color: 'text-amber-400',
      bgColor: 'bg-amber-500/5',
      borderColor: 'border-amber-500/20 hover:border-amber-500/40',
      shadowColor: 'shadow-amber-500/5',
    },
    {
      title: 'Active Accounts',
      value: activeUsers,
      icon: Users,
      color: 'text-purple-400',
      bgColor: 'bg-purple-500/5',
      borderColor: 'border-purple-500/20 hover:border-purple-500/40',
      shadowColor: 'shadow-purple-500/5',
    },
  ];

  return (
    <div className="space-y-10">
      {/* Welcome Banner */}
      <div>
        <h1 className="text-3xl font-extrabold text-white tracking-tight">System Overview</h1>
        <p className="text-sm text-gray-400 mt-1">Real-time statistics and recent transaction activity</p>
      </div>

      {/* Grid of Counter Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {cards.map((card, idx) => {
          const Icon = card.icon;
          return (
            <div
              key={idx}
              className={`glass ${card.bgColor} border ${card.borderColor} rounded-3xl p-6 flex items-center justify-between transition-all duration-300 shadow-lg ${card.shadowColor} group hover:-translate-y-0.5`}
            >
              <div className="space-y-2">
                <span className="text-xs font-semibold text-gray-400 tracking-wider uppercase block">
                  {card.title}
                </span>
                <span className="text-3xl font-bold text-gray-100 block">
                  {loading ? (
                    <span className="inline-block w-8 h-8 bg-gray-800 rounded animate-pulse"></span>
                  ) : (
                    card.value
                  )}
                </span>
              </div>
              <div className={`p-4 rounded-2xl bg-gray-900/40 border border-gray-800/60 group-hover:scale-105 transition-transform duration-300`}>
                <Icon className={`w-6 h-6 ${card.color}`} />
              </div>
            </div>
          );
        })}
      </div>

      {/* Recent Transactions Table Section */}
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-bold text-gray-200">Recent Transactions</h3>
          <p className="text-xs text-gray-400 mt-0.5">The 5 most recently processed book loans</p>
        </div>

        <div className="glass rounded-3xl overflow-hidden shadow-xl border border-gray-800/40">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#0f172a]/60 border-b border-gray-800/40 text-gray-400 text-xs font-semibold uppercase tracking-wider">
                  <th className="py-4.5 px-6">Book Title</th>
                  <th className="py-4.5 px-6">Borrower Name</th>
                  <th className="py-4.5 px-6">Issue Date</th>
                  <th className="py-4.5 px-6">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800/30 text-sm">
                {loading ? (
                  <tr>
                    <td colSpan="4" className="py-12 text-center text-gray-500">
                      <div className="inline-flex items-center space-x-2.5 text-indigo-400">
                        <div className="w-4 h-4 border-2 border-indigo-400 border-t-transparent rounded-full animate-spin"></div>
                        <span>Updating transaction logs...</span>
                      </div>
                    </td>
                  </tr>
                ) : recentTransactions.length === 0 ? (
                  <tr>
                    <td colSpan="4" className="py-12 text-center text-gray-500">
                      No recent transactions found.
                    </td>
                  </tr>
                ) : (
                  recentTransactions.map((tx) => (
                    <tr
                      key={tx._id}
                      className="hover:bg-gray-800/10 transition-colors duration-200"
                    >
                      {/* Book Title */}
                      <td className="py-4 px-6 font-semibold text-gray-200 flex items-center gap-3">
                        <div className="w-7 h-7 rounded-lg bg-indigo-500/10 border border-indigo-500/15 flex items-center justify-center">
                          <BookOpen className="w-4.5 h-4.5 text-indigo-400" />
                        </div>
                        {tx.bookTitle}
                      </td>

                      {/* Borrower Name */}
                      <td className="py-4 px-6 text-gray-400 font-medium">
                        <div className="flex items-center gap-2">
                          <User className="w-4 h-4 text-gray-600" />
                          {tx.userName}
                        </div>
                      </td>

                      {/* Issue Date */}
                      <td className="py-4 px-6 text-gray-500">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-gray-600" />
                          {formatDate(tx.issueDate)}
                        </div>
                      </td>

                      {/* Status */}
                      <td className="py-4 px-6">
                        <span className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-400 bg-amber-500/5 border border-amber-500/25 px-2.5 py-1 rounded-full">
                          {tx.status || 'Issued'}
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OverviewDashboard;
