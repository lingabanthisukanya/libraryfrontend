import React, { useState, useContext, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { Mail, Lock, User, Shield, AlertTriangle, Eye, EyeOff, Library } from 'lucide-react';
import loginCardBg from '../assets/login_card_bg.png';

const Login = () => {
  const { login, register, error, setError, user } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  // Mode state: 'login' or 'register'
  const [isLogin, setIsLogin] = useState(true);

  // Form states
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('Librarian');

  // Input view toggle
  const [showPassword, setShowPassword] = useState(false);

  // Client validation errors
  const [validationErrors, setValidationErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  // Redirect if already logged in
  const from = location.state?.from?.pathname || '/dashboard';
  useEffect(() => {
    if (user) {
      navigate(from, { replace: true });
    }
  }, [user, navigate, from]);

  // Reset errors when swapping modes
  useEffect(() => {
    setError(null);
    setValidationErrors({});
  }, [isLogin, setError]);

  // Client side validation
  const validateForm = () => {
    const errors = {};
    if (!isLogin && !name.trim()) {
      errors.name = 'Full name is required';
    }
    
    if (!email) {
      errors.email = 'Email address is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = 'Please enter a valid email address';
    }

    if (!password) {
      errors.password = 'Password is required';
    } else if (password.length < 6) {
      errors.password = 'Password must be at least 6 characters';
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setSubmitting(true);
    setError(null);

    try {
      if (isLogin) {
        await login(email, password);
        // Navigate on success (handled by useEffect, but manual fallback below)
        navigate(from, { replace: true });
      } else {
        await register(name, email, password, role);
        navigate(from, { replace: true });
      }
    } catch (err) {
      console.error('Authentication Error:', err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0b0f19] flex items-center justify-center px-4 relative overflow-hidden">
      {/* Decent Background Image Overlay */}
      <div className="absolute inset-0 z-0 opacity-15 pointer-events-none">
        <img src={loginCardBg} alt="Background Grid" className="w-full h-full object-cover" />
      </div>
      {/* Decorative gradients */}
      <div className="absolute top-[-10%] right-[-10%] w-[400px] h-[400px] rounded-full bg-indigo-500/10 blur-[100px] pointer-events-none"></div>
      <div className="absolute bottom-[-10%] left-[-10%] w-[400px] h-[400px] rounded-full bg-purple-500/10 blur-[100px] pointer-events-none"></div>

      <div className="w-full max-w-md relative z-10">
        {/* Logo and Greeting */}
        <div className="text-center mb-8 flex flex-col items-center">
          <Link to="/" className="inline-flex items-center space-x-2.5 mb-2 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/25 group-hover:scale-105 transition-transform duration-300">
              <Library className="w-5.5 h-5.5 text-white" />
            </div>
            <span className="text-2xl font-bold tracking-tight text-white">
              Libraro
            </span>
          </Link>
          <p className="text-gray-400 text-sm">
            {isLogin ? 'Sign in to access your dashboard' : 'Create an administrative library account'}
          </p>
        </div>

        {/* Auth Card */}
        <div className="glass p-8 rounded-3xl shadow-2xl relative">
          {/* Form Toggle Slider */}
          <div className="flex bg-[#0f172a] p-1 rounded-xl mb-8 border border-gray-800/40">
            <button
              onClick={() => setIsLogin(true)}
              type="button"
              className={`flex-1 py-2 text-sm font-semibold rounded-lg transition-all duration-300 ${
                isLogin ? 'bg-indigo-600 text-white shadow-md' : 'text-gray-400 hover:text-gray-200'
              }`}
            >
              Sign In
            </button>
            <button
              onClick={() => setIsLogin(false)}
              type="button"
              className={`flex-1 py-2 text-sm font-semibold rounded-lg transition-all duration-300 ${
                !isLogin ? 'bg-indigo-600 text-white shadow-md' : 'text-gray-400 hover:text-gray-200'
              }`}
            >
              Register
            </button>
          </div>

          {/* Server Error Alert */}
          {error && (
            <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-xl flex items-start gap-3 text-red-400 text-sm">
              <AlertTriangle className="w-5 h-5 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Name field (Register only) */}
            {!isLogin && (
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Full Name</label>
                <div className="relative">
                  <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Jane Doe"
                    className={`w-full bg-[#0f172a] border ${
                      validationErrors.name ? 'border-red-500/50 focus:ring-red-500/20' : 'border-gray-800/80 focus:border-indigo-500 focus:ring-indigo-500/20'
                    } rounded-xl py-3 pl-11 pr-4 text-gray-100 placeholder-gray-600 text-sm focus:outline-none focus:ring-4 transition-all duration-300`}
                  />
                </div>
                {validationErrors.name && (
                  <p className="text-red-400 text-xs font-medium">{validationErrors.name}</p>
                )}
              </div>
            )}

            {/* Email field */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@library.com"
                  className={`w-full bg-[#0f172a] border ${
                    validationErrors.email ? 'border-red-500/50 focus:ring-red-500/20' : 'border-gray-800/80 focus:border-indigo-500 focus:ring-indigo-500/20'
                  } rounded-xl py-3 pl-11 pr-4 text-gray-100 placeholder-gray-600 text-sm focus:outline-none focus:ring-4 transition-all duration-300`}
                />
              </div>
              {validationErrors.email && (
                <p className="text-red-400 text-xs font-medium">{validationErrors.email}</p>
              )}
            </div>

            {/* Password field */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Password</label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className={`w-full bg-[#0f172a] border ${
                    validationErrors.password ? 'border-red-500/50 focus:ring-red-500/20' : 'border-gray-800/80 focus:border-indigo-500 focus:ring-indigo-500/20'
                  } rounded-xl py-3 pl-11 pr-10 text-gray-100 placeholder-gray-600 text-sm focus:outline-none focus:ring-4 transition-all duration-300`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              {validationErrors.password && (
                <p className="text-red-400 text-xs font-medium">{validationErrors.password}</p>
              )}
            </div>

            {/* Role Field (Register only) */}
            {!isLogin && (
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Security Role</label>
                <div className="relative">
                  <Shield className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                  <select
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    className="w-full bg-[#0f172a] border border-gray-800/85 rounded-xl py-3 pl-11 pr-4 text-gray-100 text-sm focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/20 transition-all duration-300 appearance-none cursor-pointer"
                  >
                    <option value="Librarian">Librarian (View Only / Standard Access)</option>
                    <option value="Admin">Admin (Full Control / CRUD & Issuing)</option>
                  </select>
                </div>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={submitting}
              className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 disabled:opacity-50 text-white font-semibold rounded-xl py-3.5 mt-2 transition-all duration-300 shadow-lg shadow-indigo-600/15 hover:shadow-indigo-600/25 active:scale-[0.98] flex items-center justify-center"
            >
              {submitting ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : isLogin ? (
                'Sign In'
              ) : (
                'Create Account'
              )}
            </button>
          </form>

          {/* Quick Credential Tip (Login only) */}
          {isLogin && (
            <div className="mt-6 pt-5 border-t border-gray-800/30 text-center">
              <span className="text-xs font-semibold text-indigo-400/80 bg-indigo-500/5 px-3 py-1 rounded-full">
                Demo: admin@library.com | admin123
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
