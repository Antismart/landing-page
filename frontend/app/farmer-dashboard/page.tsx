'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  ArrowLeft, Tractor, Sprout, LineChart, Scan, CreditCard, 
  Leaf, LogOut, X, CheckCircle, 
  Clock, FileText, MessageSquare, Plus, TrendingUp, DollarSign, 
  Award, BarChart3, Zap, Star, Bell, Settings, Wifi, WifiOff, 
  Activity, Battery, Signal, Thermometer, Droplets, Wind
} from 'lucide-react';

interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  unit: string;
  stock: number;
  status: 'active' | 'sold_out';
  description: string;
  listedDate: string;
  image: string;
}

interface Device {
  id: number;
  name: string;
  type: string;
  status: string;
  battery: number;
  lastUpdate: string;
  location: string;
  readings: {
    moisture?: number;
    ph?: number;
    temperature?: number;
    humidity?: number;
    rainfall?: number;
    wind?: number;
    growth?: number;
    ndvi?: number;
    health?: string;
    waterUsage?: number;
    efficiency?: number;
    status?: string;
  };
}

interface ProductData {
  name: string;
  category: string;
  price: number;
  unit: string;
  stock: number;
  description: string;
  image: string;
}

export default function FarmerDashboard() {
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);
  const [userName, setUserName] = useState('');
  const [deviceConfigOpen, setDeviceConfigOpen] = useState(false);
  
  // Marketplace states
  const [listProductOpen, setListProductOpen] = useState(false);
  const [analyticsOpen, setAnalyticsOpen] = useState(false);
  const [editProductOpen, setEditProductOpen] = useState(false);
  const [viewProductOpen, setViewProductOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  
  const [devices, setDevices] = useState<Device[]>([
    {
      id: 1,
      name: 'Soil Sensor #1',
      type: 'soil',
      status: 'online',
      battery: 85,
      lastUpdate: '2 min ago',
      location: 'Field A - North',
      readings: { moisture: 72, ph: 6.8, temperature: 24 }
    },
    {
      id: 2,
      name: 'Weather Station',
      type: 'weather',
      status: 'online',
      battery: 92,
      lastUpdate: '1 min ago',
      location: 'Central Location',
      readings: { humidity: 68, rainfall: 2.4, wind: 12 }
    },
    {
      id: 3,
      name: 'Crop Monitor #2',
      type: 'crop',
      status: 'online',
      battery: 78,
      lastUpdate: '3 min ago',
      location: 'Field B - South',
      readings: { growth: 2.1, ndvi: 0.82, health: 'Excellent' }
    },
    {
      id: 4,
      name: 'Irrigation Controller',
      type: 'irrigation',
      status: 'standby',
      battery: 65,
      lastUpdate: '5 min ago',
      location: 'Irrigation Hub',
      readings: { waterUsage: 245, efficiency: 94, status: 'Standby' }
    }
  ]);
  
  // Sample product data
  const [products, setProducts] = useState<Product[]>([
    {
      id: 1,
      name: 'Organic Kale',
      category: 'Vegetables',
      price: 3.50,
      unit: 'bunch',
      stock: 24,
      status: 'active',
      description: 'Fresh, organically grown kale bunches. Ready for harvest.',
      listedDate: '2 days ago',
      image: 'kale'
    },
    {
      id: 2,
      name: 'Heritage Tomatoes',
      category: 'Vegetables',
      price: 5.00,
      unit: 'lb',
      stock: 180,
      status: 'active',
      description: 'Heirloom variety tomatoes, vine-ripened and chemical-free.',
      listedDate: '5 days ago',
      image: 'tomatoes'
    },
    {
      id: 3,
      name: 'Organic Maize',
      category: 'Grains',
      price: 2.20,
      unit: 'kg',
      stock: 0,
      status: 'sold_out',
      description: 'Non-GMO yellow maize, perfect for local communities.',
      listedDate: '1 week ago',
      image: 'maize'
    }
  ]);
  
  // Set isClient to true when component mounts on client-side
  useEffect(() => {
    setIsClient(true);
    
    const storedName = localStorage.getItem('userName') || 'Farmer';
    setUserName(storedName);
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

  const menuItems = [
    { id: 'overview', label: 'Overview', icon: <BarChart3 size={20} />, description: 'Dashboard overview' },
    { id: 'profile', label: 'Farm Profile', icon: <Tractor size={20} />, description: 'Manage farm details' },
    { id: 'projects', label: 'Projects', icon: <Sprout size={20} />, description: 'Active projects' },
    { id: 'tokenization', label: 'Tokenization', icon: <Scan size={20} />, description: 'Asset tokenization' },
    { id: 'funding', label: 'Funding', icon: <CreditCard size={20} />, description: 'Financial resources' },
    { id: 'monitoring', label: 'Monitoring', icon: <LineChart size={20} />, description: 'Progress tracking' },
    { id: 'marketplace', label: 'Marketplace', icon: <Leaf size={20} />, description: 'List farm products' },
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

  // Device configuration handlers
  const handleDeviceConfig = (device: Device) => {
    // In a real app, this would open device-specific configuration
    alert(`Configuring ${device.name}...`);
  };

  const handleDeviceCalibrate = (device: Device) => {
    setDevices(prevDevices => 
      prevDevices.map(d => 
        d.id === device.id 
          ? { ...d, lastUpdate: 'Calibrating...' }
          : d
      )
    );
    
    // Simulate calibration process
    setTimeout(() => {
      setDevices(prevDevices => 
        prevDevices.map(d => 
          d.id === device.id 
            ? { ...d, lastUpdate: 'Just now', status: 'online' }
            : d
        )
      );
      alert(`${device.name} calibrated successfully!`);
    }, 2000);
  };

  const handleDeviceRestart = (device: Device) => {
    setDevices(prevDevices => 
      prevDevices.map(d => 
        d.id === device.id 
          ? { ...d, status: 'restarting', lastUpdate: 'Restarting...' }
          : d
      )
    );
    
    // Simulate restart process
    setTimeout(() => {
      setDevices(prevDevices => 
        prevDevices.map(d => 
          d.id === device.id 
            ? { ...d, status: 'online', lastUpdate: 'Just now' }
            : d
        )
      );
      alert(`${device.name} restarted successfully!`);
    }, 3000);
  };

  const handleAddDevice = () => {
    alert('Add Device functionality would open here...');
    setDeviceConfigOpen(false);
  };

  const handleRunDiagnostics = () => {
    alert('Running diagnostics on all devices...');
    setDevices(prevDevices => 
      prevDevices.map(d => ({ ...d, lastUpdate: 'Diagnosing...' }))
    );
    
    // Simulate diagnostics
    setTimeout(() => {
      setDevices(prevDevices => 
        prevDevices.map(d => ({ ...d, lastUpdate: 'Just now' }))
      );
      alert('Diagnostics completed. All devices are functioning normally.');
    }, 4000);
  };

  const handleExportData = () => {
    const dataToExport = {
      devices: devices,
      exportDate: new Date().toISOString(),
      farmProfile: farmProfile
    };
    
    // In a real app, this would trigger a file download
    console.log('Exporting data:', dataToExport);
    alert('Device data exported successfully! Check your downloads folder.');
  };

  // Marketplace handlers
  const handleListNewProduct = () => {
    setListProductOpen(true);
  };

  const handleViewAnalytics = () => {
    setAnalyticsOpen(true);
  };

  const handleEditProduct = (product: Product) => {
    setSelectedProduct(product);
    setEditProductOpen(true);
  };

  const handleViewProduct = (product: Product) => {
    setSelectedProduct(product);
    setViewProductOpen(true);
  };

  const handleRelistProduct = (product: Product) => {
    setProducts(prevProducts => 
      prevProducts.map(p => 
        p.id === product.id 
          ? { ...p, status: 'active' as const, stock: 50, listedDate: 'Just now' }
          : p
      )
    );
    alert(`${product.name} has been relisted successfully!`);
  };

  const handleCreateProduct = (productData: ProductData) => {
    const newProduct: Product = {
      id: products.length + 1,
      ...productData,
      status: 'active' as const,
      listedDate: 'Just now'
    };
    setProducts(prevProducts => [...prevProducts, newProduct]);
    setListProductOpen(false);
    alert('Product listed successfully!');
  };

  const handleUpdateProduct = (productData: Partial<ProductData>) => {
    if (!selectedProduct) return;
    
    setProducts(prevProducts => 
      prevProducts.map(p => 
        p.id === selectedProduct.id 
          ? { ...p, ...productData }
          : p
      )
    );
    setEditProductOpen(false);
    alert('Product updated successfully!');
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
                  <span className="text-sm font-medium text-white">Sell Products</span>
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
              <h2 className="text-2xl font-bold text-white">Farm Monitoring & AI Insights</h2>
              <div className="flex gap-3">
                <button 
                  onClick={() => setDeviceConfigOpen(true)}
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 rounded-lg text-sm font-medium transition-colors"
                >
                  Configure Devices
                </button>
                <select className="px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-sm">
                  <option>Last 24 hours</option>
                  <option>Last 7 days</option>
                  <option>Last 30 days</option>
                </select>
              </div>
            </div>

            {/* IoT Device Status */}
            <div className="bg-black/30 backdrop-blur-sm rounded-xl p-6 border border-emerald-900/50">
              <h3 className="text-lg font-bold text-white mb-4">IoT Device Network</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-gray-900/50 rounded-lg p-4 border border-gray-800/50">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-gray-300 text-sm">Soil Sensor #1</span>
                    <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                  </div>
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span className="text-gray-400">Moisture:</span>
                      <span className="text-blue-400">72%</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-gray-400">pH Level:</span>
                      <span className="text-green-400">6.8</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-gray-400">Temperature:</span>
                      <span className="text-amber-400">24°C</span>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-900/50 rounded-lg p-4 border border-gray-800/50">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-gray-300 text-sm">Weather Station</span>
                    <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                  </div>
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span className="text-gray-400">Humidity:</span>
                      <span className="text-blue-400">68%</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-gray-400">Rainfall:</span>
                      <span className="text-emerald-400">2.4mm</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-gray-400">Wind:</span>
                      <span className="text-gray-300">12 km/h</span>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-900/50 rounded-lg p-4 border border-gray-800/50">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-gray-300 text-sm">Crop Monitor #2</span>
                    <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                  </div>
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span className="text-gray-400">Growth Rate:</span>
                      <span className="text-green-400">+2.1cm</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-gray-400">NDVI Index:</span>
                      <span className="text-emerald-400">0.82</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-gray-400">Health:</span>
                      <span className="text-green-400">Excellent</span>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-900/50 rounded-lg p-4 border border-gray-800/50">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-gray-300 text-sm">Irrigation Ctrl</span>
                    <div className="w-3 h-3 bg-amber-500 rounded-full animate-pulse"></div>
                  </div>
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span className="text-gray-400">Status:</span>
                      <span className="text-amber-400">Standby</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-gray-400">Water Usage:</span>
                      <span className="text-blue-400">245L</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-gray-400">Efficiency:</span>
                      <span className="text-green-400">94%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* WeatherXM Integration */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-black/30 backdrop-blur-sm rounded-xl p-6 border border-emerald-900/50">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold text-white">WeatherXM Data</h3>
                  <span className="px-2 py-1 bg-blue-900/40 text-blue-300 rounded-full text-xs">Live</span>
                </div>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-400">26°C</div>
                      <div className="text-sm text-gray-400">Temperature</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-emerald-400">65%</div>
                      <div className="text-sm text-gray-400">Humidity</div>
                    </div>
                  </div>
                  <div className="border-t border-gray-800 pt-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-gray-400">7-Day Forecast</span>
                      <span className="text-green-400 text-sm">Optimal conditions</span>
                    </div>
                    <div className="bg-gray-900/50 rounded-lg p-3">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-300">Expected Rainfall:</span>
                        <span className="text-blue-400">12-15mm</span>
                      </div>
                      <div className="flex justify-between text-sm mt-1">
                        <span className="text-gray-300">Avg Temperature:</span>
                        <span className="text-amber-400">24-28°C</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-black/30 backdrop-blur-sm rounded-xl p-6 border border-emerald-900/50">
                <h3 className="text-lg font-bold text-white mb-4">AI-Powered Insights</h3>
                <div className="space-y-4">
                  <div className="bg-emerald-900/20 rounded-lg p-4 border border-emerald-700/30">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-emerald-600 rounded-full flex items-center justify-center flex-shrink-0">
                        <Zap className="w-4 h-4 text-white" />
                      </div>
                      <div>
                        <h4 className="font-medium text-emerald-300 mb-1">Irrigation Recommendation</h4>
                        <p className="text-sm text-gray-300">Reduce irrigation by 15% this week. Soil moisture levels are optimal and rain is expected.</p>
                        <p className="text-xs text-emerald-400 mt-1">Confidence: 92% • Potential water savings: 180L</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-blue-900/20 rounded-lg p-4 border border-blue-700/30">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                        <TrendingUp className="w-4 h-4 text-white" />
                      </div>
                      <div>
                        <h4 className="font-medium text-blue-300 mb-1">Yield Prediction</h4>
                        <p className="text-sm text-gray-300">Current growth patterns suggest 18% higher yield than last season.</p>
                        <p className="text-xs text-blue-400 mt-1">Confidence: 87% • Expected harvest: +2.1 tons</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-amber-900/20 rounded-lg p-4 border border-amber-700/30">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-amber-600 rounded-full flex items-center justify-center flex-shrink-0">
                        <Bell className="w-4 h-4 text-white" />
                      </div>
                      <div>
                        <h4 className="font-medium text-amber-300 mb-1">Pest Risk Alert</h4>
                        <p className="text-sm text-gray-300">Low risk detected for aphids. Consider preventive organic treatment in 3-4 days.</p>
                        <p className="text-xs text-amber-400 mt-1">Confidence: 76% • Action needed: Moderate</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Farm Health Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
                  <p className="text-xs text-green-400 mt-2">Improved by 0.3 this month</p>
                </div>
              </div>

              <div className="bg-black/30 backdrop-blur-sm rounded-xl p-6 border border-emerald-900/50">
                <h3 className="text-lg font-bold text-white mb-4">Carbon Sequestration</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">This Month</span>
                    <span className="text-emerald-400 font-bold">3.2 tons CO₂</span>
                  </div>
                  <div className="w-full bg-gray-800 rounded-full h-2">
                    <div className="bg-emerald-500 h-2 rounded-full" style={{ width: '65%' }}></div>
                  </div>
                  <p className="text-sm text-gray-400">65% of monthly target (5 tons)</p>
                  <div className="text-xs text-emerald-400">+0.8 tons vs last month</div>
                </div>
              </div>

              <div className="bg-black/30 backdrop-blur-sm rounded-xl p-6 border border-emerald-900/50">
                <h3 className="text-lg font-bold text-white mb-4">Resource Efficiency</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400 text-sm">Water Usage</span>
                    <span className="text-blue-400 font-medium">-12%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400 text-sm">Energy Efficiency</span>
                    <span className="text-green-400 font-medium">+8%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400 text-sm">Fertilizer Reduction</span>
                    <span className="text-emerald-400 font-medium">-15%</span>
                  </div>
                  <div className="mt-3 pt-3 border-t border-gray-800">
                    <div className="text-center">
                      <div className="text-xl font-bold text-emerald-400">A+</div>
                      <div className="text-xs text-gray-400">Efficiency Grade</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Device Management */}
            <div className="bg-black/30 backdrop-blur-sm rounded-xl p-6 border border-emerald-900/50">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-white">Device Configuration & Training Data</h3>
                <button className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-sm font-medium transition-colors">
                  View All Devices
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-gray-900/50 rounded-lg p-4 border border-gray-800/50">
                  <h4 className="font-medium text-white mb-3">AI Training Status</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400 text-sm">Data Points Collected</span>
                      <span className="text-emerald-400 font-medium">24,750</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400 text-sm">Model Accuracy</span>
                      <span className="text-green-400 font-medium">94.2%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400 text-sm">Last Training</span>
                      <span className="text-blue-400 font-medium">2 hours ago</span>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-900/50 rounded-lg p-4 border border-gray-800/50">
                  <h4 className="font-medium text-white mb-3">Data Sources</h4>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400 text-sm">IoT Sensors (4 active)</span>
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400 text-sm">WeatherXM Station</span>
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400 text-sm">Satellite Imagery</span>
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400 text-sm">Manual Inputs</span>
                      <div className="w-3 h-3 bg-amber-500 rounded-full"></div>
                    </div>
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
              <h2 className="text-2xl font-bold text-white">Farm Products Marketplace</h2>
              <div className="flex gap-3">
                <button className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 rounded-lg text-sm font-medium transition-colors flex items-center gap-2" onClick={handleListNewProduct}>
                  <Plus className="w-4 h-4" />
                  List New Product
                </button>
                <button className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-sm font-medium transition-colors" onClick={handleViewAnalytics}>
                  View Analytics
                </button>
              </div>
            </div>

            {/* Overview Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-black/30 backdrop-blur-sm rounded-xl p-4 border border-emerald-900/50">
                <div className="text-center">
                  <div className="text-2xl font-bold text-emerald-400">8</div>
                  <div className="text-sm text-gray-400">Active Listings</div>
                </div>
              </div>
              <div className="bg-black/30 backdrop-blur-sm rounded-xl p-4 border border-emerald-900/50">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-400">$2,340</div>
                  <div className="text-sm text-gray-400">Monthly Revenue</div>
                </div>
              </div>
              <div className="bg-black/30 backdrop-blur-sm rounded-xl p-4 border border-emerald-900/50">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-400">15</div>
                  <div className="text-sm text-gray-400">Pending Orders</div>
                </div>
              </div>
              <div className="bg-black/30 backdrop-blur-sm rounded-xl p-4 border border-emerald-900/50">
                <div className="text-center">
                  <div className="text-2xl font-bold text-amber-400">4.8</div>
                  <div className="text-sm text-gray-400">Avg Rating</div>
                </div>
              </div>
            </div>

            {/* Product Listings */}
            <div className="bg-black/30 backdrop-blur-sm rounded-xl p-6 border border-emerald-900/50">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold text-white">Your Product Listings</h3>
                <div className="flex gap-2">
                  <select className="px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-sm">
                    <option>All Categories</option>
                    <option>Vegetables</option>
                    <option>Fruits</option>
                    <option>Grains</option>
                    <option>Herbs</option>
                  </select>
                  <select className="px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-sm">
                    <option>All Status</option>
                    <option>Active</option>
                    <option>Sold Out</option>
                    <option>Draft</option>
                  </select>
                </div>
              </div>

              <div className="space-y-4">
                {/* Sample Product Listings */}
                {products.map(product => (
                  <div key={product.id} className="bg-gray-900/50 rounded-lg p-4 border border-gray-800/80 hover:border-emerald-700/50 transition-all">
                    <div className="flex items-start justify-between">
                      <div className="flex gap-4">
                        <div className="w-16 h-16 bg-gradient-to-br from-green-600/30 to-emerald-600/30 rounded-lg flex items-center justify-center">
                          <Sprout className="w-8 h-8 text-green-400" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h4 className="font-semibold text-white">{product.name}</h4>
                            <span className={`px-2 py-1 bg-emerald-900/40 text-emerald-300 rounded-full text-xs ${
                              product.status === 'active' ? 'bg-emerald-900/40 text-emerald-300' : 'bg-red-900/40 text-red-300'
                            }`}>
                              {product.status === 'active' ? 'Active' : 'Sold Out'}
                            </span>
                          </div>
                          <p className="text-gray-400 text-sm mb-2">{product.description}</p>
                          <div className="flex items-center gap-4 text-sm">
                            <span className="text-gray-400">Price: <span className="text-white font-medium">${product.price}/{product.unit}</span></span>
                            <span className="text-gray-400">Stock: <span className={`font-medium ${product.stock > 0 ? 'text-emerald-400' : 'text-red-400'}`}>{product.stock} {product.unit}</span></span>
                            <span className="text-gray-400">Listed: {product.listedDate}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <button className="px-3 py-1.5 bg-emerald-900/40 hover:bg-emerald-800/50 text-emerald-300 rounded text-sm transition-colors" onClick={() => handleEditProduct(product)}>
                          Edit
                        </button>
                        <button className="px-3 py-1.5 bg-gray-700 hover:bg-gray-600 text-gray-300 rounded text-sm transition-colors" onClick={() => handleViewProduct(product)}>
                          View
                        </button>
                        {product.status === 'sold_out' && (
                          <button className="px-3 py-1.5 bg-red-900/40 hover:bg-red-800/50 text-red-300 rounded text-sm transition-colors" onClick={() => handleRelistProduct(product)}>
                            Relist
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions & Revenue Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-black/30 backdrop-blur-sm rounded-xl p-6 border border-emerald-900/50">
                <h3 className="text-lg font-bold text-white mb-4">Revenue Breakdown</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">This Month</span>
                    <span className="text-emerald-400 font-bold">$2,340</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Last Month</span>
                    <span className="text-white font-bold">$1,890</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Growth</span>
                    <span className="text-green-400 font-bold">+23.8%</span>
                  </div>
                  <div className="pt-3 border-t border-gray-700/50">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400">Available for Loan Repayment</span>
                      <span className="text-emerald-400 font-bold">$1,872</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-black/30 backdrop-blur-sm rounded-xl p-6 border border-emerald-900/50">
                <h3 className="text-lg font-bold text-white mb-4">Recent Orders</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-gray-900/50 rounded-lg">
                    <div>
                      <p className="text-white font-medium">Organic Kale - 5 bunches</p>
                      <p className="text-gray-400 text-sm">Order #2024-001</p>
                    </div>
                    <span className="text-emerald-400 font-bold">$17.50</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-900/50 rounded-lg">
                    <div>
                      <p className="text-white font-medium">Heritage Tomatoes - 12 lbs</p>
                      <p className="text-gray-400 text-sm">Order #2024-002</p>
                    </div>
                    <span className="text-emerald-400 font-bold">$60.00</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-900/50 rounded-lg">
                    <div>
                      <p className="text-white font-medium">Mixed Vegetables</p>
                      <p className="text-gray-400 text-sm">Order #2024-003</p>
                    </div>
                    <span className="text-emerald-400 font-bold">$32.75</span>
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

  // Device Configuration Modal Component
  const DeviceConfigModal = () => {
    // Get device icon based on type
    const getDeviceIcon = (type: string) => {
      switch (type) {
        case 'soil':
          return <Thermometer className="w-5 h-5" />;
        case 'weather':
          return <Wind className="w-5 h-5" />;
        case 'crop':
          return <Activity className="w-5 h-5" />;
        case 'irrigation':
          return <Droplets className="w-5 h-5" />;
        default:
          return <Settings className="w-5 h-5" />;
      }
    };

    // Get device type display name
    const getDeviceTypeDisplay = (type: string) => {
      switch (type) {
        case 'soil':
          return 'Soil Monitor';
        case 'weather':
          return 'Environmental Monitor';
        case 'crop':
          return 'Growth Tracker';
        case 'irrigation':
          return 'Water Management';
        default:
          return 'Unknown Device';
      }
    };

    // Add signal strength calculation (simulate based on status)
    const getSignalStrength = (device: Device) => {
      if (device.status === 'online') {
        return 85 + Math.floor(Math.random() * 15); // 85-100%
      } else {
        return 40 + Math.floor(Math.random() * 30); // 40-70%
      }
    };

    if (!deviceConfigOpen) return null;

    return (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <div className="bg-gray-900 rounded-xl border border-emerald-900/50 max-w-4xl w-full max-h-[90vh] overflow-y-auto">
          {/* Modal Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-800">
            <div>
              <h3 className="text-xl font-bold text-white">Device Configuration</h3>
              <p className="text-gray-400 text-sm">Manage your IoT devices and sensors</p>
            </div>
            <button 
              onClick={() => setDeviceConfigOpen(false)}
              className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
            >
              <X className="w-5 h-5 text-gray-400" />
            </button>
          </div>

          {/* Device Grid */}
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              {devices.map((device) => (
                <div key={device.id} className="bg-black/30 rounded-lg p-4 border border-gray-800/50 hover:border-emerald-700/50 transition-all">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg ${
                        device.status === 'online' ? 'bg-emerald-900/30' : 'bg-amber-900/30'
                      }`}>
                        <div className={device.status === 'online' ? 'text-emerald-400' : 'text-amber-400'}>
                          {getDeviceIcon(device.type)}
                        </div>
                      </div>
                      <div>
                        <h4 className="font-medium text-white">{device.name}</h4>
                        <p className="text-sm text-gray-400">{getDeviceTypeDisplay(device.type)}</p>
                      </div>
                    </div>
                    <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs ${
                      device.status === 'online' 
                        ? 'bg-emerald-900/40 text-emerald-300' 
                        : 'bg-amber-900/40 text-amber-300'
                    }`}>
                      {device.status === 'online' ? <Wifi className="w-3 h-3" /> : <WifiOff className="w-3 h-3" />}
                      {device.status}
                    </div>
                  </div>

                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400 text-sm">Location:</span>
                      <span className="text-white text-sm">{device.location}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400 text-sm">Last Update:</span>
                      <span className="text-emerald-400 text-sm">{device.lastUpdate}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400 text-sm flex items-center gap-1">
                        <Battery className="w-3 h-3" />
                        Battery:
                      </span>
                      <span className={`text-sm ${device.battery > 80 ? 'text-green-400' : device.battery > 50 ? 'text-amber-400' : 'text-red-400'}`}>
                        {device.battery}%
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400 text-sm flex items-center gap-1">
                        <Signal className="w-3 h-3" />
                        Signal:
                      </span>
                      <span className={`text-sm ${getSignalStrength(device) > 80 ? 'text-green-400' : getSignalStrength(device) > 50 ? 'text-amber-400' : 'text-red-400'}`}>
                        {getSignalStrength(device)}%
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-2">
                    <button 
                      onClick={() => handleDeviceConfig(device)}
                      className="px-3 py-2 bg-emerald-900/40 hover:bg-emerald-800/50 text-emerald-300 rounded-lg text-sm transition-colors flex items-center justify-center gap-1"
                    >
                      <Settings className="w-3 h-3" />
                      Configure
                    </button>
                    <button 
                      onClick={() => handleDeviceCalibrate(device)}
                      className="px-3 py-2 bg-blue-900/40 hover:bg-blue-800/50 text-blue-300 rounded-lg text-sm transition-colors"
                    >
                      Calibrate
                    </button>
                    <button 
                      onClick={() => handleDeviceRestart(device)}
                      className="px-3 py-2 bg-gray-700 hover:bg-gray-600 text-gray-300 rounded-lg text-sm transition-colors"
                    >
                      Restart
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-3 pt-4 border-t border-gray-800">
              <button 
                onClick={handleAddDevice}
                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-sm font-medium transition-colors"
              >
                Add New Device
              </button>
              <button 
                onClick={handleRunDiagnostics}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors"
              >
                Run Diagnostics
              </button>
              <button 
                onClick={handleExportData}
                className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-gray-300 rounded-lg text-sm font-medium transition-colors"
              >
                Export Data
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-emerald-900">
      {/* Header */}
      <header className="bg-black/30 backdrop-blur-sm border-b border-emerald-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2 text-emerald-400 hover:text-emerald-300 transition-colors mr-8">
              <ArrowLeft size={16} />
              <span>Back to Home</span>
            </Link>
            <h1 className="text-xl font-bold hidden sm:block">Farmer Dashboard</h1>
          </div>
          
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-300">Welcome, {farmProfile.name}</span>
            <div className="h-8 w-8 rounded-full bg-emerald-600 flex items-center justify-center mr-2">
              <span className="font-medium text-sm">{farmProfile.name.charAt(0)}</span>
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
          {/* Sidebar */}
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

      {/* Device Configuration Modal */}
      <DeviceConfigModal />

      {/* List New Product Modal */}
    {listProductOpen && (
      <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
        <div className="bg-gray-900 rounded-xl p-6 w-full max-w-2xl border border-emerald-900/50 max-h-[90vh] overflow-y-auto">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-white">List New Product</h2>
            <button 
              onClick={() => setListProductOpen(false)}
              className="text-gray-400 hover:text-white transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <form className="space-y-4" onSubmit={(e) => {
            e.preventDefault();
            const formData = new FormData(e.target as HTMLFormElement);
            handleCreateProduct({
              name: formData.get('name') as string,
              description: formData.get('description') as string,
              price: parseFloat(formData.get('price') as string),
              unit: formData.get('unit') as string,
              stock: parseInt(formData.get('stock') as string),
              category: formData.get('category') as string,
              image: formData.get('image') as string || 'default'
            });
          }}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Product Name</label>
                <input 
                  type="text" 
                  name="name"
                  required
                  className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-emerald-500 focus:outline-none"
                  placeholder="e.g., Organic Tomatoes"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Category</label>
                <select 
                  name="category"
                  required
                  className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-emerald-500 focus:outline-none"
                >
                  <option value="">Select Category</option>
                  <option value="vegetables">Vegetables</option>
                  <option value="fruits">Fruits</option>
                  <option value="grains">Grains</option>
                  <option value="herbs">Herbs</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Description</label>
              <textarea 
                name="description"
                required
                rows={3}
                className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-emerald-500 focus:outline-none"
                placeholder="Describe your product..."
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Price</label>
                <input 
                  type="number" 
                  name="price"
                  required
                  step="0.01"
                  className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-emerald-500 focus:outline-none"
                  placeholder="0.00"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Unit</label>
                <select 
                  name="unit"
                  required
                  className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-emerald-500 focus:outline-none"
                >
                  <option value="">Select Unit</option>
                  <option value="lb">Per Pound</option>
                  <option value="kg">Per Kilogram</option>
                  <option value="bunch">Per Bunch</option>
                  <option value="box">Per Box</option>
                  <option value="bag">Per Bag</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Stock</label>
                <input 
                  type="number" 
                  name="stock"
                  required
                  className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-emerald-500 focus:outline-none"
                  placeholder="0"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Image</label>
              <input 
                type="text" 
                name="image"
                className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-emerald-500 focus:outline-none"
                placeholder="Image identifier (e.g., tomatoes, kale)"
              />
            </div>

            <div className="flex gap-3 pt-4">
              <button 
                type="submit"
                className="px-6 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-medium transition-colors"
              >
                List Product
              </button>
              <button 
                type="button"
                onClick={() => setListProductOpen(false)}
                className="px-6 py-2 bg-gray-700 hover:bg-gray-600 text-gray-300 rounded-lg font-medium transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    )}

    {/* Analytics Modal */}
    {analyticsOpen && (
      <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
        <div className="bg-gray-900 rounded-xl p-6 w-full max-w-4xl border border-emerald-900/50 max-h-[90vh] overflow-y-auto">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-white">Marketplace Analytics</h2>
            <button 
              onClick={() => setAnalyticsOpen(false)}
              className="text-gray-400 hover:text-white transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div className="bg-black/30 rounded-lg p-4 border border-emerald-900/50">
              <div className="text-center">
                <div className="text-2xl font-bold text-emerald-400">$3,247</div>
                <div className="text-sm text-gray-400">Total Revenue</div>
                <div className="text-xs text-emerald-300 mt-1">+18% this month</div>
              </div>
            </div>
            <div className="bg-black/30 rounded-lg p-4 border border-blue-900/50">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-400">156</div>
                <div className="text-sm text-gray-400">Orders Completed</div>
                <div className="text-xs text-blue-300 mt-1">+25% this month</div>
              </div>
            </div>
            <div className="bg-black/30 rounded-lg p-4 border border-amber-900/50">
              <div className="text-center">
                <div className="text-2xl font-bold text-amber-400">4.8★</div>
                <div className="text-sm text-gray-400">Avg Rating</div>
                <div className="text-xs text-amber-300 mt-1">Based on 89 reviews</div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-black/30 rounded-lg p-4 border border-gray-800">
              <h3 className="font-semibold text-white mb-4">Top Performing Products</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-gray-300">Organic Kale</span>
                  <span className="text-emerald-400 font-medium">$645</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-300">Heritage Tomatoes</span>
                  <span className="text-emerald-400 font-medium">$523</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-300">Organic Maize</span>
                  <span className="text-emerald-400 font-medium">$412</span>
                </div>
              </div>
            </div>

            <div className="bg-black/30 rounded-lg p-4 border border-gray-800">
              <h3 className="font-semibold text-white mb-4">Customer Insights</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-gray-300">Repeat Customers</span>
                  <span className="text-blue-400 font-medium">67%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-300">Avg Order Value</span>
                  <span className="text-blue-400 font-medium">$28.50</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-300">Customer Satisfaction</span>
                  <span className="text-blue-400 font-medium">94%</span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-end mt-6">
            <button 
              onClick={() => setAnalyticsOpen(false)}
              className="px-6 py-2 bg-gray-700 hover:bg-gray-600 text-gray-300 rounded-lg font-medium transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    )}

    {/* Edit Product Modal */}
    {editProductOpen && selectedProduct && (
      <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
        <div className="bg-gray-900 rounded-xl p-6 w-full max-w-2xl border border-emerald-900/50 max-h-[90vh] overflow-y-auto">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-white">Edit Product</h2>
            <button 
              onClick={() => setEditProductOpen(false)}
              className="text-gray-400 hover:text-white transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <form className="space-y-4" onSubmit={(e) => {
            e.preventDefault();
            const formData = new FormData(e.target as HTMLFormElement);
            handleUpdateProduct({
              name: formData.get('name') as string,
              description: formData.get('description') as string,
              price: parseFloat(formData.get('price') as string),
              unit: formData.get('unit') as string,
              stock: parseInt(formData.get('stock') as string)
            });
          }}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Product Name</label>
                <input 
                  type="text" 
                  name="name"
                  required
                  defaultValue={selectedProduct.name}
                  className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-emerald-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Unit</label>
                <select 
                  name="unit"
                  required
                  defaultValue={selectedProduct.unit}
                  className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-emerald-500 focus:outline-none"
                >
                  <option value="lb">Per Pound</option>
                  <option value="kg">Per Kilogram</option>
                  <option value="bunch">Per Bunch</option>
                  <option value="box">Per Box</option>
                  <option value="bag">Per Bag</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Description</label>
              <textarea 
                name="description"
                required
                rows={3}
                defaultValue={selectedProduct.description}
                className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-emerald-500 focus:outline-none"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Price</label>
                <input 
                  type="number" 
                  name="price"
                  required
                  step="0.01"
                  defaultValue={selectedProduct.price}
                  className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-emerald-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Stock</label>
                <input 
                  type="number" 
                  name="stock"
                  required
                  defaultValue={selectedProduct.stock}
                  className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-emerald-500 focus:outline-none"
                />
              </div>
            </div>

            <div className="flex gap-3 pt-4">
              <button 
                type="submit"
                className="px-6 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-medium transition-colors"
              >
                Update Product
              </button>
              <button 
                type="button"
                onClick={() => setEditProductOpen(false)}
                className="px-6 py-2 bg-gray-700 hover:bg-gray-600 text-gray-300 rounded-lg font-medium transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    )}

    {/* View Product Modal */}
    {viewProductOpen && selectedProduct && (
      <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
        <div className="bg-gray-900 rounded-xl p-6 w-full max-w-2xl border border-emerald-900/50 max-h-[90vh] overflow-y-auto">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-white">Product Details</h2>
            <button 
              onClick={() => setViewProductOpen(false)}
              className="text-gray-400 hover:text-white transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="w-20 h-20 bg-gradient-to-br from-green-600/30 to-emerald-600/30 rounded-lg flex items-center justify-center">
                <Sprout className="w-10 h-10 text-green-400" />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-white mb-2">{selectedProduct.name}</h3>
                <span className={`px-3 py-1 rounded-full text-sm ${
                  selectedProduct.status === 'active' ? 'bg-emerald-900/40 text-emerald-300' : 'bg-red-900/40 text-red-300'
                }`}>
                  {selectedProduct.status === 'active' ? 'Active' : 'Sold Out'}
                </span>
              </div>
            </div>

            <div className="bg-black/30 rounded-lg p-4 border border-gray-800">
              <h4 className="font-medium text-white mb-2">Description</h4>
              <p className="text-gray-300">{selectedProduct.description}</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-black/30 rounded-lg p-4 border border-gray-800">
                <h4 className="font-medium text-white mb-2">Pricing</h4>
                <div className="text-2xl font-bold text-emerald-400">${selectedProduct.price}</div>
                <div className="text-sm text-gray-400">per {selectedProduct.unit}</div>
              </div>
              <div className="bg-black/30 rounded-lg p-4 border border-gray-800">
                <h4 className="font-medium text-white mb-2">Stock</h4>
                <div className={`text-2xl font-bold ${selectedProduct.stock > 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                  {selectedProduct.stock}
                </div>
                <div className="text-sm text-gray-400">{selectedProduct.unit} available</div>
              </div>
            </div>

            <div className="bg-black/30 rounded-lg p-4 border border-gray-800">
              <h4 className="font-medium text-white mb-3">Performance Metrics</h4>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-sm text-gray-400">Total Sales</div>
                  <div className="text-lg font-semibold text-white">$1,247</div>
                </div>
                <div>
                  <div className="text-sm text-gray-400">Units Sold</div>
                  <div className="text-lg font-semibold text-white">89</div>
                </div>
                <div>
                  <div className="text-sm text-gray-400">Views</div>
                  <div className="text-lg font-semibold text-white">342</div>
                </div>
                <div>
                  <div className="text-sm text-gray-400">Listed Date</div>
                  <div className="text-lg font-semibold text-white">{selectedProduct.listedDate}</div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex gap-3 pt-6">
            <button 
              onClick={() => {
                setViewProductOpen(false);
                handleEditProduct(selectedProduct);
              }}
              className="px-6 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-medium transition-colors"
            >
              Edit Product
            </button>
            <button 
              onClick={() => setViewProductOpen(false)}
              className="px-6 py-2 bg-gray-700 hover:bg-gray-600 text-gray-300 rounded-lg font-medium transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    )}
    </div>
  );
}