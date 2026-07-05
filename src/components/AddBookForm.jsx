import React, { useState } from 'react';
import { PlusCircle, Book, User, Hash, FolderOpen, Layers, CheckCircle2, AlertCircle } from 'lucide-react';

const AddBookForm = ({ onAddBook, loading }) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [isbn, setIsbn] = useState('');
  const [category, setCategory] = useState('');
  const [totalCopies, setTotalCopies] = useState('1');

  const [formError, setFormError] = useState('');
  const [formSuccess, setFormSuccess] = useState('');
  const [validations, setValidations] = useState({});

  const validate = () => {
    const errs = {};
    if (!title.trim()) errs.title = 'Title is required';
    if (!author.trim()) errs.author = 'Author is required';
    if (!isbn.trim()) errs.isbn = 'ISBN is required';
    if (!category.trim()) errs.category = 'Category is required';
    
    const copiesNum = Number(totalCopies);
    if (!totalCopies || isNaN(copiesNum) || copiesNum < 0) {
      errs.totalCopies = 'Total copies must be a non-negative number';
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
      await onAddBook({
        title: title.trim(),
        author: author.trim(),
        isbn: isbn.trim(),
        category: category.trim(),
        totalCopies: Number(totalCopies),
      });

      setFormSuccess('Book successfully registered to catalog!');
      // Reset form
      setTitle('');
      setAuthor('');
      setIsbn('');
      setCategory('');
      setTotalCopies('1');
      setValidations({});
    } catch (err) {
      setFormError(err.message || 'Failed to register book. Check ISBN uniqueness.');
    }
  };

  const categories = [
    'Fiction',
    'Non-Fiction',
    'Science & Tech',
    'History',
    'Biography',
    'Self-Help',
    'Philosophy',
    'Mystery & Thriller',
    'Business & Economics',
  ];

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div>
        <h2 className="text-xl font-bold text-gray-100 flex items-center gap-2">
          <PlusCircle className="w-5.5 h-5.5 text-indigo-400" />
          Add New Book
        </h2>
        <p className="text-xs text-gray-400 mt-1">Register a new volume into the digital catalog</p>
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
          {/* Title */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Book Title</label>
            <div className="relative">
              <Book className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-gray-500" />
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="The Great Gatsby"
                className={`w-full bg-[#0f172a] border ${
                  validations.title ? 'border-red-500/50 focus:ring-red-500/20' : 'border-gray-800/80 focus:border-indigo-500 focus:ring-indigo-500/10'
                } rounded-xl py-3 pl-11 pr-4 text-gray-100 placeholder-gray-600 text-sm focus:outline-none focus:ring-4 transition-all duration-300`}
              />
            </div>
            {validations.title && <p className="text-red-400 text-xs font-medium">{validations.title}</p>}
          </div>

          {/* Author */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Author Name</label>
            <div className="relative">
              <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-gray-500" />
              <input
                type="text"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                placeholder="F. Scott Fitzgerald"
                className={`w-full bg-[#0f172a] border ${
                  validations.author ? 'border-red-500/50 focus:ring-red-500/20' : 'border-gray-800/80 focus:border-indigo-500 focus:ring-indigo-500/10'
                } rounded-xl py-3 pl-11 pr-4 text-gray-100 placeholder-gray-600 text-sm focus:outline-none focus:ring-4 transition-all duration-300`}
              />
            </div>
            {validations.author && <p className="text-red-400 text-xs font-medium">{validations.author}</p>}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* ISBN */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">ISBN Code</label>
              <div className="relative">
                <Hash className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-gray-500" />
                <input
                  type="text"
                  value={isbn}
                  onChange={(e) => setIsbn(e.target.value)}
                  placeholder="978-3-16-148410-0"
                  className={`w-full bg-[#0f172a] border ${
                    validations.isbn ? 'border-red-500/50 focus:ring-red-500/20' : 'border-gray-800/80 focus:border-indigo-500 focus:ring-indigo-500/10'
                  } rounded-xl py-3 pl-11 pr-4 text-gray-100 placeholder-gray-600 text-sm focus:outline-none focus:ring-4 transition-all duration-300`}
                />
              </div>
              {validations.isbn && <p className="text-red-400 text-xs font-medium">{validations.isbn}</p>}
            </div>

            {/* Total Copies */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Total Copies</label>
              <div className="relative">
                <Layers className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-gray-500" />
                <input
                  type="number"
                  min="0"
                  value={totalCopies}
                  onChange={(e) => setTotalCopies(e.target.value)}
                  placeholder="5"
                  className={`w-full bg-[#0f172a] border ${
                    validations.totalCopies ? 'border-red-500/50 focus:ring-red-500/20' : 'border-gray-800/80 focus:border-indigo-500 focus:ring-indigo-500/10'
                  } rounded-xl py-3 pl-11 pr-4 text-gray-100 placeholder-gray-600 text-sm focus:outline-none focus:ring-4 transition-all duration-300`}
                />
              </div>
              {validations.totalCopies && <p className="text-red-400 text-xs font-medium">{validations.totalCopies}</p>}
            </div>
          </div>

          {/* Category */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Category</label>
            <div className="relative">
              <FolderOpen className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-gray-500" />
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className={`w-full bg-[#0f172a] border ${
                  validations.category ? 'border-red-500/50 focus:ring-red-500/20' : 'border-gray-800/80 focus:border-indigo-500 focus:ring-indigo-500/10'
                } rounded-xl py-3 pl-11 pr-4 text-gray-100 text-sm focus:outline-none focus:ring-4 transition-all duration-300 appearance-none cursor-pointer`}
              >
                <option value="" disabled>Select a Category...</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>
            {validations.category && <p className="text-red-400 text-xs font-medium">{validations.category}</p>}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 disabled:opacity-50 text-white font-semibold rounded-xl py-3.5 transition-all duration-300 shadow-lg shadow-indigo-600/15 hover:shadow-indigo-600/25 active:scale-[0.98] flex items-center justify-center cursor-pointer"
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : (
              'Register Book Volume'
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddBookForm;
