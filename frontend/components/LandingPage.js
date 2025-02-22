'use client'

import React, { useState } from 'react';
import { ChevronRight, Coins, Sprout, Users, TreePine, Sun } from 'lucide-react';

const LandingPage = () => {
  const [formData, setFormData] = useState({ firstName: '', lastName: '', email: '' });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    if (!formData.firstName || !formData.lastName || !formData.email) {
      setError('Please fill in all fields');
      return;
    }
  
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setError('Please enter a valid email address');
      return;
    }
  
    try {
      // Updated fetch call to use relative path in production
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/waitlist/submit`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
        credentials: 'include', // Add this for cookies if needed
      });
  
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || 'Submission failed');
      }
  
      setSubmitted(true);
      setFormData({ firstName: '', lastName: '', email: '' });
    } catch (err) {
      setError(err.message || 'Something went wrong. Please try again later.');
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

  const features = [
    { icon: <Users className="w-6 h-6 sm:w-8 sm:h-8" />, title: "Connect", description: "Bridge the gap between sustainable farmers and conscious investors" },
    { icon: <Coins className="w-6 h-6 sm:w-8 sm:h-8" />, title: "Invest", description: "Support sustainable farming practices with transparent blockchain tracking" },
    { icon: <TreePine className="w-6 h-6 sm:w-8 sm:h-8" />, title: "Grow", description: "Nurture the growth of regenerative agriculture worldwide" },
    { icon: <Sun className="w-6 h-6 sm:w-8 sm:h-8" />, title: "Impact", description: "Create lasting positive change for our planet's future" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-900 via-black to-emerald-900 relative overflow-hidden">
      {/* Animated Grid Lines - Responsive spacing */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Vertical Lines - Adjusted for smaller screens */}
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
        {/* Horizontal Lines - Adjusted for smaller screens */}
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
        {/* Diagonal Lines - Hidden on mobile */}
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
        {/* Header - Responsive padding and spacing */}
        <nav className="flex items-center space-x-3 py-6 sm:py-8 lg:py-12">
          <div className="relative">
            <Sprout className="w-6 h-6 sm:w-8 sm:h-8 text-emerald-400" />
            <div className="absolute inset-0 animate-ping opacity-50">
              <Sprout className="w-6 h-6 sm:w-8 sm:h-8 text-emerald-400" />
            </div>
          </div>
          <span className="text-xl sm:text-2xl font-bold">Regen Roots</span>
        </nav>

        {/* Main Content - Responsive spacing */}
        <div className="space-y-8 sm:space-y-12">
          {/* Hero Section - Responsive text sizes */}
          <div className="text-center space-y-4 sm:space-y-6">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight">{coloredTitle}</h1>
            <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto px-4">
              Join our innovative platform connecting conscious investors with sustainable farmers, 
              powered by blockchain technology for a greener tomorrow.
            </p>
          </div>

          {/* Form Section - Responsive layout */}
          <div className="max-w-4xl mx-auto w-full px-4">
            {submitted ? (
              <div className="bg-emerald-500/20 p-4 sm:p-6 rounded-xl border border-emerald-500 backdrop-blur-sm">
                <h3 className="text-lg sm:text-xl font-semibold text-emerald-400 mb-2">Welcome to the Future!</h3>
                <p>We're excited to have you join our regenerative movement.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 bg-black/20 p-4 sm:p-6 rounded-xl border border-emerald-900/50 backdrop-blur-sm">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      className="w-full px-3 py-2 bg-gray-800/50 rounded-lg focus:ring-2 focus:ring-emerald-400 outline-none"
                      placeholder="First Name"
                    />
                  </div>
                  <div>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      className="w-full px-3 py-2 bg-gray-800/50 rounded-lg focus:ring-2 focus:ring-emerald-400 outline-none"
                      placeholder="Last Name"
                    />
                  </div>
                </div>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-3 py-2 bg-gray-800/50 rounded-lg focus:ring-2 focus:ring-emerald-400 outline-none"
                  placeholder="Email Address"
                />
                {error && <div className="text-red-400 text-sm">{error}</div>}
                <button
                  type="submit"
                  className="w-full px-4 sm:px-6 py-2 sm:py-3 bg-emerald-500 hover:bg-emerald-600 rounded-lg font-semibold flex items-center justify-center gap-2 transition-all transform hover:scale-105"
                >
                  Join Waitlist
                  <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
              </form>
            )}
          </div>

          {/* Features Section - Responsive grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 max-w-6xl mx-auto px-4">
            {features.map((feature, index) => (
              <div
                key={index}
                className="p-4 sm:p-6 rounded-xl bg-gradient-to-br from-emerald-900/30 to-black/30 border border-emerald-900/30 hover:border-emerald-500/50 transition-all transform hover:-translate-y-1 backdrop-blur-sm"
              >
                <div className="text-emerald-400 mb-3 sm:mb-4">{feature.icon}</div>
                <h3 className="text-base sm:text-lg font-semibold mb-2 sm:mb-3">{feature.title}</h3>
                <p className="text-sm text-gray-300">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;