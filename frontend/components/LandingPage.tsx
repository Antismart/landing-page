'use client'

import React, { useState } from 'react';
import { ChevronRight, Coins, Sprout, Users, TreePine, Sun, Loader2, Menu, X } from 'lucide-react';
import CryptoJS from 'crypto-js';
import Footer from './Footer';
import Link from 'next/link';
// Removed Image import

const LandingPage = () => {
  const [formData, setFormData] = useState({ firstName: '', lastName: '', email: '' });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // Use environment variable for API URL
  const apiUrl = process.env.NEXT_PUBLIC_API_URL 
    ? `${process.env.NEXT_PUBLIC_API_URL}/api/waitlist/submit`
    : '/api/waitlist/submit';

  interface ChangeEvent {
    target: {
      name: string;
      value: string;
    };
  }

  const handleChange = (e: ChangeEvent) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  interface SubmitEvent {
    preventDefault: () => void;
  }

  interface ApiResponse {
    message?: string;
  }

  const handleSubmit = async (e: SubmitEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Frontend validation for empty fields
    if (!formData.firstName || !formData.lastName || !formData.email) {
      setError('All fields are required.');
      setIsLoading(false);
      return;
    }
    
    try {
      // Encrypt the form data
      const encryptedData = CryptoJS.AES.encrypt(
        JSON.stringify(formData),
        process.env.NEXT_PUBLIC_ENCRYPTION_KEY || 'default_key'
      ).toString();

      console.log('Sending request to:', apiUrl);
      console.log('Encrypted request body:', encryptedData);
      
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
        credentials: 'include', // Add this for cookies if needed
      });
      
      console.log('Response status:', response.status);

      // Check if the response is JSON
      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        throw new Error('Received non-JSON response');
      }

      const data: ApiResponse = await response.json();
      console.log('Response data:', data);

      if (!response.ok) {
        throw new Error(data.message || 'Submission failed');
      }

      setSubmitted(true);
      setFormData({ firstName: '', lastName: '', email: '' });
    } catch (err) {
      console.error('Error details:', err);
      if (err instanceof Error) {
        setError(err.message || 'Something went wrong. Please try again later.');
      } else {
        setError('Something went wrong. Please try again later.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const titleWords = "Nurturing the Future of Regenerative Agriculture".split(" ");
  const coloredTitle = titleWords.map((word, index) => (
    <span 
      key={index} 
      className={index % 3 === 0 ? "text-emerald-400" : "text-white"}
    >
      {word}{" "}
    </span>
  ));

  // Basic features without images
  const features = [
    { 
      icon: <Users className="w-6 h-6 sm:w-8 sm:h-8" />, 
      title: "Connect", 
      description: "Bridge the gap between sustainable farmers and conscious investors"
    },
    { 
      icon: <Coins className="w-6 h-6 sm:w-8 sm:h-8" />, 
      title: "Invest", 
      description: "Support sustainable farming practices with transparent blockchain tracking"
    },
    { 
      icon: <TreePine className="w-6 h-6 sm:w-8 sm:h-8" />, 
      title: "Grow", 
      description: "Nurture the growth of regenerative agriculture worldwide"
    },
    { 
      icon: <Sun className="w-6 h-6 sm:w-8 sm:h-8" />, 
      title: "Impact", 
      description: "Create lasting positive change for our planet's future"
    }
  ];

  const navLinks = [
    { href: '/how-it-works', label: 'How It Works' },
    { href: '/for-farmers', label: 'For Farmers' },
    { href: '/for-investors', label: 'For Investors' },
    { href: '/blog', label: 'Blog' }
  ];

  // Removed image gallery

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-900 via-black to-emerald-900 relative overflow-hidden">
      {/* Animated Grid Lines */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Vertical Lines */}
        {[...Array(12)].map((_, i) => (
          <div
            key={`v-${i}`}
            className="absolute h-full w-px bg-gradient-to-b from-transparent via-gray-500/20 to-transparent animate-pulse hidden sm:block"
            style={{
              left: `${(i + 1) * 8}%`,
              animationDelay: `${i * 0.2}s`,
              opacity: 0.1 + (i % 3) * 0.2
            }}
          />
        ))}
        {/* Horizontal Lines */}
        {[...Array(8)].map((_, i) => (
          <div
            key={`h-${i}`}
            className="absolute w-full h-px bg-gradient-to-r from-transparent via-gray-500/20 to-transparent animate-pulse hidden sm:block"
            style={{
              top: `${(i + 1) * 12}%`,
              animationDelay: `${i * 0.3}s`,
              opacity: 0.1 + (i % 3) * 0.2
            }}
          />
        ))}
        {/* Diagonal Lines */}
        {[...Array(6)].map((_, i) => (
          <div
            key={`d-${i}`}
            className="absolute w-full h-px bg-gradient-to-r from-transparent via-gray-500/20 to-transparent animate-pulse hidden lg:block"
            style={{
              top: '50%',
              left: '-50%',
              transform: `rotate(${45 + i * 15}deg) translateY(${i * 100}px)`,
              animationDelay: `${i * 0.4}s`,
              opacity: 0.4 + (i % 2) * 0.9
            }}
          />
        ))}
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <nav className="flex items-center justify-between py-4 sm:py-6 lg:py-8">
          <div className="flex items-center space-x-2 sm:space-x-3">
            <div className="relative">
              <Sprout className="w-6 h-6 sm:w-8 sm:h-8 text-emerald-400" />
              <div className="absolute inset-0 animate-ping opacity-50">
                <Sprout className="w-6 h-6 sm:w-8 sm:h-8 text-emerald-400" />
              </div>
            </div>
            <span className="text-xl sm:text-2xl font-bold">Regen Roots</span>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button 
              className="p-1.5 bg-emerald-900/50 rounded-lg"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
          
          {/* Desktop navigation */}
          <div className="hidden md:flex items-center space-x-4 lg:space-x-6">
            {navLinks.map((link, index) => (
              <Link 
                key={index}
                href={link.href}
                className="text-gray-200 hover:text-emerald-400 transition-colors text-sm lg:text-base"
              >
                {link.label}
              </Link>
            ))}
          </div>
          
          <div className="hidden md:flex space-x-3 lg:space-x-4">
            <Link 
              href="/login" 
              className="px-3 py-1.5 lg:px-4 lg:py-2 bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white rounded-lg transition-colors flex items-center justify-center gap-1 text-sm lg:text-base min-w-[70px] lg:min-w-[80px]"
            >
              <span>Log In</span>
            </Link>
            <Link 
              href="/signup" 
              className="px-3 py-1.5 lg:px-4 lg:py-2 border border-emerald-500 hover:bg-emerald-600/20 active:bg-emerald-600/40 text-white rounded-lg transition-colors flex items-center justify-center gap-1 text-sm lg:text-base min-w-[70px] lg:min-w-[80px]"
            >
              <span>Sign Up</span>
            </Link>
          </div>
        </nav>
        
        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="bg-black/80 backdrop-blur-md rounded-xl border border-emerald-900/50 absolute z-50 left-0 right-0 mt-2 px-4 py-3 md:hidden">
            <div className="grid gap-2">
              {navLinks.map((link, index) => (
                <Link
                  key={index}
                  href={link.href}
                  className="text-gray-200 hover:text-emerald-400 active:text-emerald-500 transition-colors py-2 text-center"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <hr className="border-gray-700/50 my-1" />
              <div className="grid grid-cols-2 gap-2 pt-1">
                <Link 
                  href="/login" 
                  className="px-3 py-2 bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white rounded-lg transition-colors text-center text-sm"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Log In
                </Link>
                <Link 
                  href="/signup" 
                  className="px-3 py-2 border border-emerald-500 hover:bg-emerald-600/20 active:bg-emerald-600/30 text-white rounded-lg transition-colors text-center text-sm"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Sign Up
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* Main Content */}
        <div className="space-y-6 sm:space-y-8 lg:space-y-12 py-4 sm:py-6 lg:py-10 mt-2">
          {/* Hero Section without images */}
          <div className="text-center space-y-3 sm:space-y-4 lg:space-y-6 px-2 sm:px-4 relative">            
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">{coloredTitle}</h1>
            
            <div className="relative mx-auto max-w-md sm:max-w-lg md:max-w-2xl">
              <p className="text-sm sm:text-base lg:text-xl text-gray-300 max-w-3xl mx-auto px-1 relative z-10">
                Join our innovative platform connecting conscious investors with sustainable farmers, 
                powered by blockchain technology for a greener tomorrow.
              </p>
            </div>
          </div>

          {/* Form Section */}
          <div className="max-w-4xl mx-auto w-full px-2 sm:px-4">
            {submitted ? (
              <div className="bg-emerald-500/20 p-4 sm:p-6 rounded-xl border border-emerald-500 backdrop-blur-sm">
                <h3 className="text-lg sm:text-xl font-semibold text-emerald-400 mb-2">Welcome to the Future!</h3>
                <p className="text-sm sm:text-base">We're excited to have you join our regenerative movement.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4 bg-black/20 p-4 sm:p-6 rounded-xl border border-emerald-900/50 backdrop-blur-sm">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  <div>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      className="w-full px-3 py-2 bg-gray-800/50 rounded-lg focus:ring-2 focus:ring-emerald-400 outline-none text-base"
                      placeholder="First Name"
                      disabled={isLoading}
                    />
                  </div>
                  <div>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      className="w-full px-3 py-2 bg-gray-800/50 rounded-lg focus:ring-2 focus:ring-emerald-400 outline-none text-base"
                      placeholder="Last Name"
                      disabled={isLoading}
                    />
                  </div>
                </div>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-3 py-2 bg-gray-800/50 rounded-lg focus:ring-2 focus:ring-emerald-400 outline-none text-base"
                  placeholder="Email Address"
                  disabled={isLoading}
                />
                {error && <div className="text-red-400 text-sm">{error}</div>}
                <button
                  type="submit"
                  disabled={isLoading}
                  className={`w-full px-4 sm:px-6 py-2.5 sm:py-3 bg-emerald-500 hover:bg-emerald-600 active:bg-emerald-700 rounded-lg font-semibold flex items-center justify-center gap-2 transition-all ${isLoading ? 'opacity-70 cursor-not-allowed' : 'transform hover:scale-[1.02] active:scale-[0.98]'}`}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 sm:w-5 sm:h-5 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      Join Waitlist
                      <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>

          {/* Features Section without images */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6 max-w-6xl mx-auto px-2 sm:px-4">
            {features.map((feature, index) => (
              <div
                key={index}
                className="p-4 sm:p-5 lg:p-6 rounded-xl bg-gradient-to-br from-emerald-900/30 to-black/30 border border-emerald-900/30 hover:border-emerald-500/50 active:border-emerald-500/70 transition-all transform hover:-translate-y-1 active:translate-y-0 backdrop-blur-sm group"
              >
                <div className="text-emerald-400 mb-2 sm:mb-3">{feature.icon}</div>
                <h3 className="text-base sm:text-lg font-semibold mb-1.5 sm:mb-2">{feature.title}</h3>
                <p className="text-xs sm:text-sm text-gray-300">{feature.description}</p>
              </div>
            ))}
          </div>
          
          {/* Removed Image Gallery Section */}

          {/* Call to action section without images */}
          <div className="max-w-4xl mx-auto text-center px-4 py-8 sm:py-10 lg:py-12 relative">
            {/* Background glow effect */}
            <div className="absolute inset-0 bg-emerald-500/5 blur-3xl rounded-full"></div>
            
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-3 sm:mb-4 relative z-10">Ready to Join the Movement?</h2>
            <p className="text-sm sm:text-base text-gray-300 mb-6 max-w-2xl mx-auto relative z-10">
              Whether you're a farmer looking to adopt regenerative practices or an investor seeking impactful opportunities,
              we're building the future of sustainable agriculture together.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center relative z-10">
              <Link 
                href="/for-farmers" 
                className="px-4 py-2.5 sm:px-6 sm:py-3 bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white rounded-lg transition-colors flex items-center justify-center gap-2 text-sm sm:text-base"
              >
                <span>For Farmers</span>
                <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
              </Link>
              <Link 
                href="/for-investors" 
                className="px-4 py-2.5 sm:px-6 sm:py-3 border border-emerald-500 hover:bg-emerald-600/20 active:bg-emerald-600/40 text-white rounded-lg transition-colors flex items-center justify-center gap-2 text-sm sm:text-base"
              >
                <span>For Investors</span>
                <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
      
      {/* Footer */}
      <Footer />

      {/* Removed global styles for hide-scrollbar */}
    </div>
  );
};

export default LandingPage;