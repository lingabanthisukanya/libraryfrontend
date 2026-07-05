import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import Sidebar from '../components/Sidebar';
import BookListTable from '../components/BookListTable';
import AddBookForm from '../components/AddBookForm';
import IssueBookForm from '../components/IssueBookForm';
import OverviewDashboard from '../components/OverviewDashboard';

const API_URL = import.meta.env.VITE_API_URL || 'https://lm-4nya.onrender.com/api';

const Dashboard = () => {
  const { token, logout } = useContext(AuthContext);
  const [activeTab, setActiveTab] = useState('overview');
  const [books, setBooks] = useState([]);
  const [stats, setStats] = useState({});
  const [loading, setLoading] = useState(true);
  const [loadingStats, setLoadingStats] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);

  // Fetch all books
  const fetchBooks = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/books`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      
      if (response.status === 401) {
        logout();
        return;
      }

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Failed to fetch inventory');
      }
      setBooks(data.data || []);
    } catch (error) {
      console.error('Error fetching books:', error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch dashboard statistics
  const fetchStats = async () => {
    setLoadingStats(true);
    try {
      const response = await fetch(`${API_URL}/dashboard/stats`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 401) {
        logout();
        return;
      }

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Failed to fetch stats');
      }
      setStats(data.data || {});
    } catch (error) {
      console.error('Error fetching dashboard stats:', error);
    } finally {
      setLoadingStats(false);
    }
  };

  // Run fetches on mount
  useEffect(() => {
    if (token) {
      fetchBooks();
      fetchStats();
    }
  }, [token]);

  // Add book action
  const handleAddBook = async (bookData) => {
    setActionLoading(true);
    try {
      const response = await fetch(`${API_URL}/books`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(bookData),
      });

      if (response.status === 401) {
        logout();
        return;
      }

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Failed to register book');
      }

      // Prepend the new book to state and refresh stats
      setBooks((prevBooks) => [data.data, ...prevBooks]);
      fetchStats(); // Update dashboard counters in background
      return data.data;
    } catch (err) {
      throw err;
    } finally {
      setActionLoading(false);
    }
  };

  // Delete book action
  const handleDeleteBook = async (id) => {
    try {
      const response = await fetch(`${API_URL}/books/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 401) {
        logout();
        return;
      }

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Failed to delete book');
      }

      // Filter out the deleted book from state and refresh stats
      setBooks((prevBooks) => prevBooks.filter((book) => book._id !== id));
      fetchStats();
    } catch (err) {
      alert(err.message || 'Failed to delete book');
    }
  };

  // Issue book action
  const handleIssueBook = async (issueData) => {
    setActionLoading(true);
    try {
      const response = await fetch(`${API_URL}/books/issue`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(issueData),
      });

      if (response.status === 401) {
        logout();
        return;
      }

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Failed to issue book');
      }

      // Refetch books & stats to update copy counts and dashboard counters
      await fetchBooks();
      await fetchStats();
      return data;
    } catch (err) {
      throw err;
    } finally {
      setActionLoading(false);
    }
  };

  // Render sub-components based on current active tab
  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <OverviewDashboard
            stats={stats}
            loading={loadingStats}
            onRefresh={fetchStats}
          />
        );
      case 'list':
        return (
          <BookListTable
            books={books}
            loading={loading}
            onDelete={handleDeleteBook}
            onRefresh={fetchBooks}
          />
        );
      case 'add':
        return <AddBookForm onAddBook={handleAddBook} loading={actionLoading} />;
      case 'issue':
        return <IssueBookForm books={books} onIssueBook={handleIssueBook} loading={actionLoading} />;
      default:
        return <div>Tab not found</div>;
    }
  };

  return (
    <div className="flex min-h-screen bg-[#0b0f19] text-gray-100">
      {/* Sidebar Navigation */}
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Content Pane */}
      <main className="flex-1 p-10 overflow-y-auto max-w-7xl mx-auto w-full">
        <div className="max-w-6xl mx-auto">
          {renderTabContent()}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
