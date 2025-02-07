import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, User, Home } from 'lucide-react';
import { login } from '../lib/auth';

const Login = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    role: 'guest' as 'guest' | 'host',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await login(formData);
      navigate('/');
    } catch (error) {
      // Error is handled by login function
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-6 sm:py-12 px-4 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="text-center text-2xl sm:text-3xl font-extrabold text-gray-900">
          Sign in to your account
        </h2>
      </div>

      <div className="mt-6 sm:mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-6 sm:py-8 px-4 sm:px-10 shadow sm:rounded-lg">
          <form className="space-y-5 sm:space-y-6" onSubmit={handleSubmit}>
            {/* Role Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Sign in as
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, role: 'guest' })}
                  className={`flex items-center justify-center p-3 rounded-lg border-2 transition-colors ${
                    formData.role === 'guest'
                      ? 'border-[#2DD4BF] bg-[#2DD4BF]/10 text-[#2DD4BF]'
                      : 'border-gray-200 hover:border-[#2DD4BF]'
                  }`}
                >
                  <User className="h-5 w-5 sm:h-6 sm:w-6 mr-2" />
                  <span className="text-sm sm:text-base">Guest</span>
                </button>
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, role: 'host' })}
                  className={`flex items-center justify-center p-3 rounded-lg border-2 transition-colors ${
                    formData.role === 'host'
                      ? 'border-[#2DD4BF] bg-[#2DD4BF]/10 text-[#2DD4BF]'
                      : 'border-gray-200 hover:border-[#2DD4BF]'
                  }`}
                >
                  <Home className="h-5 w-5 sm:h-6 sm:w-6 mr-2" />
                  <span className="text-sm sm:text-base">Host</span>
                </button>
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="appearance-none block w-full pl-10 px-3 py-2 sm:py-3 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-[#2DD4BF] focus:border-[#2DD4BF] text-sm sm:text-base"
                  placeholder="Enter your email"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="appearance-none block w-full pl-10 px-3 py-2 sm:py-3 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-[#2DD4BF] focus:border-[#2DD4BF] text-sm sm:text-base"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-400" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-400" />
                  )}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center py-2.5 sm:py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm sm:text-base font-medium text-white bg-[#2DD4BF] hover:bg-[#2DD4BF]/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#2DD4BF] disabled:opacity-50 transition-colors"
            >
              {loading ? (
                <svg className="animate-spin h-5 w-5 sm:h-6 sm:w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              ) : (
                'Sign in'
              )}
            </button>

            <div className="text-center">
              <p className="text-sm sm:text-base text-gray-600">
                Don't have an account?{' '}
                <Link
                  to="/register"
                  className="font-medium text-[#2DD4BF] hover:text-[#2DD4BF]/90 transition-colors"
                >
                  Sign Up
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;