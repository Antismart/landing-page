'use client';

import React, { useState } from 'react';
import { Loader2 } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface AuthFormProps {
  type: 'login' | 'signup';
}

const AuthForm: React.FC<AuthFormProps> = ({ type }) => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    userType: 'farmer', // default to farmer
  });
  
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    
    // Basic form validation
    if (type === 'signup') {
      if (!formData.firstName || !formData.lastName) {
        setError('Please provide your full name');
        setIsLoading(false);
        return;
      }
      
      if (formData.password !== formData.confirmPassword) {
        setError('Passwords do not match');
        setIsLoading(false);
        return;
      }
    }
    
    if (!formData.email || !formData.password) {
      setError('Email and password are required');
      setIsLoading(false);
      return;
    }
    
    try {
      // This would be replaced with actual API calls in production
      // Simulating API call with timeout
      setTimeout(() => {
        console.log('Auth form submitted:', { type, ...formData });
        
        // Set authentication state in localStorage
        localStorage.setItem('isAuthenticated', 'true');
        localStorage.setItem('userType', formData.userType);
        localStorage.setItem('userEmail', formData.email);
        
        if (type === 'signup') {
          localStorage.setItem('userName', `${formData.firstName} ${formData.lastName}`);
        }
        
        // For demo purposes, we'll just redirect to the appropriate dashboard
        const dashboardPath = formData.userType === 'farmer' ? '/farmer-dashboard' : '/investor-dashboard';
        router.push(dashboardPath);
        
        setIsLoading(false);
      }, 1500);
    } catch (err) {
      console.error('Auth error:', err);
      setError('Authentication failed. Please try again.');
      setIsLoading(false);
    }
  };
  
  return (
    <div className="w-full max-w-md mx-auto px-4 sm:px-0">
      <div className="bg-black/30 rounded-xl p-5 sm:p-6 md:p-8 backdrop-blur-sm border border-emerald-900/50">
        <h2 className="text-xl sm:text-2xl font-bold text-center mb-5 sm:mb-6">
          {type === 'login' ? 'Log In' : 'Create Account'}
        </h2>
        
        <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
          {/* User Type Selection - Enhanced for mobile */}
          <div>
            <label htmlFor="userType" className="block text-sm mb-1.5 text-gray-200 font-medium">I am a:</label>
            <select
              id="userType"
              name="userType"
              value={formData.userType}
              onChange={handleChange}
              className="w-full px-3 py-2.5 bg-gray-800/50 rounded-lg focus:ring-2 focus:ring-emerald-400 outline-none text-base appearance-none"
              style={{ WebkitAppearance: 'none' }}
            >
              <option value="farmer">Farmer</option>
              <option value="investor">Investor</option>
            </select>
            <div className="relative pointer-events-none">
              <div className="absolute inset-y-0 right-0 flex items-center px-2 text-gray-400 top-[-32px]">
                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                  <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                </svg>
              </div>
            </div>
          </div>
        
          {/* Name fields (signup only) - Enhanced for mobile */}
          {type === 'signup' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              <div>
                <label htmlFor="firstName" className="block text-sm mb-1.5 text-gray-200 font-medium">First Name</label>
                <input
                  id="firstName"
                  type="text"
                  name="firstName"
                  autoComplete="given-name"
                  value={formData.firstName}
                  onChange={handleChange}
                  className="w-full px-3 py-2.5 bg-gray-800/50 rounded-lg focus:ring-2 focus:ring-emerald-400 outline-none text-base"
                  disabled={isLoading}
                />
              </div>
              <div>
                <label htmlFor="lastName" className="block text-sm mb-1.5 text-gray-200 font-medium">Last Name</label>
                <input
                  id="lastName"
                  type="text"
                  name="lastName"
                  autoComplete="family-name"
                  value={formData.lastName}
                  onChange={handleChange}
                  className="w-full px-3 py-2.5 bg-gray-800/50 rounded-lg focus:ring-2 focus:ring-emerald-400 outline-none text-base"
                  disabled={isLoading}
                />
              </div>
            </div>
          )}
          
          {/* Email - Enhanced for mobile */}
          <div>
            <label htmlFor="email" className="block text-sm mb-1.5 text-gray-200 font-medium">Email</label>
            <input
              id="email"
              type="email"
              name="email"
              autoComplete="email"
              inputMode="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-3 py-2.5 bg-gray-800/50 rounded-lg focus:ring-2 focus:ring-emerald-400 outline-none text-base"
              disabled={isLoading}
            />
          </div>
          
          {/* Password - Enhanced for mobile */}
          <div>
            <label htmlFor="password" className="block text-sm mb-1.5 text-gray-200 font-medium">Password</label>
            <input
              id="password"
              type="password"
              name="password"
              autoComplete={type === 'login' ? 'current-password' : 'new-password'}
              value={formData.password}
              onChange={handleChange}
              className="w-full px-3 py-2.5 bg-gray-800/50 rounded-lg focus:ring-2 focus:ring-emerald-400 outline-none text-base"
              disabled={isLoading}
            />
          </div>
          
          {/* Confirm Password (signup only) - Enhanced for mobile */}
          {type === 'signup' && (
            <div>
              <label htmlFor="confirmPassword" className="block text-sm mb-1.5 text-gray-200 font-medium">Confirm Password</label>
              <input
                id="confirmPassword"
                type="password"
                name="confirmPassword"
                autoComplete="new-password"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full px-3 py-2.5 bg-gray-800/50 rounded-lg focus:ring-2 focus:ring-emerald-400 outline-none text-base"
                disabled={isLoading}
              />
            </div>
          )}
          
          {/* Error message - Enhanced styling */}
          {error && (
            <div className="text-red-400 text-sm p-2.5 bg-red-900/20 rounded-lg border border-red-900/30 backdrop-blur-sm">
              {error}
            </div>
          )}
          
          {/* Submit button - Enhanced for mobile */}
          <button
            type="submit"
            disabled={isLoading}
            className={`w-full px-4 py-3 mt-2 bg-emerald-500 hover:bg-emerald-600 active:bg-emerald-700 rounded-lg font-semibold flex items-center justify-center gap-2 transition-all ${isLoading ? 'opacity-70 cursor-not-allowed' : 'transform hover:scale-[1.02] active:scale-[0.98]'} text-base`}
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 sm:w-5 sm:h-5 animate-spin" />
                {type === 'login' ? 'Logging in...' : 'Creating account...'}
              </>
            ) : (
              type === 'login' ? 'Log In' : 'Create Account'
            )}
          </button>
          
          {/* Auth toggle link - Enhanced for mobile */}
          <div className="text-center mt-4 sm:mt-5">
            <p className="text-gray-300 text-sm">
              {type === 'login' ? "Don't have an account?" : "Already have an account?"}
              {' '}
              <Link 
                href={type === 'login' ? '/signup' : '/login'}
                className="text-emerald-400 hover:text-emerald-300 active:text-emerald-500 font-medium transition-colors"
              >
                {type === 'login' ? 'Sign up' : 'Log in'}
              </Link>
            </p>
          </div>
        </form>
      </div>
      
      <div className="mt-4 text-center">
        <Link href="/" className="text-sm text-gray-300 hover:text-emerald-300 transition-colors">
          ← Back to home
        </Link>
      </div>
    </div>
  );
};

export default AuthForm;