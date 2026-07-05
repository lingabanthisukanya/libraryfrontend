import React, { useState } from 'react';
import { BookmarkCheck, Mail, Hash, CheckCircle2, AlertCircle, BookOpen } from 'lucide-react';

const IssueBookForm = ({ books, onIssueBook, loading }) => {
  const [email, setEmail] = useState('');
  const [isbn, setIsbn] = useState('');

  const [formError, setFormError] = useState('');
  const [formSuccess, setFormSuccess] = useState('');
  const [validations, setValidations] = useState({});

  // Filter books to show only those currently available
  const availableBooks = books.filter((book) => book.availableCopies > 0);

  const validate = () => {
    const errs = {};
    if (!email.trim()) {
      errs.email = 'Reader email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errs.email = 'Please enter a valid email address';
    }

    if (!isbn) {
      errs.isbn = 'Please select a book to issue';
    }

    setValidations(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError('');
    setFormSuccess('');

    if (!validate()) return;

    try {
      const response = await onIssueBook({
        email: email.trim(),
        isbn: isbn,
      });

      setFormSuccess(response.message || 'Book issued successfully!');
      // Reset form
      setEmail('');
      setIsbn('');
      setValidations({});
    } catch (err) {
      setFormError(err.message || 'Failed to issue book. Make sure user and book exist.');
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div>
        <h2 className="text-xl font-bold text-gray-100 flex items-center gap-2">
          <BookmarkCheck className="w-5.5 h-5.5 text-indigo-400" />
          Issue Book Loan
        </h2>
        <p className="text-xs text-gray-400 mt-1">Assign a book volume to a registered reader's account</p>
      </div>

      <div className="glass p-8 rounded-3xl border border-gray-800/40 relative shadow-xl">
        {/* Status Messages */}
        {formSuccess && (
          <div className="mb-6 p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-xl flex items-start gap-3 text-emerald-400 text-sm">
            <CheckCircle2 className="w-5 h-5 shrink-0 mt-0.5" />
            <span>{formSuccess}</span>
          </div>
        )}

        {formError && (
          <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-xl flex items-start gap-3 text-red-400 text-sm">
            <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
            <span>{formError}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* User Email */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Reader's Registered Email</label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-gray-500" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="reader@gmail.com"
                className={`w-full bg-[#0f172a] border ${
                  validations.email ? 'border-red-500/50 focus:ring-red-500/20' : 'border-gray-800/80 focus:border-indigo-500 focus:ring-indigo-500/10'
                } rounded-xl py-3 pl-11 pr-4 text-gray-100 placeholder-gray-600 text-sm focus:outline-none focus:ring-4 transition-all duration-300`}
              />
            </div>
            {validations.email && <p className="text-red-400 text-xs font-medium">{validations.email}</p>}
          </div>

          {/* Book ISBN Select */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Select Book (ISBN)</label>
            <div className="relative">
              <BookOpen className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-gray-500" />
              <select
                value={isbn}
                onChange={(e) => setIsbn(e.target.value)}
                className={`w-full bg-[#0f172a] border ${
                  validations.isbn ? 'border-red-500/50 focus:ring-red-500/20' : 'border-gray-800/80 focus:border-indigo-500 focus:ring-indigo-500/10'
                } rounded-xl py-3 pl-11 pr-4 text-gray-100 text-sm focus:outline-none focus:ring-4 transition-all duration-300 appearance-none cursor-pointer`}
              >
                <option value="" disabled>Select an available book...</option>
                {availableBooks.length === 0 ? (
                  <option disabled>No books with copies available in stock</option>
                ) : (
                  availableBooks.map((book) => (
                    <option key={book._id} value={book.isbn}>
                      {book.title} ({book.isbn}) — Stock: {book.availableCopies} available
                    </option>
                  ))
                )}
              </select>
            </div>
            {validations.isbn && <p className="text-red-400 text-xs font-medium">{validations.isbn}</p>}
          </div>

          {/* Action Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 disabled:opacity-50 text-white font-semibold rounded-xl py-3.5 transition-all duration-300 shadow-lg shadow-indigo-600/15 hover:shadow-indigo-600/25 active:scale-[0.98] flex items-center justify-center cursor-pointer"
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : (
              'Process Book Loan'
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default IssueBookForm;
