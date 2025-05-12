'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Tractor, Sprout, LineChart, ClipboardList, Scan, CreditCard, Calendar, Leaf, Loader2, LogOut, Menu, X, ArrowUpRight, CheckCircle, Clock, FileText, MessageSquare, Plus } from 'lucide-react';

export default function FarmerDashboard() {
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userName, setUserName] = useState('');
  
  // Set isClient to true when component mounts on client-side
  useEffect(() => {
    setIsClient(true);
    
    // Small delay to ensure hydration is complete
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 100);
    
    const storedName = localStorage.getItem('userName') || 'Farmer';
    setUserName(storedName);

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
        } else if (userType && userType !== 'farmer') {
          // If logged in as investor, redirect to appropriate dashboard
          router.push('/investor-dashboard');
        }
      } catch (error) {
        console.error('Authentication error:', error);
        router.push('/login');
      }
    }
  }, [isClient, router]);

  // For demo purposes only - this would be populated from API/backend in production
  const [farmProfile, setFarmProfile] = useState({
    name: 'Green Valley Organics',
    location: 'Muranga County, Kenya',
    size: '45 acres',
    status: 'Tokenization Eligible',
    completionPercent: 85,
    verification: 'Pending'
  });

  // Tabs state
  const [activeTab, setActiveTab] = useState('profile');

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
    setMobileMenuOpen(false); // Close mobile menu when tab is selected
  };

  const menuItems = [
    { id: 'profile', label: 'Farm Profile', icon: <Tractor size={20} /> },
    { id: 'assessment', label: 'Assessment', icon: <Sprout size={20} /> },
    { id: 'tokenization', label: 'Tokenization', icon: <Scan size={20} /> },
    { id: 'loans', label: 'Loan Applications', icon: <CreditCard size={20} /> },
    { id: 'implementation', label: 'Implementation', icon: <ClipboardList size={20} /> },
    { id: 'monitoring', label: 'Monitoring', icon: <LineChart size={20} /> },
    { id: 'marketplace', label: 'Marketplace', icon: <Leaf size={20} /> },
    { id: 'payments', label: 'Payments', icon: <Calendar size={20} /> },
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
  
  // Dummy data for the dashboard
  const projects = [
    {
      id: 1,
      title: 'Almond Orchard Regeneration',
      status: 'active',
      progress: 65,
      nextMilestone: 'Soil carbon validation',
      daysLeft: 14,
    },
    {
      id: 2,
      title: 'Vineyard Cover Cropping',
      status: 'pending',
      progress: 30,
      nextMilestone: 'Investor approval',
      daysLeft: 5,
    }
  ];
  
  const notifications = [
    {
      id: 1, 
      type: 'message',
      content: 'New message from InvestEarth Capital',
      time: '2 hours ago'
    },
    {
      id: 2, 
      type: 'document',
      content: 'Soil carbon analysis report ready',
      time: '1 day ago'
    },
    {
      id: 3, 
      type: 'milestone',
      content: 'Milestone "Cover crop planting" completed',
      time: '3 days ago'
    }
  ];
  
  // Render content based on active tab
  const renderContent = () => {
    switch (activeTab) {
      case 'profile':
        return (
          <div className="space-y-4 sm:space-y-6">
            <h2 className="text-xl sm:text-2xl font-bold text-emerald-400">Farm Profile</h2>
            <div className="bg-black/30 rounded-xl p-4 sm:p-6 backdrop-blur-sm border border-emerald-900/50">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                <div>
                  <div className="h-48 sm:h-64 bg-emerald-800/30 rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <Tractor className="w-12 h-12 sm:w-16 sm:h-16 mx-auto text-emerald-400 mb-2" />
                      <p className="text-gray-300 text-sm sm:text-base">Farm Image Placeholder</p>
                    </div>
                  </div>
                </div>
                <div className="space-y-3 sm:space-y-4">
                  <div>
                    <p className="text-gray-400 text-xs sm:text-sm">Farm Name</p>
                    <p className="text-base sm:text-lg font-medium">{farmProfile.name}</p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-xs sm:text-sm">Location</p>
                    <p className="text-sm sm:text-base">{farmProfile.location}</p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-xs sm:text-sm">Land Size</p>
                    <p className="text-sm sm:text-base">{farmProfile.size}</p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-xs sm:text-sm">Verification Status</p>
                    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-yellow-200 text-yellow-800">
                      {farmProfile.verification}
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 sm:mt-8">
                <h3 className="text-base sm:text-lg font-medium mb-2 sm:mb-4">Profile Completion</h3>
                <div className="w-full bg-gray-700 rounded-full h-3 sm:h-4">
                  <div 
                    className="bg-emerald-500 h-3 sm:h-4 rounded-full" 
                    style={{ width: `${farmProfile.completionPercent}%` }}
                  ></div>
                </div>
                <p className="mt-2 text-xs sm:text-sm text-gray-400">
                  {farmProfile.completionPercent}% complete. Complete your profile to enable full platform access.
                </p>
              </div>
              
              <div className="mt-6 sm:mt-8 flex flex-wrap gap-2 sm:gap-4">
                <button className="px-3 py-1.5 sm:px-4 sm:py-2 bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 transition-colors rounded-lg flex items-center gap-2 text-sm sm:text-base">
                  <span>Edit Profile</span>
                </button>
                <button className="px-3 py-1.5 sm:px-4 sm:py-2 bg-gray-700 hover:bg-gray-600 active:bg-gray-800 transition-colors rounded-lg flex items-center gap-2 text-sm sm:text-base">
                  <span>Upload Documents</span>
                </button>
              </div>
            </div>
          </div>
        );
      
      case 'assessment':
        return (
          <div className="space-y-4 sm:space-y-6">
            <h2 className="text-xl sm:text-2xl font-bold text-emerald-400">Farm Assessment</h2>
            <div className="bg-black/30 rounded-xl p-4 sm:p-6 backdrop-blur-sm border border-emerald-900/50">
              <div className="text-center py-6 sm:py-12">
                <Sprout className="w-12 h-12 sm:w-16 sm:h-16 mx-auto text-emerald-400 mb-3 sm:mb-4" />
                <h3 className="text-lg sm:text-xl font-medium mb-2">Assessment In Progress</h3>
                <p className="text-gray-300 text-sm sm:text-base max-w-md mx-auto mb-4 sm:mb-6 px-2">
                  Our experts are currently analyzing your farm's regenerative potential. This process typically takes 5-7 business days.
                </p>
                <div className="w-full max-w-md mx-auto bg-gray-700 rounded-full h-3 sm:h-4 px-2 sm:px-0">
                  <div className="bg-emerald-500 h-3 sm:h-4 rounded-full w-1/2"></div>
                </div>
                <p className="mt-2 text-xs sm:text-sm text-gray-400">
                  50% complete
                </p>
              </div>
            </div>
          </div>
        );
      
      case 'tokenization':
        return (
          <div className="space-y-4 sm:space-y-6">
            <h2 className="text-xl sm:text-2xl font-bold text-emerald-400">Farm Tokenization</h2>
            <div className="bg-black/30 rounded-xl p-4 sm:p-6 backdrop-blur-sm border border-emerald-900/50">
              <div className="text-center py-6 sm:py-8">
                <Scan className="w-12 h-12 sm:w-16 sm:h-16 mx-auto text-emerald-400 mb-3 sm:mb-4" />
                <h3 className="text-lg sm:text-xl font-medium mb-3 sm:mb-4">Ready for Tokenization</h3>
                <p className="text-gray-300 text-sm sm:text-base max-w-md mx-auto mb-6 sm:mb-8 px-2">
                  Your farm has been assessed and is eligible for tokenization. Begin the process to unlock funding opportunities.
                </p>
                <button className="px-4 py-2 sm:px-6 sm:py-3 bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 transition-colors rounded-lg text-sm sm:text-base font-medium">
                  Start Tokenization Process
                </button>
              </div>
            </div>
          </div>
        );

      case 'loans':
        return (
          <div className="space-y-4 sm:space-y-6">
            <h2 className="text-xl sm:text-2xl font-bold text-emerald-400">Loan Applications</h2>
            <div className="bg-black/30 rounded-xl p-4 sm:p-6 backdrop-blur-sm border border-emerald-900/50">
              <div className="text-center py-6 sm:py-8">
                <CreditCard className="w-12 h-12 sm:w-16 sm:h-16 mx-auto text-emerald-400 mb-3 sm:mb-4" />
                <h3 className="text-lg sm:text-xl font-medium mb-3 sm:mb-4">No Active Loan Applications</h3>
                <p className="text-gray-300 text-sm sm:text-base max-w-md mx-auto mb-6 sm:mb-8 px-2">
                  You currently have no active loan applications. Complete the tokenization process to access funding opportunities.
                </p>
                <button disabled className="px-4 py-2 sm:px-6 sm:py-3 bg-gray-600 cursor-not-allowed opacity-70 rounded-lg text-sm sm:text-base font-medium">
                  Apply for Funding (Complete Tokenization First)
                </button>
              </div>
            </div>
          </div>
        );

      default:
        return (
          <div className="bg-black/30 rounded-xl p-4 sm:p-6 backdrop-blur-sm border border-emerald-900/50">
            <div className="text-center py-6 sm:py-8">
              <h3 className="text-lg sm:text-xl font-medium mb-3 sm:mb-4">Feature Coming Soon</h3>
              <p className="text-gray-300 text-sm sm:text-base max-w-md mx-auto px-2">
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
      <header className="bg-black/40 border-b border-emerald-900/50 backdrop-blur-sm sticky top-0 z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4 flex items-center justify-between">
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2 text-emerald-400 hover:text-emerald-300 transition-colors mr-4 sm:mr-8">
              <ArrowLeft size={16} />
              <span className="text-sm sm:text-base">Home</span>
            </Link>
            <h1 className="text-base sm:text-xl font-bold hidden sm:block">Farmer Dashboard</h1>
            
            {/* Mobile menu button */}
            <button 
              className="p-1.5 sm:hidden bg-emerald-900/50 rounded-lg ml-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
          
          <div className="flex items-center space-x-2 sm:space-x-4">
            <span className="text-xs sm:text-sm text-gray-300 hidden sm:inline">Welcome, {userName.split(' ')[0]}</span>
            <div className="h-7 w-7 sm:h-8 sm:w-8 rounded-full bg-emerald-600 flex items-center justify-center">
              <span className="font-medium text-xs sm:text-sm">F</span>
            </div>
            <button 
              onClick={handleLogout}
              className="p-1.5 sm:px-3 sm:py-1.5 bg-emerald-900/50 hover:bg-emerald-800 active:bg-emerald-900 text-white rounded-lg transition-colors flex items-center gap-2 border border-emerald-700/30"
              aria-label="Log out"
            >
              <LogOut size={16} />
              <span className="hidden sm:inline text-sm">Log Out</span>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 bg-black/80 z-10 lg:hidden overflow-y-auto pt-16 pb-6 px-4">
          <nav className="max-w-md mx-auto">
            <div className="bg-black/60 backdrop-blur-md rounded-xl border border-emerald-900/50 overflow-hidden mb-4">
              <ul>
                {menuItems.map(item => (
                  <li key={item.id}>
                    <button
                      onClick={() => handleTabChange(item.id)}
                      className={`w-full flex items-center space-x-3 px-4 py-3 hover:bg-emerald-900/20 active:bg-emerald-900/40 transition-colors ${activeTab === item.id ? 'bg-emerald-900/40 border-l-2 border-emerald-400' : ''}`}
                    >
                      <span className={`${activeTab === item.id ? 'text-emerald-400' : 'text-gray-400'}`}>{item.icon}</span>
                      <span>{item.label}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </nav>
        </div>
      )}

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
        <div className="flex flex-col lg:flex-row gap-4 sm:gap-8">
          {/* Sidebar Menu - Hidden on mobile, visible on larger screens */}
          <div className="w-full lg:w-64 hidden lg:block">
            <div className="bg-black/30 backdrop-blur-sm rounded-xl border border-emerald-900/50 overflow-hidden sticky top-24">
              <ul>
                {menuItems.map(item => (
                  <li key={item.id}>
                    <button
                      onClick={() => handleTabChange(item.id)}
                      className={`w-full flex items-center space-x-3 px-4 py-3 hover:bg-emerald-900/20 active:bg-emerald-900/40 transition-colors ${activeTab === item.id ? 'bg-emerald-900/40 border-l-2 border-emerald-400' : ''}`}
                    >
                      <span className={`${activeTab === item.id ? 'text-emerald-400' : 'text-gray-400'}`}>{item.icon}</span>
                      <span>{item.label}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Mobile Tab Indicator - only on small screens */}
          <div className="lg:hidden mb-2">
            <h2 className="text-lg font-medium text-emerald-300 px-1">
              {menuItems.find(item => item.id === activeTab)?.label || 'Dashboard'}
            </h2>
          </div>

          {/* Content Area */}
          <div className="flex-1">
            {renderContent()}
          </div>
        </div>
      </div>
      
      {/* Main Dashboard Content */}
      <main className="container mx-auto px-4 sm:px-6 py-6 sm:py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Projects */}
          <div className="lg:col-span-2">
            <div className="bg-black/30 rounded-xl p-5 sm:p-6 backdrop-blur-sm border border-emerald-900/50">
              <div className="flex justify-between items-center mb-5">
                <h2 className="text-lg font-bold">My Projects</h2>
                <Link href="/farmer-dashboard#all-projects" className="text-emerald-400 text-sm flex items-center gap-1 hover:text-emerald-300 transition-colors">
                  View all
                  <ArrowUpRight size={14} />
                </Link>
              </div>
              
              <div className="space-y-4">
                {projects.map(project => (
                  <div key={project.id} className="bg-gray-900/50 rounded-lg p-4 sm:p-5 border border-gray-800/80">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-0">
                      <h3 className="font-medium">{project.title}</h3>
                      <span className={`text-xs px-2.5 py-1 rounded-full flex items-center w-fit
                        ${project.status === 'active' 
                          ? 'bg-emerald-900/40 text-emerald-300 border border-emerald-900/70' 
                          : 'bg-amber-900/30 text-amber-300 border border-amber-900/50'
                        }`}
                      >
                        {project.status === 'active' ? (
                          <>
                            <CheckCircle size={12} className="mr-1" />
                            Active
                          </>
                        ) : (
                          <>
                            <Clock size={12} className="mr-1" />
                            Pending
                          </>
                        )}
                      </span>
                    </div>
                    
                    {/* Progress Bar */}
                    <div className="mt-4">
                      <div className="flex justify-between text-sm mb-1.5">
                        <span className="text-gray-400">Progress</span>
                        <span className="text-emerald-300">{project.progress}%</span>
                      </div>
                      <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-emerald-500 rounded-full"
                          style={{ width: `${project.progress}%` }}
                        ></div>
                      </div>
                    </div>
                    
                    {/* Project Details */}
                    <div className="mt-4 pt-4 border-t border-gray-800/80 grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                      <div>
                        <span className="text-gray-400 block">Next milestone:</span>
                        <span>{project.nextMilestone}</span>
                      </div>
                      <div>
                        <span className="text-gray-400 block">Due in:</span>
                        <span className="text-amber-300">{project.daysLeft} days</span>
                      </div>
                    </div>
                    
                    {/* Action Buttons */}
                    <div className="mt-4 flex flex-col xs:flex-row gap-3">
                      <Link 
                        href={`/farmer-dashboard/project/${project.id}`}
                        className="px-3.5 py-2 bg-emerald-900/40 hover:bg-emerald-800/50 border border-emerald-900/60 rounded-lg text-sm flex items-center justify-center flex-1 transition-all"
                      >
                        View Details
                      </Link>
                      <Link
                        href={`/farmer-dashboard/update/${project.id}`}
                        className="px-3.5 py-2 bg-gray-800/70 hover:bg-gray-700/80 border border-gray-800 rounded-lg text-sm flex items-center justify-center flex-1 transition-all"
                      >
                        Submit Update
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Quick Add Project */}
              <div className="mt-6 bg-emerald-900/20 rounded-lg p-5 border border-emerald-900/40 flex flex-col xs:flex-row gap-4 items-center justify-between">
                <div>
                  <h3 className="font-medium text-emerald-300">Ready to start a new project?</h3>
                  <p className="text-sm text-gray-300 mt-1">Create a new regenerative agriculture project and find investors.</p>
                </div>
                <Link
                  href="/farmer-dashboard/new-project"
                  className="whitespace-nowrap px-4 py-2.5 bg-emerald-600 hover:bg-emerald-500 rounded-lg text-sm flex items-center justify-center gap-2 font-medium transition-all w-full xs:w-auto"
                >
                  <Plus size={16} />
                  Create Project
                </Link>
              </div>
            </div>
            
            {/* Financial Overview */}
            <div className="bg-black/30 rounded-xl p-5 sm:p-6 backdrop-blur-sm border border-emerald-900/50 mt-6">
              <h2 className="text-lg font-bold mb-5">Financial Overview</h2>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-gray-900/50 rounded-lg p-4 border border-gray-800/80">
                  <h4 className="text-gray-400 text-sm">Total Funding</h4>
                  <p className="text-xl font-bold mt-2">$145,000</p>
                  <p className="text-emerald-400 text-sm mt-1">+$25,000 this month</p>
                </div>
                
                <div className="bg-gray-900/50 rounded-lg p-4 border border-gray-800/80">
                  <h4 className="text-gray-400 text-sm">Pending Milestones</h4>
                  <p className="text-xl font-bold mt-2">$32,500</p>
                  <p className="text-amber-400 text-sm mt-1">2 milestones</p>
                </div>
                
                <div className="bg-gray-900/50 rounded-lg p-4 border border-gray-800/80">
                  <h4 className="text-gray-400 text-sm">Carbon Credits</h4>
                  <p className="text-xl font-bold mt-2">43 tons</p>
                  <p className="text-emerald-400 text-sm mt-1">Est. value: $3,440</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Right Column - Notifications & Resources */}
          <div className="space-y-6">
            {/* Notifications */}
            <div className="bg-black/30 rounded-xl p-5 sm:p-6 backdrop-blur-sm border border-emerald-900/50">
              <div className="flex justify-between items-center mb-5">
                <h2 className="text-lg font-bold">Notifications</h2>
                <Link href="/farmer-dashboard#all-notifications" className="text-emerald-400 text-sm hover:text-emerald-300 transition-colors">
                  View all
                </Link>
              </div>
              
              <div className="space-y-3">
                {notifications.map(notification => (
                  <div 
                    key={notification.id}
                    className="px-3 py-2.5 bg-gray-900/50 rounded-lg border border-gray-800/80 flex gap-3 items-center"
                  >
                    {notification.type === 'message' ? (
                      <div className="bg-blue-900/30 p-2 rounded-lg">
                        <MessageSquare size={16} className="text-blue-400" />
                      </div>
                    ) : notification.type === 'document' ? (
                      <div className="bg-amber-900/30 p-2 rounded-lg">
                        <FileText size={16} className="text-amber-400" />
                      </div>
                    ) : (
                      <div className="bg-emerald-900/30 p-2 rounded-lg">
                        <CheckCircle size={16} className="text-emerald-400" />
                      </div>
                    )}
                    
                    <div className="flex-1 min-w-0">
                      <p className="text-sm truncate">{notification.content}</p>
                      <p className="text-xs text-gray-500 mt-0.5">{notification.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Resources */}
            <div className="bg-black/30 rounded-xl p-5 sm:p-6 backdrop-blur-sm border border-emerald-900/50">
              <h2 className="text-lg font-bold mb-5">Resources</h2>
              
              <div className="space-y-3">
                <Link
                  href="/guide/carbon-credits"
                  className="block px-4 py-3 bg-gray-900/50 hover:bg-gray-900/70 rounded-lg border border-gray-800/80 transition-all"
                >
                  <h4 className="font-medium">Carbon Credit Guide</h4>
                  <p className="text-sm text-gray-400 mt-1">Learn how to maximize your carbon credit potential</p>
                </Link>
                
                <Link
                  href="/guide/soil-health"
                  className="block px-4 py-3 bg-gray-900/50 hover:bg-gray-900/70 rounded-lg border border-gray-800/80 transition-all"
                >
                  <h4 className="font-medium">Soil Health Practices</h4>
                  <p className="text-sm text-gray-400 mt-1">Best practices for regenerative agriculture</p>
                </Link>
                
                <Link
                  href="/guide/investor-pitching"
                  className="block px-4 py-3 bg-gray-900/50 hover:bg-gray-900/70 rounded-lg border border-gray-800/80 transition-all"
                >
                  <h4 className="font-medium">Investor Pitching</h4>
                  <p className="text-sm text-gray-400 mt-1">How to create compelling project proposals</p>
                </Link>
              </div>
              
              <Link
                href="/farmer-resources"
                className="mt-4 block text-center px-4 py-2.5 bg-gray-800 hover:bg-gray-700 rounded-lg text-sm font-medium transition-all"
              >
                View All Resources
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}