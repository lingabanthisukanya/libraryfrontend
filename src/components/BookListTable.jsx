import React, { useState } from 'react';
import { Search, Trash2, BookOpen, AlertCircle, RefreshCw } from 'lucide-react';

const BookListTable = ({ books, loading, onDelete, onRefresh }) => {
  const [searchQuery, setSearchQuery] = useState('');

  // Filter books by Title or Author
  const filteredBooks = books.filter(
    (book) =>
      book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.isbn.includes(searchQuery)
  );

  const handleDelete = (id, title) => {
    if (window.confirm(`Are you sure you want to delete "${title}"?`)) {
      onDelete(id);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header and Controls */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-gray-100 flex items-center gap-2">
            <BookOpen className="w-5.5 h-5.5 text-indigo-400" />
            Book Inventory
          </h2>
          <p className="text-xs text-gray-400 mt-1">Browse, search, and manage catalog books</p>
        </div>
        
        <div className="flex items-center gap-3 w-full sm:w-auto">
          {/* Search Input */}
          <div className="relative flex-1 sm:w-80">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-gray-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search title, author, category, ISBN..."
              className="w-full bg-[#0f172a] border border-gray-800/80 rounded-xl py-2.5 pl-11 pr-4 text-gray-100 placeholder-gray-600 text-sm focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all duration-300"
            />
          </div>

          {/* Refresh Button */}
          <button
            onClick={onRefresh}
            title="Refresh Inventory"
            className="p-2.5 bg-[#0f172a] border border-gray-800/80 rounded-xl text-gray-400 hover:text-indigo-400 hover:border-indigo-500/30 transition-all duration-300 cursor-pointer"
          >
            <RefreshCw className={`w-5.5 h-5.5 ${loading ? 'animate-spin' : ''}`} />
          </button>
        </div>
      </div>

      {/* Table Container */}
      <div className="glass rounded-3xl overflow-hidden shadow-xl border border-gray-800/40">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#0f172a]/60 border-b border-gray-800/40 text-gray-400 text-xs font-semibold uppercase tracking-wider">
                <th className="py-4.5 px-6">Book Details</th>
                <th className="py-4.5 px-6">ISBN</th>
                <th className="py-4.5 px-6">Category</th>
                <th className="py-4.5 px-6 text-center">Copies Status</th>
                <th className="py-4.5 px-6">Status</th>
                <th className="py-4.5 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800/30 text-sm">
              {loading ? (
                <tr>
                  <td colSpan="6" className="py-16 text-center">
                    <div className="inline-flex items-center space-x-2.5 text-indigo-400">
                      <div className="w-5 h-5 border-2 border-indigo-400 border-t-transparent rounded-full animate-spin"></div>
                      <span className="font-semibold text-gray-400">Syncing database inventory...</span>
                    </div>
                  </td>
                </tr>
              ) : filteredBooks.length === 0 ? (
                <tr>
                  <td colSpan="6" className="py-16 text-center text-gray-500">
                    <div className="flex flex-col items-center justify-center space-y-3">
                      <AlertCircle className="w-10 h-10 text-gray-600" />
                      <span className="font-semibold">No books matching search parameters.</span>
                      <span className="text-xs text-gray-600">Try adjusting your filters or query.</span>
                    </div>
                  </td>
                </tr>
              ) : (
                filteredBooks.map((book) => {
                  const isAvailable = book.availableCopies > 0;
                  return (
                    <tr
                      key={book._id}
                      className="hover:bg-gray-800/10 transition-colors duration-200"
                    >
                      {/* Title & Author */}
                      <td className="py-4 px-6">
                        <div className="font-semibold text-gray-200">{book.title}</div>
                        <div className="text-xs text-gray-500 mt-0.5">{book.author}</div>
                      </td>

                      {/* ISBN */}
                      <td className="py-4 px-6 font-mono text-xs text-gray-400">
                        {book.isbn}
                      </td>

                      {/* Category */}
                      <td className="py-4 px-6">
                        <span className="inline-block text-xs font-semibold text-indigo-400 bg-indigo-500/5 border border-indigo-500/15 px-2.5 py-1 rounded-lg">
                          {book.category}
                        </span>
                      </td>

                      {/* Copies stock progress */}
                      <td className="py-4 px-6">
                        <div className="flex flex-col items-center justify-center">
                          <span className="text-xs font-bold text-gray-300">
                            {book.availableCopies} / {book.totalCopies}
                          </span>
                          {/* Mini Progress Bar */}
                          <div className="w-24 h-1.5 bg-[#0f172a] rounded-full overflow-hidden mt-1.5 border border-gray-800/60">
                            <div
                              className={`h-full rounded-full transition-all duration-500 ${
                                isAvailable ? 'bg-gradient-to-r from-emerald-500 to-teal-400' : 'bg-red-500'
                              }`}
                              style={{
                                width: `${Math.min(100, (book.availableCopies / book.totalCopies) * 100)}%`,
                              }}
                            ></div>
                          </div>
                        </div>
                      </td>

                      {/* Status Badges */}
                      <td className="py-4 px-6">
                        {isAvailable ? (
                          <span className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-400 bg-emerald-500/5 border border-emerald-500/20 px-2.5 py-1 rounded-full">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
                            Available
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1.5 text-xs font-bold text-red-400 bg-red-500/5 border border-red-500/25 px-2.5 py-1 rounded-full">
                            <span className="w-1.5 h-1.5 rounded-full bg-red-400"></span>
                            Out of Stock
                          </span>
                        )}
                      </td>

                      {/* Actions */}
                      <td className="py-4 px-6 text-right">
                        <button
                          onClick={() => handleDelete(book._id, book.title)}
                          className="p-2 text-gray-500 hover:text-red-400 hover:bg-red-500/5 border border-transparent hover:border-red-500/10 rounded-xl transition-all duration-300 cursor-pointer"
                          title="Delete Book"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default BookListTable;
