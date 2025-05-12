'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Coins, LineChart, Search, Wallet, BarChart2, Briefcase, PieChart, Users, Loader2, LogOut } from 'lucide-react';

export default function InvestorDashboard() {
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  
  // Set isClient to true when component mounts on client-side
  useEffect(() => {
    setIsClient(true);
    
    // Small delay to ensure hydration is complete
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);
  
  // Simple auth check - would be replaced with proper JWT/session check in production
  useEffect(() => {
    if (isClient) {
      try {
        // Only run this code on the client side
        const isLoggedIn = localStorage.getItem('isAuthenticated');
        const userType = localStorage.getItem('userType');
        
        if (!isLoggedIn) {
          router.push('/login');
        } else if (userType && userType !== 'investor') {
          // If logged in as farmer, redirect to appropriate dashboard
          router.push('/farmer-dashboard');
        }
      } catch (error) {
        console.error('Authentication error:', error);
        router.push('/login');
      }
    }
  }, [isClient, router]);

  // For demo purposes only - this would be populated from API/backend in production
  const [investorProfile, setInvestorProfile] = useState({
    name: 'Eco Ventures Capital',
    type: 'Institutional Investor',
    balance: '$250,000',
    activeInvestments: 0,
    completionPercent: 90
  });

  // Tabs state
  const [activeTab, setActiveTab] = useState('portfolio');

  const menuItems = [
    { id: 'portfolio', label: 'Portfolio Dashboard', icon: <PieChart size={20} /> },
    { id: 'opportunities', label: 'Investment Opportunities', icon: <Search size={20} /> },
    { id: 'due-diligence', label: 'Due Diligence', icon: <Briefcase size={20} /> },
    { id: 'funding', label: 'Funding Management', icon: <Wallet size={20} /> },
    { id: 'tracking', label: 'Performance Tracking', icon: <LineChart size={20} /> },
    { id: 'impact', label: 'Impact Metrics', icon: <BarChart2 size={20} /> },
    { id: 'farmers', label: 'Farmer Network', icon: <Users size={20} /> },
  ];
  
  // Handle logout
  const handleLogout = () => {
    if (isClient) {
      try {
        localStorage.removeItem('isAuthenticated');
        localStorage.removeItem('userType');
        router.push('/login');
      } catch (error) {
        console.error('Logout error:', error);
        router.push('/login');
      }
    }
  };
  
  // Sample investment opportunities
  const opportunities = [
    {
      id: 1,
      name: 'Green Valley Organics',
      location: 'Sonoma County, CA',
      size: '45 acres',
      seekingAmount: '$120,000',
      purpose: 'Equipment & Irrigation',
      returnRate: '8-10%',
      impact: 'High',
      tokenStatus: 'Ready'
    },
    {
      id: 2,
      name: 'Sunrise Regenerative Farm',
      location: 'Mendocino, CA',
      size: '65 acres',
      seekingAmount: '$180,000',
      purpose: 'Soil Restoration',
      returnRate: '7-9%',
      impact: 'Very High',
      tokenStatus: 'Ready'
    },
    {
      id: 3,
      name: 'Blue Creek Heritage Farm',
      location: 'Oregon Valley, OR',
      size: '120 acres',
      seekingAmount: '$250,000',
      purpose: 'Expansion & Equipment',
      returnRate: '9-11%',
      impact: 'Medium-High',
      tokenStatus: 'Ready'
    },
  ];
  
  // Render content based on active tab
  const renderContent = () => {
    switch (activeTab) {
      case 'portfolio':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-emerald-400">Investment Portfolio</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-black/30 p-6 rounded-xl backdrop-blur-sm border border-emerald-900/50">
                <h3 className="text-gray-400 text-sm mb-1">Available Balance</h3>
                <p className="text-2xl font-semibold">{investorProfile.balance}</p>
              </div>
              <div className="bg-black/30 p-6 rounded-xl backdrop-blur-sm border border-emerald-900/50">
                <h3 className="text-gray-400 text-sm mb-1">Active Investments</h3>
                <p className="text-2xl font-semibold">{investorProfile.activeInvestments}</p>
              </div>
              <div className="bg-black/30 p-6 rounded-xl backdrop-blur-sm border border-emerald-900/50">
                <h3 className="text-gray-400 text-sm mb-1">Impact Score</h3>
                <p className="text-2xl font-semibold">N/A</p>
              </div>
            </div>
            
            <div className="bg-black/30 rounded-xl p-6 backdrop-blur-sm border border-emerald-900/50">
              <h3 className="text-lg font-medium mb-6">Investment Activity</h3>
              
              {investorProfile.activeInvestments > 0 ? (
                <div className="space-y-4">
                  {/* Investment cards would go here */}
                </div>
              ) : (
                <div className="text-center py-12">
                  <Coins className="w-16 h-16 mx-auto text-emerald-400 mb-4" />
                  <h3 className="text-xl font-medium mb-4">No Active Investments</h3>
                  <p className="text-gray-300 max-w-md mx-auto mb-8">
                    You currently have no active investments. Explore opportunities to start investing in regenerative agriculture.
                  </p>
                  <button 
                    onClick={() => setActiveTab('opportunities')}
                    className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 transition-colors rounded-lg font-medium"
                  >
                    Explore Opportunities
                  </button>
                </div>
              )}
            </div>
          </div>
        );
      
      case 'opportunities':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-emerald-400">Investment Opportunities</h2>
            
            <div className="bg-black/30 rounded-xl p-6 backdrop-blur-sm border border-emerald-900/50">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
                <h3 className="text-lg font-medium">Available Farms</h3>
                <div className="mt-4 md:mt-0">
                  <div className="relative">
                    <input 
                      type="text" 
                      placeholder="Search opportunities..." 
                      className="pl-10 pr-4 py-2 bg-gray-800/50 rounded-lg focus:ring-2 focus:ring-emerald-400 outline-none text-sm w-full md:w-64"
                    />
                    <Search className="absolute left-3 top-2.5 text-gray-400 w-4 h-4" />
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                {opportunities.map(opportunity => (
                  <div 
                    key={opportunity.id} 
                    className="bg-emerald-900/20 rounded-lg p-4 border border-emerald-900/30 hover:border-emerald-400/50 transition-all cursor-pointer"
                  >
                    <div className="flex flex-col md:flex-row justify-between">
                      <div>
                        <h4 className="font-medium text-lg">{opportunity.name}</h4>
                        <p className="text-gray-400 text-sm">{opportunity.location} · {opportunity.size}</p>
                      </div>
                      <div className="mt-2 md:mt-0 flex items-center">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-200 text-emerald-800 mr-2">
                          Tokenized
                        </span>
                        <span className="text-emerald-400 font-semibold">{opportunity.seekingAmount}</span>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-4">
                      <div>
                        <p className="text-xs text-gray-400">Purpose</p>
                        <p className="text-sm">{opportunity.purpose}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-400">Expected Return</p>
                        <p className="text-sm">{opportunity.returnRate}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-400">Impact Rating</p>
                        <p className="text-sm">{opportunity.impact}</p>
                      </div>
                      <div className="flex justify-start md:justify-end items-center">
                        <button className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 transition-colors rounded-lg text-sm">
                          View Details
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      
      default:
        return (
          <div className="bg-black/30 rounded-xl p-6 backdrop-blur-sm border border-emerald-900/50">
            <div className="text-center py-8">
              <h3 className="text-xl font-medium mb-4">Feature Coming Soon</h3>
              <p className="text-gray-300 max-w-md mx-auto">
                This feature is currently in development and will be available soon. Check back later for updates!
              </p>
            </div>
          </div>
        );
    }
  };

  // If we're still on the server or loading, show a minimal loading state
  if (!isClient || isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-900 via-black to-emerald-900 flex items-center justify-center">
        <div className="flex flex-col items-center">
          <Loader2 className="w-10 h-10 animate-spin text-emerald-400 mb-4" />
          <div className="text-emerald-300">Loading dashboard...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-900 via-black to-emerald-900">
      {/* Header */}
      <header className="bg-black/40 border-b border-emerald-900/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2 text-emerald-400 hover:text-emerald-300 transition-colors mr-8">
              <ArrowLeft size={16} />
              <span>Back to Home</span>
            </Link>
            <h1 className="text-xl font-bold hidden sm:block">Investor Dashboard</h1>
          </div>
          
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-300">Welcome, Investor</span>
            <div className="h-8 w-8 rounded-full bg-emerald-600 flex items-center justify-center mr-2">
              <span className="font-medium text-sm">I</span>
            </div>
            <button 
              onClick={handleLogout}
              className="px-3 py-1.5 bg-emerald-900/50 hover:bg-emerald-800 text-white rounded-lg transition-colors flex items-center gap-2 text-sm border border-emerald-700/30"
              aria-label="Log out"
            >
              <LogOut size={16} />
              <span className="hidden sm:inline">Log Out</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Menu */}
          <div className="w-full lg:w-64">
            <div className="bg-black/30 backdrop-blur-sm rounded-xl border border-emerald-900/50 overflow-hidden">
              <ul>
                {menuItems.map(item => (
                  <li key={item.id}>
                    <button
                      onClick={() => setActiveTab(item.id)}
                      className={`w-full flex items-center space-x-3 px-4 py-3 hover:bg-emerald-900/20 transition-colors ${activeTab === item.id ? 'bg-emerald-900/40 border-l-2 border-emerald-400' : ''}`}
                    >
                      <span className={`${activeTab === item.id ? 'text-emerald-400' : 'text-gray-400'}`}>{item.icon}</span>
                      <span>{item.label}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Content Area */}
          <div className="flex-1">
            {renderContent()}
          </div>
        </div>
      </div>
    </div>
  );
}