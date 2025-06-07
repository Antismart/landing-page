'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  ArrowLeft, Tractor, Sprout, LineChart, Scan, CreditCard, 
  Leaf, Loader2, LogOut, Menu, X, CheckCircle, 
  Clock, FileText, MessageSquare, Plus, TrendingUp, DollarSign, 
  Award, BarChart3, Zap, Star, Bell
} from 'lucide-react';

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
  const [farmProfile] = useState({
    name: 'Green Valley Organics',
    location: 'Muranga County, Kenya',
    size: '45 acres',
    status: 'Tokenization Eligible',
    completionPercent: 85,
    verification: 'Verified',
    crops: ['Maize', 'Beans', 'Coffee'],
    carbonCredits: 43,
    monthlyRevenue: 12500,
    projectsCount: 3
  });

  // Enhanced stats data
  const dashboardStats = [
    {
      title: 'Total Funding',
      value: '$145,000',
      change: '+$25,000',
      changeType: 'increase',
      icon: DollarSign,
      color: 'emerald'
    },
    {
      title: 'Carbon Credits',
      value: '43 tons',
      change: '+8 tons',
      changeType: 'increase',
      icon: Leaf,
      color: 'green'
    },
    {
      title: 'Active Projects',
      value: '3',
      change: '+1 project',
      changeType: 'increase',
      icon: BarChart3,
      color: 'blue'
    },
    {
      title: 'Monthly Revenue',
      value: '$12,500',
      change: '+15%',
      changeType: 'increase',
      icon: TrendingUp,
      color: 'violet'
    }
  ];

  // Tabs state
  const [activeTab, setActiveTab] = useState('overview');

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
    setMobileMenuOpen(false); // Close mobile menu when tab is selected
  };

  const menuItems = [
    { id: 'overview', label: 'Overview', icon: <BarChart3 size={20} />, description: 'Dashboard overview' },
    { id: 'profile', label: 'Farm Profile', icon: <Tractor size={20} />, description: 'Manage farm details' },
    { id: 'projects', label: 'Projects', icon: <Sprout size={20} />, description: 'Active projects' },
    { id: 'tokenization', label: 'Tokenization', icon: <Scan size={20} />, description: 'Asset tokenization' },
    { id: 'funding', label: 'Funding', icon: <CreditCard size={20} />, description: 'Financial resources' },
    { id: 'monitoring', label: 'Monitoring', icon: <LineChart size={20} />, description: 'Progress tracking' },
    { id: 'marketplace', label: 'Marketplace', icon: <Leaf size={20} />, description: 'Carbon credits' },
    { id: 'rewards', label: 'Rewards', icon: <Award size={20} />, description: 'Achievements' },
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
      case 'overview':
        return (
          <div className="space-y-6">
            {/* Welcome Section */}
            <div className="bg-gradient-to-r from-emerald-900/30 to-green-900/30 rounded-2xl p-6 backdrop-blur-sm border border-emerald-800/50">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
                    Welcome back, {userName.split(' ')[0]} 👋
                  </h1>
                  <p className="text-emerald-200 text-sm sm:text-base">
                    {farmProfile.name} • {farmProfile.location}
                  </p>
                </div>
                <div className="hidden sm:flex items-center space-x-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-emerald-300">{farmProfile.projectsCount}</div>
                    <div className="text-xs text-gray-400">Projects</div>
                  </div>
                  <div className="w-px h-12 bg-emerald-800"></div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-emerald-300">{farmProfile.carbonCredits}</div>
                    <div className="text-xs text-gray-400">Carbon Credits</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {dashboardStats.map((stat, index) => {
                const IconComponent = stat.icon;
                return (
                  <div key={index} className="bg-black/30 backdrop-blur-sm rounded-xl p-4 border border-emerald-900/50 hover:border-emerald-700/50 transition-all group">
                    <div className="flex items-center justify-between mb-3">
                      <div className={`p-2 rounded-lg bg-${stat.color}-900/30`}>
                        <IconComponent className={`w-5 h-5 text-${stat.color}-400`} />
                      </div>
                      <span className="text-xs text-gray-400 group-hover:text-gray-300 transition-colors">
                        {stat.changeType === 'increase' ? '↗' : '↘'}
                      </span>
                    </div>
                    <div className="space-y-1">
                      <p className="text-lg sm:text-xl font-bold text-white">{stat.value}</p>
                      <p className="text-xs text-gray-400">{stat.title}</p>
                      <p className={`text-xs ${stat.changeType === 'increase' ? 'text-emerald-400' : 'text-red-400'}`}>
                        {stat.change}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Quick Actions */}
            <div className="bg-black/30 backdrop-blur-sm rounded-xl p-6 border border-emerald-900/50">
              <h2 className="text-lg font-bold text-white mb-4">Quick Actions</h2>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <button 
                  onClick={() => setActiveTab('projects')}
                  className="flex flex-col items-center p-4 bg-emerald-900/30 hover:bg-emerald-800/40 rounded-lg transition-all group"
                >
                  <Sprout className="w-8 h-8 text-emerald-400 mb-2 group-hover:scale-110 transition-transform" />
                  <span className="text-sm font-medium text-white">View Projects</span>
                </button>
                <button 
                  onClick={() => setActiveTab('tokenization')}
                  className="flex flex-col items-center p-4 bg-blue-900/30 hover:bg-blue-800/40 rounded-lg transition-all group"
                >
                  <Scan className="w-8 h-8 text-blue-400 mb-2 group-hover:scale-110 transition-transform" />
                  <span className="text-sm font-medium text-white">Tokenize Farm</span>
                </button>
                <button 
                  onClick={() => setActiveTab('funding')}
                  className="flex flex-col items-center p-4 bg-violet-900/30 hover:bg-violet-800/40 rounded-lg transition-all group"
                >
                  <CreditCard className="w-8 h-8 text-violet-400 mb-2 group-hover:scale-110 transition-transform" />
                  <span className="text-sm font-medium text-white">Get Funding</span>
                </button>
                <button 
                  onClick={() => setActiveTab('marketplace')}
                  className="flex flex-col items-center p-4 bg-green-900/30 hover:bg-green-800/40 rounded-lg transition-all group"
                >
                  <Leaf className="w-8 h-8 text-green-400 mb-2 group-hover:scale-110 transition-transform" />
                  <span className="text-sm font-medium text-white">Marketplace</span>
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Recent Activity */}
              <div className="lg:col-span-2 bg-black/30 backdrop-blur-sm rounded-xl p-6 border border-emerald-900/50">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-bold text-white">Recent Projects</h2>
                  <button 
                    onClick={() => setActiveTab('projects')}
                    className="text-emerald-400 text-sm hover:text-emerald-300 transition-colors"
                  >
                    View All
                  </button>
                </div>
                <div className="space-y-4">
                  {projects.slice(0, 2).map(project => (
                    <div key={project.id} className="bg-gray-900/50 rounded-lg p-4 border border-gray-800/80 hover:border-gray-700/80 transition-all">
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="font-medium text-white">{project.title}</h3>
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          project.status === 'active' 
                            ? 'bg-emerald-900/40 text-emerald-300' 
                            : 'bg-amber-900/30 text-amber-300'
                        }`}>
                          {project.status}
                        </span>
                      </div>
                      <div className="mb-3">
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-gray-400">Progress</span>
                          <span className="text-emerald-300">{project.progress}%</span>
                        </div>
                        <div className="w-full bg-gray-800 rounded-full h-2">
                          <div 
                            className="bg-emerald-500 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${project.progress}%` }}
                          ></div>
                        </div>
                      </div>
                      <div className="flex justify-between text-sm text-gray-400">
                        <span>Next: {project.nextMilestone}</span>
                        <span>{project.daysLeft} days left</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Notifications & Updates */}
              <div className="bg-black/30 backdrop-blur-sm rounded-xl p-6 border border-emerald-900/50">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-bold text-white">Updates</h2>
                  <Bell className="w-5 h-5 text-gray-400" />
                </div>
                <div className="space-y-3">
                  {notifications.slice(0, 3).map(notification => (
                    <div key={notification.id} className="bg-gray-900/50 rounded-lg p-3 border border-gray-800/80">
                      <div className="flex items-start gap-3">
                        {notification.type === 'message' ? (
                          <div className="bg-blue-900/30 p-1.5 rounded">
                            <MessageSquare className="w-4 h-4 text-blue-400" />
                          </div>
                        ) : notification.type === 'document' ? (
                          <div className="bg-amber-900/30 p-1.5 rounded">
                            <FileText className="w-4 h-4 text-amber-400" />
                          </div>
                        ) : (
                          <div className="bg-emerald-900/30 p-1.5 rounded">
                            <CheckCircle className="w-4 h-4 text-emerald-400" />
                          </div>
                        )}
                        <div className="flex-1 min-w-0">
                          <p className="text-sm text-white leading-tight">{notification.content}</p>
                          <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );

      case 'profile':
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-white">Farm Profile</h2>
              <div className="flex gap-3">
                <button className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 rounded-lg text-sm font-medium transition-colors">
                  Edit Profile
                </button>
                <button className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-sm font-medium transition-colors">
                  Upload Documents
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Farm Overview */}
              <div className="lg:col-span-2 bg-black/30 backdrop-blur-sm rounded-xl p-6 border border-emerald-900/50">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="h-48 bg-gradient-to-br from-emerald-800/30 to-green-800/30 rounded-lg flex items-center justify-center border border-emerald-700/30">
                      <div className="text-center">
                        <Tractor className="w-16 h-16 mx-auto text-emerald-400 mb-3" />
                        <p className="text-gray-300">Farm Image</p>
                        <button className="mt-2 text-sm text-emerald-400 hover:text-emerald-300">Upload Photo</button>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="text-gray-400 text-sm">Farm Name</label>
                      <p className="text-lg font-medium text-white">{farmProfile.name}</p>
                    </div>
                    <div>
                      <label className="text-gray-400 text-sm">Location</label>
                      <p className="text-white">{farmProfile.location}</p>
                    </div>
                    <div>
                      <label className="text-gray-400 text-sm">Land Size</label>
                      <p className="text-white">{farmProfile.size}</p>
                    </div>
                    <div>
                      <label className="text-gray-400 text-sm">Primary Crops</label>
                      <div className="flex flex-wrap gap-2 mt-1">
                        {farmProfile.crops.map((crop, index) => (
                          <span key={index} className="px-2 py-1 bg-emerald-900/40 text-emerald-300 rounded text-sm">
                            {crop}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t border-gray-800/80">
                  <h3 className="text-lg font-medium text-white mb-4">Profile Completion</h3>
                  <div className="w-full bg-gray-800 rounded-full h-3">
                    <div 
                      className="bg-gradient-to-r from-emerald-500 to-green-500 h-3 rounded-full transition-all duration-500"
                      style={{ width: `${farmProfile.completionPercent}%` }}
                    ></div>
                  </div>
                  <p className="mt-2 text-sm text-gray-400">
                    {farmProfile.completionPercent}% complete. Complete your profile to unlock all features.
                  </p>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="space-y-4">
                <div className="bg-black/30 backdrop-blur-sm rounded-xl p-4 border border-emerald-900/50">
                  <div className="text-center">
                    <div className="w-12 h-12 bg-emerald-900/30 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Scan className="w-6 h-6 text-emerald-400" />
                    </div>
                    <h3 className="font-medium text-white">Verification Status</h3>
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-emerald-900/40 text-emerald-300 mt-2">
                      {farmProfile.verification}
                    </span>
                  </div>
                </div>

                <div className="bg-black/30 backdrop-blur-sm rounded-xl p-4 border border-emerald-900/50">
                  <div className="text-center">
                    <div className="w-12 h-12 bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Leaf className="w-6 h-6 text-green-400" />
                    </div>
                    <h3 className="font-medium text-white">Carbon Credits</h3>
                    <p className="text-2xl font-bold text-green-400 mt-1">{farmProfile.carbonCredits}</p>
                    <p className="text-sm text-gray-400">tons CO₂</p>
                  </div>
                </div>

                <div className="bg-black/30 backdrop-blur-sm rounded-xl p-4 border border-emerald-900/50">
                  <div className="text-center">
                    <div className="w-12 h-12 bg-violet-900/30 rounded-full flex items-center justify-center mx-auto mb-3">
                      <DollarSign className="w-6 h-6 text-violet-400" />
                    </div>
                    <h3 className="font-medium text-white">Monthly Revenue</h3>
                    <p className="text-2xl font-bold text-violet-400 mt-1">${farmProfile.monthlyRevenue.toLocaleString()}</p>
                    <p className="text-sm text-gray-400">estimated</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'projects':
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-white">Projects</h2>
              <Link
                href="/farmer-dashboard/new-project"
                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 rounded-lg text-sm font-medium transition-colors flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                New Project
              </Link>
            </div>

            <div className="grid gap-6">
              {projects.map(project => (
                <div key={project.id} className="bg-black/30 backdrop-blur-sm rounded-xl p-6 border border-emerald-900/50 hover:border-emerald-700/50 transition-all">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-white mb-1">{project.title}</h3>
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                        project.status === 'active' 
                          ? 'bg-emerald-900/40 text-emerald-300 border border-emerald-700/50' 
                          : 'bg-amber-900/30 text-amber-300 border border-amber-700/50'
                      }`}>
                        {project.status === 'active' ? (
                          <>
                            <CheckCircle className="w-4 h-4 mr-1" />
                            Active
                          </>
                        ) : (
                          <>
                            <Clock className="w-4 h-4 mr-1" />
                            Pending
                          </>
                        )}
                      </span>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-emerald-400">{project.progress}%</p>
                      <p className="text-sm text-gray-400">Complete</p>
                    </div>
                  </div>

                  <div className="mb-4">
                    <div className="w-full bg-gray-800 rounded-full h-3">
                      <div 
                        className="bg-gradient-to-r from-emerald-500 to-green-500 h-3 rounded-full transition-all duration-500"
                        style={{ width: `${project.progress}%` }}
                      ></div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                    <div>
                      <p className="text-gray-400 text-sm">Next Milestone</p>
                      <p className="text-white font-medium">{project.nextMilestone}</p>
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">Time Remaining</p>
                      <p className="text-amber-300 font-medium">{project.daysLeft} days</p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <Link 
                      href={`/farmer-dashboard/project/${project.id}`}
                      className="flex-1 px-4 py-2 bg-emerald-900/40 hover:bg-emerald-800/50 border border-emerald-700/50 rounded-lg text-sm font-medium text-center transition-all"
                    >
                      View Details
                    </Link>
                    <Link
                      href={`/farmer-dashboard/update/${project.id}`}
                      className="flex-1 px-4 py-2 bg-gray-800/70 hover:bg-gray-700/80 border border-gray-700 rounded-lg text-sm font-medium text-center transition-all"
                    >
                      Submit Update
                    </Link>
                  </div>
                </div>
              ))}
            </div>

            {/* Create New Project CTA */}
            <div className="bg-gradient-to-r from-emerald-900/30 to-green-900/30 rounded-xl p-6 border border-emerald-700/50">
              <div className="text-center">
                <Sprout className="w-12 h-12 mx-auto text-emerald-400 mb-3" />
                <h3 className="text-xl font-bold text-white mb-2">Start Your Next Project</h3>
                <p className="text-gray-300 mb-4">Ready to expand your regenerative impact? Create a new project and connect with investors.</p>
                <Link
                  href="/farmer-dashboard/new-project"
                  className="inline-flex items-center px-6 py-3 bg-emerald-600 hover:bg-emerald-700 rounded-lg font-medium transition-colors"
                >
                  <Plus className="w-5 h-5 mr-2" />
                  Create New Project
                </Link>
              </div>
            </div>
          </div>
        );

      case 'tokenization':
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-white">Farm Tokenization</h2>
              <span className="px-3 py-1 bg-emerald-900/40 text-emerald-300 rounded-full text-sm">
                Eligible
              </span>
            </div>

            <div className="bg-gradient-to-r from-emerald-900/30 to-green-900/30 rounded-xl p-6 border border-emerald-700/50">
              <div className="text-center">
                <div className="w-16 h-16 bg-emerald-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Scan className="w-8 h-8 text-emerald-400" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Ready for Tokenization</h3>
                <p className="text-gray-300 mb-6 max-w-md mx-auto">
                  Your farm has been assessed and meets all requirements for tokenization. Start the process to unlock funding opportunities.
                </p>
                <button className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 rounded-lg font-medium transition-colors">
                  Begin Tokenization Process
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-black/30 backdrop-blur-sm rounded-xl p-6 border border-emerald-900/50">
                <div className="text-center">
                  <div className="w-12 h-12 bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-3">
                    <CheckCircle className="w-6 h-6 text-blue-400" />
                  </div>
                  <h3 className="font-bold text-white mb-2">Assessment Complete</h3>
                  <p className="text-sm text-gray-400">Farm evaluation passed with high scores</p>
                </div>
              </div>

              <div className="bg-black/30 backdrop-blur-sm rounded-xl p-6 border border-emerald-900/50">
                <div className="text-center">
                  <div className="w-12 h-12 bg-emerald-900/30 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Scan className="w-6 h-6 text-emerald-400" />
                  </div>
                  <h3 className="font-bold text-white mb-2">Documentation Ready</h3>
                  <p className="text-sm text-gray-400">All required documents verified</p>
                </div>
              </div>

              <div className="bg-black/30 backdrop-blur-sm rounded-xl p-6 border border-emerald-900/50">
                <div className="text-center">
                  <div className="w-12 h-12 bg-violet-900/30 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Star className="w-6 h-6 text-violet-400" />
                  </div>
                  <h3 className="font-bold text-white mb-2">High Impact Score</h3>
                  <p className="text-sm text-gray-400">Excellent regenerative potential</p>
                </div>
              </div>
            </div>
          </div>
        );

      case 'funding':
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-white">Funding Management</h2>
              <button className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 rounded-lg text-sm font-medium transition-colors">
                Apply for Funding
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-black/30 backdrop-blur-sm rounded-xl p-6 border border-emerald-900/50">
                <div className="text-center">
                  <div className="w-12 h-12 bg-emerald-900/30 rounded-full flex items-center justify-center mx-auto mb-3">
                    <DollarSign className="w-6 h-6 text-emerald-400" />
                  </div>
                  <h3 className="font-bold text-white mb-2">Total Funding</h3>
                  <p className="text-2xl font-bold text-emerald-400">$145,000</p>
                  <p className="text-sm text-gray-400 mt-1">+$25,000 this month</p>
                </div>
              </div>

              <div className="bg-black/30 backdrop-blur-sm rounded-xl p-6 border border-emerald-900/50">
                <div className="text-center">
                  <div className="w-12 h-12 bg-amber-900/30 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Clock className="w-6 h-6 text-amber-400" />
                  </div>
                  <h3 className="font-bold text-white mb-2">Pending Milestones</h3>
                  <p className="text-2xl font-bold text-amber-400">$32,500</p>
                  <p className="text-sm text-gray-400 mt-1">2 milestones due</p>
                </div>
              </div>

              <div className="bg-black/30 backdrop-blur-sm rounded-xl p-6 border border-emerald-900/50">
                <div className="text-center">
                  <div className="w-12 h-12 bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-3">
                    <TrendingUp className="w-6 h-6 text-blue-400" />
                  </div>
                  <h3 className="font-bold text-white mb-2">ROI Performance</h3>
                  <p className="text-2xl font-bold text-blue-400">12.5%</p>
                  <p className="text-sm text-gray-400 mt-1">Above target</p>
                </div>
              </div>
            </div>

            <div className="bg-black/30 backdrop-blur-sm rounded-xl p-6 border border-emerald-900/50">
              <h3 className="text-lg font-bold text-white mb-4">Funding Opportunities</h3>
              <div className="bg-gradient-to-r from-emerald-900/30 to-green-900/30 rounded-lg p-4 border border-emerald-700/50 text-center">
                <CreditCard className="w-12 h-12 mx-auto text-emerald-400 mb-3" />
                <h4 className="font-bold text-white mb-2">Ready to Apply</h4>
                <p className="text-gray-300 mb-4">Complete tokenization to unlock funding opportunities from our investor network.</p>
                <button 
                  onClick={() => setActiveTab('tokenization')}
                  className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 rounded-lg font-medium transition-colors"
                >
                  Complete Tokenization First
                </button>
              </div>
            </div>
          </div>
        );

      case 'monitoring':
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-white">Progress Monitoring</h2>
              <select className="px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-sm">
                <option>Last 30 days</option>
                <option>Last 90 days</option>
                <option>Last year</option>
              </select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-black/30 backdrop-blur-sm rounded-xl p-6 border border-emerald-900/50">
                <h3 className="text-lg font-bold text-white mb-4">Carbon Sequestration</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Current Month</span>
                    <span className="text-emerald-400 font-bold">3.2 tons CO₂</span>
                  </div>
                  <div className="w-full bg-gray-800 rounded-full h-2">
                    <div className="bg-emerald-500 h-2 rounded-full" style={{ width: '65%' }}></div>
                  </div>
                  <p className="text-sm text-gray-400">65% of monthly target achieved</p>
                </div>
              </div>

              <div className="bg-black/30 backdrop-blur-sm rounded-xl p-6 border border-emerald-900/50">
                <h3 className="text-lg font-bold text-white mb-4">Soil Health Score</h3>
                <div className="text-center">
                  <div className="text-4xl font-bold text-green-400 mb-2">8.2</div>
                  <p className="text-sm text-gray-400">out of 10</p>
                  <div className="mt-4 flex justify-center space-x-1">
                    {[...Array(8)].map((_, i) => (
                      <div key={i} className="w-2 h-2 bg-green-500 rounded-full"></div>
                    ))}
                    {[...Array(2)].map((_, i) => (
                      <div key={i} className="w-2 h-2 bg-gray-600 rounded-full"></div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'marketplace':
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-white">Carbon Credit Marketplace</h2>
              <div className="flex gap-3">
                <button className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 rounded-lg text-sm font-medium transition-colors">
                  List Credits
                </button>
                <button className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-sm font-medium transition-colors">
                  View Market
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-black/30 backdrop-blur-sm rounded-xl p-6 border border-emerald-900/50">
                <h3 className="text-lg font-bold text-white mb-4">Your Carbon Credits</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Available Credits</span>
                    <span className="text-emerald-400 font-bold">{farmProfile.carbonCredits} tons</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Market Value</span>
                    <span className="text-white font-bold">$3,440</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Current Rate</span>
                    <span className="text-green-400 font-bold">$80/ton</span>
                  </div>
                </div>
              </div>

              <div className="bg-black/30 backdrop-blur-sm rounded-xl p-6 border border-emerald-900/50">
                <h3 className="text-lg font-bold text-white mb-4">Market Trends</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">7-day change</span>
                    <span className="text-emerald-400 font-bold">+5.2%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">30-day high</span>
                    <span className="text-white font-bold">$85/ton</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">30-day low</span>
                    <span className="text-white font-bold">$75/ton</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'rewards':
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-white">Achievements & Rewards</h2>
              <div className="text-right">
                <p className="text-sm text-gray-400">Total Points</p>
                <p className="text-2xl font-bold text-emerald-400">2,450</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-gradient-to-br from-emerald-900/30 to-green-900/30 rounded-xl p-6 border border-emerald-700/50">
                <div className="text-center">
                  <div className="w-16 h-16 bg-emerald-900/40 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Award className="w-8 h-8 text-emerald-400" />
                  </div>
                  <h3 className="font-bold text-white mb-2">Regeneration Pioneer</h3>
                  <p className="text-sm text-gray-300">First successful carbon credit generation</p>
                  <span className="inline-block mt-3 px-3 py-1 bg-emerald-900/40 text-emerald-300 rounded-full text-xs">
                    Earned
                  </span>
                </div>
              </div>

              <div className="bg-gradient-to-br from-blue-900/30 to-violet-900/30 rounded-xl p-6 border border-blue-700/50">
                <div className="text-center">
                  <div className="w-16 h-16 bg-blue-900/40 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Star className="w-8 h-8 text-blue-400" />
                  </div>
                  <h3 className="font-bold text-white mb-2">Project Master</h3>
                  <p className="text-sm text-gray-300">Complete 3 successful projects</p>
                  <span className="inline-block mt-3 px-3 py-1 bg-blue-900/40 text-blue-300 rounded-full text-xs">
                    Earned
                  </span>
                </div>
              </div>

              <div className="bg-black/30 backdrop-blur-sm rounded-xl p-6 border border-gray-700 opacity-60">
                <div className="text-center">
                  <div className="w-16 h-16 bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Zap className="w-8 h-8 text-gray-500" />
                  </div>
                  <h3 className="font-bold text-gray-400 mb-2">Carbon Champion</h3>
                  <p className="text-sm text-gray-500">Generate 100 tons of carbon credits</p>
                  <span className="inline-block mt-3 px-3 py-1 bg-gray-700 text-gray-400 rounded-full text-xs">
                    In Progress (43/100)
                  </span>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return (
          <div className="bg-black/30 rounded-xl p-8 backdrop-blur-sm border border-emerald-900/50 text-center">
            <h3 className="text-xl font-medium text-white mb-4">Feature Coming Soon</h3>
            <p className="text-gray-400 max-w-md mx-auto">
              This feature is currently in development and will be available soon. Check back later for updates!
            </p>
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
    </div>
  );
}