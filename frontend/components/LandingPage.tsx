'use client'

import React, { useState, useEffect } from 'react';
import { ChevronRight, Coins, Sprout, Users, TreePine, Menu, X, Star, Shield, Award, TrendingUp, MapPin, Leaf, Globe } from 'lucide-react';
import Footer from './Footer';
import Link from 'next/link';
import Image from 'next/image';

const LandingPage = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [heroParticles, setHeroParticles] = useState<Array<{left: string, top: string, delay: string, duration: string}>>([]);
  const [processStepParticles, setProcessStepParticles] = useState<Array<{left: string, top: string, delay: string, duration: string}>>([]);

  useEffect(() => {
    setIsClient(true);

    // Generate hero section particles
    const newHeroParticles = Array.from({ length: 25 }, () => ({
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      delay: `${Math.random() * 5}s`,
      duration: `${2 + Math.random() * 3}s`
    }));
    setHeroParticles(newHeroParticles);

    // Generate particles for process steps hover effect
    const newProcessStepParticles = Array.from({ length: 6 }, (_, i) => ({
      left: `${20 + Math.random() * 60}%`,
      top: `${20 + Math.random() * 60}%`,
      delay: `${i * 0.3}s`,
      duration: `${2 + Math.random() * 2}s`
    }));
    setProcessStepParticles(newProcessStepParticles);
  }, []);

  // How It Works Process Steps
  const processSteps = [
    { 
      icon: <Users className="w-6 h-6 sm:w-8 sm:h-8" />, 
      title: "1. Create Profile", 
      description: "Sign up as a farmer or investor and complete your profile with verification"
    },
    { 
      icon: <Sprout className="w-6 h-6 sm:w-8 sm:h-8" />, 
      title: "2. Browse Projects", 
      description: "Explore regenerative farming projects with detailed impact metrics and ROI data"
    },
    { 
      icon: <Coins className="w-6 h-6 sm:w-8 sm:h-8" />, 
      title: "3. Invest or Get Funded", 
      description: "Farmers secure funding while investors support meaningful environmental projects"
    },
    { 
      icon: <TrendingUp className="w-6 h-6 sm:w-8 sm:h-8" />, 
      title: "4. Track Impact", 
      description: "Monitor real-time progress, carbon credits, and financial returns on the blockchain"
    }
  ];

  // Featured Projects Data
  const featuredProjects = [
    {
      id: 1,
      name: "Sunset Valley Organic Farm",
      location: "California, USA",
      farmer: "Maria Rodriguez",
      fundingGoal: 250000,
      currentFunding: 187500,
      carbonCredits: 450,
      expectedROI: "18%",
      timeline: "24 months",
      status: "75% Funded",
      description: "Converting 200 acres to regenerative practices with cover crops and rotational grazing."
    },
    {
      id: 2,
      name: "Green Horizons Coffee Cooperative",
      location: "Guatemala",
      farmer: "Carlos Santos",
      fundingGoal: 180000,
      currentFunding: 180000,
      carbonCredits: 320,
      expectedROI: "22%",
      timeline: "18 months",
      status: "Fully Funded",
      description: "Shade-grown coffee plantation implementing agroforestry and soil restoration techniques."
    },
    {
      id: 3,
      name: "Prairie Restoration Project",
      location: "Montana, USA",
      farmer: "John & Sarah Miller",
      fundingGoal: 320000,
      currentFunding: 96000,
      carbonCredits: 680,
      expectedROI: "15%",
      timeline: "36 months",
      status: "30% Funded",
      description: "Large-scale prairie restoration focusing on native species and carbon sequestration."
    }
  ];

  // Testimonials Data
  const testimonials = [
    {
      name: "Dr. Elena Martinez",
      role: "Sustainable Agriculture Researcher",
      type: "expert",
      content: "Regen Roots is revolutionizing how we fund and scale regenerative agriculture. The transparency and impact tracking are unmatched.",
      rating: 5
    },
    {
      name: "Michael Chen",
      role: "Impact Investor",
      type: "investor",
      content: "I've invested in 8 projects through Regen Roots. The platform makes it easy to see real environmental impact alongside financial returns.",
      rating: 5
    },
    {
      name: "Sarah Thompson",
      role: "Regenerative Farmer",
      type: "farmer",
      content: "Thanks to Regen Roots, I secured funding to transition 150 acres to regenerative practices. The community support has been incredible.",
      rating: 5
    }
  ];

  // Trust Signals Data
  const trustSignals = {
    certifications: [
      { name: "B-Corp Certified", icon: "🌱", description: "Certified Benefit Corporation" },
      { name: "Climate Neutral", icon: "🌍", description: "Carbon Neutral Certified" },
      { name: "SOC 2 Compliant", icon: "🔒", description: "Security & Privacy Audited" }
    ],
    partners: [
      { 
        name: "USDA Organic", 
        logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/70/USDA_Organic_Seal.svg/240px-USDA_Organic_Seal.svg.png",
        fallback: "USDA"
      },
      { 
        name: "Rainforest Alliance", 
        logo: "https://upload.wikimedia.org/wikipedia/en/thumb/4/4f/Rainforest_Alliance_logo.svg/240px-Rainforest_Alliance_logo.svg.png",
        fallback: "RA"
      },
      { 
        name: "Carbon Trust", 
        logo: "https://upload.wikimedia.org/wikipedia/en/thumb/d/d4/Carbon_Trust_logo.svg/240px-Carbon_Trust_logo.svg.png",
        fallback: "CT"
      },
      { 
        name: "Blockchain Council", 
        logo: "/images/blockchain-council-logo.svg",
        fallback: "BC"
      },
      { 
        name: "Climate Action Reserve", 
        logo: "/images/climate-action-reserve-logo.svg",
        fallback: "CAR"
      },
      { 
        name: "Gold Standard", 
        logo: "/images/gold-standard-logo.svg",
        fallback: "GS"
      }
    ]
  };

  const navLinks = [
    { href: '/how-it-works', label: 'How It Works' },
    { href: '/for-farmers', label: 'For Farmers' },
    { href: '/for-investors', label: 'For Investors' },
    { href: '/blog', label: 'Blog' }
  ];

  // Removed image gallery

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-900 via-zinc-950 to-emerald-900 relative overflow-hidden">
      {/* Enhanced Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Animated Gradient Orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-500/15 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-3/4 right-1/4 w-96 h-96 bg-green-500/15 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-teal-500/10 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '4s' }}></div>
        
        {/* Enhanced Vibrant Grid Lines */}
        {[...Array(18)].map((_, i) => (
          <div
            key={`v-${i}`}
            className="absolute h-full w-px bg-gradient-to-b from-transparent via-emerald-400/25 to-transparent animate-pulse block"
            style={{
              left: `${(i + 1) * 5}%`,
              animationDelay: `${i * 0.2}s`,
              opacity: 0.15 + (i % 3) * 0.15, // Reduced opacity for mobile
              animationDuration: `${3 + (i % 3)}s`
            }}
          />
        ))}
        {[...Array(12)].map((_, i) => (
          <div
            key={`h-${i}`}
            className="absolute w-full h-px bg-gradient-to-r from-transparent via-emerald-400/25 to-transparent animate-pulse block"
            style={{
              top: `${(i + 1) * 8}%`,
              animationDelay: `${i * 0.3}s`,
              opacity: 0.15 + (i % 3) * 0.15, // Reduced opacity for mobile
              animationDuration: `${3 + (i % 3)}s`
            }}
          />
        ))}
        
        {/* Diagonal Grid Lines */}
        {[...Array(8)].map((_, i) => (
          <div
            key={`d-${i}`}
            className="absolute w-full h-px bg-gradient-to-r from-transparent via-emerald-300/15 to-transparent animate-pulse hidden md:block"
            style={{
              top: '50%',
              left: '-50%',
              transform: `rotate(${45 + i * 20}deg) translateY(${i * 80}px)`,
              animationDelay: `${i * 0.5}s`,
              opacity: 0.4 + (i % 2) * 0.2,
              animationDuration: `${4 + (i % 2)}s`
            }}
          />
        ))}
        
        {/* Floating Particles with Enhanced Glow */}
        {isClient && heroParticles.map((particle, i) => (
          <div
            key={`particle-${i}`}
            className="absolute w-1.5 h-1.5 bg-emerald-400/40 rounded-full animate-pulse shadow-lg shadow-emerald-400/30"
            style={{
              left: particle.left,
              top: particle.top,
              animationDelay: particle.delay,
              animationDuration: particle.duration
            }}
          />
        ))}
        
        {/* Moving Light Streaks */}
        {[...Array(6)].map((_, i) => (
          <div
            key={`streak-${i}`}
            className="absolute w-px h-20 bg-gradient-to-b from-emerald-300/30 to-transparent animate-pulse"
            style={{
              left: `${10 + i * 15}%`,
              top: '-10%',
              animationDelay: `${i * 1}s`,
              animationDuration: '6s',
              transform: `translateY(${Math.sin(i) * 100}vh)`
            }}
          />
        ))}
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <nav className="flex items-center justify-between py-6 sm:py-8 lg:py-10 backdrop-blur-sm bg-black/20 rounded-2xl border border-emerald-900/30 mb-8">
          <div className="flex items-center space-x-3 sm:space-x-4 pl-4 sm:pl-6">
            <div className="relative group">
              <Sprout className="w-7 h-7 sm:w-9 sm:h-9 text-emerald-400 transition-transform group-hover:scale-110" />
              <div className="absolute inset-0 animate-ping opacity-30 group-hover:opacity-50">
                <Sprout className="w-7 h-7 sm:w-9 sm:h-9 text-emerald-400" />
              </div>
              <div className="absolute -inset-2 bg-emerald-400/20 rounded-full blur opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </div>
            <span className="text-xl sm:text-2xl lg:text-3xl font-bold bg-gradient-to-r from-emerald-400 to-green-300 bg-clip-text text-transparent">
              Regen Roots
            </span>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden pr-4">
            <button 
              className="p-2 bg-emerald-900/50 backdrop-blur-sm rounded-xl border border-emerald-700/50 hover:bg-emerald-800/60 transition-all"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X size={24} className="text-emerald-300" /> : <Menu size={24} className="text-emerald-300" />}
            </button>
          </div>
          
          {/* Desktop navigation */}
          <div className="hidden md:flex items-center space-x-6 lg:space-x-8">
            {navLinks.map((link, index) => (
              <Link 
                key={index}
                href={link.href}
                className="text-gray-200 hover:text-emerald-400 transition-all text-sm lg:text-base relative group font-medium"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-emerald-400 transition-all group-hover:w-full"></span>
              </Link>
            ))}
          </div>
          
          <div className="hidden md:flex space-x-3 lg:space-x-4 pr-4 sm:pr-6">
            <Link 
              href="/login" 
              className="px-4 py-2 lg:px-5 lg:py-2.5 bg-emerald-600/80 backdrop-blur-sm hover:bg-emerald-600 active:bg-emerald-700 text-white rounded-xl transition-all flex items-center justify-center gap-2 text-sm lg:text-base font-medium border border-emerald-500/30 hover:border-emerald-500/60 shadow-lg hover:shadow-emerald-500/25"
            >
              <span>Log In</span>
            </Link>
            <Link 
              href="/signup" 
              className="px-4 py-2 lg:px-5 lg:py-2.5 border-2 border-emerald-500 hover:bg-emerald-600/20 active:bg-emerald-600/40 text-white rounded-xl transition-all flex items-center justify-center gap-2 text-sm lg:text-base font-medium backdrop-blur-sm hover:shadow-lg hover:shadow-emerald-500/20"
            >
              <span>Sign Up</span>
            </Link>
          </div>
        </nav>
        
        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="bg-black/90 backdrop-blur-xl rounded-2xl border border-emerald-900/60 absolute z-50 left-4 right-4 mt-4 px-6 py-4 md:hidden shadow-2xl">
            <div className="grid gap-3">
              {navLinks.map((link, index) => (
                <Link
                  key={index}
                  href={link.href}
                  className="text-gray-200 hover:text-emerald-400 active:text-emerald-500 transition-all py-3 text-center font-medium border-b border-gray-700/30 last:border-b-0"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <div className="grid grid-cols-2 gap-3 pt-3 mt-3 border-t border-gray-700/50">
                <Link 
                  href="/login" 
                  className="px-4 py-3 bg-emerald-600/80 hover:bg-emerald-600 active:bg-emerald-700 text-white rounded-xl transition-all text-center text-sm font-medium"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Log In
                </Link>
                <Link 
                  href="/signup" 
                  className="px-4 py-3 border-2 border-emerald-500 hover:bg-emerald-600/20 active:bg-emerald-600/30 text-white rounded-xl transition-all text-center text-sm font-medium"
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
          {/* Hero Section */}
          <div className="text-center space-y-6 sm:space-y-8 lg:space-y-10 px-4 sm:px-6 relative">
            {/* Hero Background Glow */}
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 via-green-500/5 to-teal-500/10 blur-3xl rounded-full"></div>
            
            <div className="relative z-10">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight mb-6">
                {"Nurturing the Future of Regenerative Agriculture".split(" ").map((word, index) => (
                  <span 
                    key={index} 
                    className={`inline-block mr-2 sm:mr-3 ${
                      index % 3 === 0 
                        ? "bg-gradient-to-r from-emerald-400 to-green-300 bg-clip-text text-transparent" 
                        : "text-white"
                    } animate-fade-in`}
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    {word}
                  </span>
                ))}
              </h1>
              
              <div className="relative mx-auto max-w-md sm:max-w-lg md:max-w-3xl lg:max-w-4xl">
                <p className="text-base sm:text-lg lg:text-xl xl:text-2xl text-gray-300 max-w-4xl mx-auto px-2 relative z-10 leading-relaxed font-light">
                  Connect with sustainable farmers, invest in regenerative projects, and track real environmental impact 
                  through our <span className="text-emerald-400 font-medium">blockchain-powered platform</span>.
                </p>
              </div>

              {/* Hero CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center relative z-10 pt-8">
                <Link 
                  href="/signup?type=farmer" 
                  className="group px-8 py-4 sm:px-10 sm:py-5 bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 text-white rounded-2xl transition-all transform hover:scale-105 active:scale-95 flex items-center justify-center gap-3 text-lg sm:text-xl font-semibold shadow-2xl hover:shadow-emerald-500/30 border border-emerald-500/50"
                >
                  {/* <Sprout className="w-6 h-6 group-hover:animate-bounce" /> */}
                  <span>Start Farming</span>
                  <ChevronRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link 
                  href="/signup?type=investor" 
                  className="group px-8 py-4 sm:px-10 sm:py-5 border-2 border-emerald-500 bg-emerald-500/10 backdrop-blur-sm hover:bg-emerald-600/30 text-white rounded-2xl transition-all transform hover:scale-105 active:scale-95 flex items-center justify-center gap-3 text-lg sm:text-xl font-semibold hover:shadow-2xl hover:shadow-emerald-500/20"
                >
                  {/* <Coins className="w-6 h-6 group-hover:animate-bounce" /> */}
                  <span>Start Investing</span>
                  <ChevronRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          </div>

          {/* Platform Vision Section */}
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="bg-gradient-to-r from-black/40 to-emerald-900/20 backdrop-blur-lg rounded-3xl border border-emerald-900/60 p-8 sm:p-10 shadow-2xl hover:shadow-emerald-500/10 transition-all">
              <div className="text-center mb-8">
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-emerald-400 to-green-300 bg-clip-text text-transparent mb-3">
                  Built for Impact
                </h2>
                <p className="text-gray-300 text-base sm:text-lg max-w-3xl mx-auto">
                  Join us in creating the future of regenerative agriculture through transparent funding and verified impact tracking
                </p>
              </div>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
                <div className="text-center group">
                  <div className="flex items-center justify-center mb-3">
                    <div className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-emerald-400 to-green-300 bg-clip-text text-transparent group-hover:scale-110 transition-transform">
                      0%
                    </div>
                    <TrendingUp className="w-6 h-6 text-emerald-400 ml-2 group-hover:animate-bounce" />
                  </div>
                  <div className="text-sm sm:text-base text-gray-300 font-medium">Platform Fees</div>
                  <div className="text-xs text-gray-400 mt-1">For early adopters</div>
                </div>
                <div className="text-center group">
                  <div className="flex items-center justify-center mb-3">
                    <div className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-emerald-400 to-green-300 bg-clip-text text-transparent group-hover:scale-110 transition-transform">
                      24/7
                    </div>
                    <Sprout className="w-6 h-6 text-emerald-400 ml-2 group-hover:animate-bounce" />
                  </div>
                  <div className="text-sm sm:text-base text-gray-300 font-medium">Project Monitoring</div>
                  <div className="text-xs text-gray-400 mt-1">Real-time tracking</div>
                </div>
                <div className="text-center group">
                  <div className="flex items-center justify-center mb-3">
                    <div className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-emerald-400 to-green-300 bg-clip-text text-transparent group-hover:scale-110 transition-transform">
                      100%
                    </div>
                    <Leaf className="w-6 h-6 text-emerald-400 ml-2 group-hover:animate-bounce" />
                  </div>
                  <div className="text-sm sm:text-base text-gray-300 font-medium">Verified Projects</div>
                  <div className="text-xs text-gray-400 mt-1">Blockchain transparency</div>
                </div>
                <div className="text-center group">
                  <div className="flex items-center justify-center mb-3">
                    <div className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-emerald-400 to-green-300 bg-clip-text text-transparent group-hover:scale-110 transition-transform">
                      &lt;1
                    </div>
                    <Award className="w-6 h-6 text-emerald-400 ml-2 group-hover:animate-bounce" />
                  </div>
                  <div className="text-sm sm:text-base text-gray-300 font-medium">Minute Signup</div>
                  <div className="text-xs text-gray-400 mt-1">Quick & secure onboarding</div>
                </div>
              </div>
              
              {/* Platform Features */}
              <div className="mt-8 pt-8 border-t border-emerald-900/30">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                  <div className="flex items-center justify-center space-x-3">
                    <Shield className="w-5 h-5 text-emerald-400" />
                    <span className="text-gray-300 text-sm">
                      <span className="font-semibold text-emerald-300">Bank-Level</span> Security
                    </span>
                  </div>
                  <div className="flex items-center justify-center space-x-3">
                    <Users className="w-5 h-5 text-emerald-400" />
                    <span className="text-gray-300 text-sm">
                      <span className="font-semibold text-emerald-300">Expert</span> Verification Team
                    </span>
                  </div>
                  <div className="flex items-center justify-center space-x-3">
                    <Globe className="w-5 h-5 text-emerald-400" />
                    <span className="text-gray-300 text-sm">
                      <span className="font-semibold text-emerald-300">Global</span> Reach & Support
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Featured Projects Section */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-emerald-400 to-green-300 bg-clip-text text-transparent mb-4">
                Featured Projects
              </h2>
              <p className="text-gray-300 text-base sm:text-lg lg:text-xl max-w-3xl mx-auto leading-relaxed">
                Explore successful regenerative farming projects that are creating real environmental impact
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
              {featuredProjects.map((project, index) => (
                <div 
                  key={project.id} 
                  className="group bg-gradient-to-br from-black/40 to-emerald-900/20 backdrop-blur-lg rounded-3xl border border-emerald-900/60 p-6 sm:p-8 hover:border-emerald-500/80 transition-all transform hover:-translate-y-2 hover:shadow-2xl hover:shadow-emerald-500/20"
                  style={{ animationDelay: `${index * 0.2}s` }}
                >
                  <div className="flex justify-between items-start mb-6">
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-white mb-2 group-hover:text-emerald-300 transition-colors">
                        {project.name}
                      </h3>
                      <div className="flex items-center text-gray-400 text-sm mb-3">
                        <MapPin className="w-4 h-4 mr-2 text-emerald-400" />
                        {project.location}
                      </div>
                    </div>
                    <div className={`px-3 py-1.5 rounded-full text-xs font-semibold ${
                      project.status === 'Fully Funded' 
                        ? 'bg-emerald-600/30 text-emerald-300 border border-emerald-500/50' 
                        : 'bg-blue-600/30 text-blue-300 border border-blue-500/50'
                    }`}>
                      {project.status}
                    </div>
                  </div>
                  
                  <p className="text-gray-300 text-sm leading-relaxed mb-6">{project.description}</p>
                  
                  <div className="space-y-4">
                    {/* Funding Progress */}
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-gray-300 font-medium">Funding Progress</span>
                        <span className="text-emerald-400 font-semibold">
                          ${(project.currentFunding / 1000).toFixed(0)}k / ${(project.fundingGoal / 1000).toFixed(0)}k
                        </span>
                      </div>
                      <div className="w-full bg-gray-700/50 rounded-full h-3 overflow-hidden">
                        <div 
                          className="bg-gradient-to-r from-emerald-500 to-green-400 h-3 rounded-full transition-all duration-1000 ease-out shadow-lg shadow-emerald-500/30" 
                          style={{ width: `${(project.currentFunding / project.fundingGoal) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                    
                    {/* Project Stats */}
                    <div className="grid grid-cols-3 gap-4 text-center">
                      <div className="bg-emerald-900/30 rounded-xl p-3 border border-emerald-800/30">
                        <div className="text-emerald-400 font-bold text-lg">{project.expectedROI}</div>
                        <div className="text-xs text-gray-400 font-medium">Expected ROI</div>
                      </div>
                      <div className="bg-emerald-900/30 rounded-xl p-3 border border-emerald-800/30">
                        <div className="text-emerald-400 font-bold text-lg">{project.carbonCredits}</div>
                        <div className="text-xs text-gray-400 font-medium">Carbon Credits</div>
                      </div>
                      <div className="bg-emerald-900/30 rounded-xl p-3 border border-emerald-800/30">
                        <div className="text-emerald-400 font-bold text-lg">{project.timeline}</div>
                        <div className="text-xs text-gray-400 font-medium">Timeline</div>
                      </div>
                    </div>
                  </div>
                  
                  <button className="w-full mt-6 px-6 py-3 bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 text-white rounded-xl transition-all flex items-center justify-center gap-2 font-semibold group-hover:shadow-lg group-hover:shadow-emerald-500/30">
                    <span>View Project</span>
                    <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* How It Works Section */}
          <div className="max-w-6xl mx-auto px-2 sm:px-4">
            <div className="text-center mb-8">
              <h2 className="text-2xl sm:text-3xl font-bold text-emerald-400 mb-3">How It Works</h2>
              <p className="text-gray-300 text-sm sm:text-base max-w-2xl mx-auto">
                Get started in four simple steps and begin making an impact today
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {processSteps.map((step, index) => (
                <div key={index} className="relative">
                  <div className="p-4 sm:p-5 lg:p-6 rounded-xl bg-gradient-to-br from-emerald-900/30 to-black/30 border border-emerald-900/30 hover:border-emerald-500/50 transition-all transform hover:-translate-y-1 backdrop-blur-sm group">
                    <div className="text-emerald-400 mb-2 sm:mb-3">{step.icon}</div>
                    <h3 className="text-base sm:text-lg font-semibold mb-1.5 sm:mb-2">{step.title}</h3>
                    <p className="text-xs sm:text-sm text-gray-300">{step.description}</p>
                  </div>
                  {/* Connection Line */}
                  {index < processSteps.length - 1 && (
                    <div className="hidden lg:block absolute top-1/2 -right-3 w-6 h-px bg-emerald-500/30"></div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Enhanced Testimonials Section */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-emerald-400 to-green-300 bg-clip-text text-transparent mb-4">
                What Our Community Says
              </h2>
              <p className="text-gray-300 text-base sm:text-lg lg:text-xl max-w-3xl mx-auto leading-relaxed">
                Hear from farmers, investors, and experts who are part of the regenerative agriculture movement
              </p>
              <div className="mt-6 flex justify-center">
                <div className="w-24 h-1 bg-gradient-to-r from-emerald-400 to-green-300 rounded-full"></div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <div 
                  key={index} 
                  className="group relative animate-fade-in"
                  style={{ animationDelay: `${index * 0.2}s` }}
                >
                  {/* Testimonial Card */}
                  <div className="bg-gradient-to-br from-black/40 to-emerald-900/20 backdrop-blur-lg rounded-3xl border border-emerald-900/50 p-8 hover:border-emerald-500/70 transition-all duration-500 transform hover:-translate-y-2 hover:shadow-2xl hover:shadow-emerald-500/20 relative overflow-hidden">
                    
                    {/* Background Glow Effect */}
                    <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-green-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl"></div>
                    
                    {/* Quote Icon */}
                    <div className="absolute top-6 right-6 text-emerald-400/20 group-hover:text-emerald-400/40 transition-colors duration-300">
                      <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h4v10h-10z"/>
                      </svg>
                    </div>
                    
                    <div className="relative z-10">
                      {/* Star Rating */}
                      <div className="flex items-center mb-6 justify-center lg:justify-start">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star 
                            key={i} 
                            className="w-5 h-5 text-emerald-400 fill-current mr-1 transform group-hover:scale-110 transition-transform duration-300" 
                            style={{ animationDelay: `${i * 0.1}s` }}
                          />
                        ))}
                        <span className="ml-2 text-emerald-400 text-sm font-semibold">5.0</span>
                      </div>
                      
                      {/* Testimonial Content */}
                      <div className="mb-8">
                        <p className="text-gray-200 text-base leading-relaxed italic font-light group-hover:text-white transition-colors duration-300">
                          &ldquo;{testimonial.content}&rdquo;
                        </p>
                      </div>
                      
                      {/* User Profile */}
                      <div className="flex items-center justify-center lg:justify-start">
                        <div className="relative">
                          <div className={`w-14 h-14 rounded-full flex items-center justify-center text-white font-bold text-lg mr-4 shadow-lg transition-all duration-300 group-hover:scale-110 ${
                            testimonial.type === 'farmer' 
                              ? 'bg-gradient-to-br from-emerald-500 to-green-600 shadow-emerald-500/30' : 
                            testimonial.type === 'investor' 
                              ? 'bg-gradient-to-br from-emerald-600 to-green-700 shadow-emerald-600/30' : 
                              'bg-gradient-to-br from-green-500 to-emerald-500 shadow-green-500/30'
                          }`}>
                            {testimonial.name.charAt(0)}
                          </div>
                          
                          {/* Role Badge */}
                          <div className={`absolute -bottom-1 -right-1 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white shadow-lg ${
                            testimonial.type === 'farmer' 
                              ? 'bg-emerald-600' : 
                            testimonial.type === 'investor' 
                              ? 'bg-green-600' : 
                              'bg-emerald-700'
                          }`}>
                            {testimonial.type === 'farmer' ? '🌱' : testimonial.type === 'investor' ? '💰' : '🎓'}
                          </div>
                        </div>
                        
                        <div className="text-center lg:text-left">
                          <div className="text-white font-semibold text-lg group-hover:text-emerald-300 transition-colors duration-300">
                            {testimonial.name}
                          </div>
                          <div className="text-gray-400 text-sm font-medium">
                            {testimonial.role}
                          </div>
                          <div className={`text-xs font-semibold mt-1 ${
                            testimonial.type === 'farmer' 
                              ? 'text-emerald-400' : 
                            testimonial.type === 'investor' 
                              ? 'text-green-400' : 
                              'text-emerald-300'
                          }`}>
                            {testimonial.type === 'farmer' ? 'Regenerative Farmer' : 
                             testimonial.type === 'investor' ? 'Impact Investor' : 'Industry Expert'}
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Decorative Elements */}
                    <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-500/0 via-emerald-500/50 to-emerald-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  </div>
                  
                  {/* Floating Particles Effect on Hover */}
                  <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    {isClient && processStepParticles.map((particle, i) => (
                      <div
                        key={i}
                        className="absolute w-1 h-1 bg-emerald-400/60 rounded-full animate-pulse"
                        style={{
                          left: particle.left,
                          top: particle.top,
                          animationDelay: particle.delay,
                          animationDuration: particle.duration
                        }}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
            
            {/* Call to Action under testimonials */}
            <div className="text-center mt-12">
              <p className="text-gray-400 text-base mb-6">
                Join thousands of farmers and investors making a difference
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link 
                  href="/signup?type=farmer" 
                  className="px-8 py-3 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white rounded-2xl transition-all transform hover:scale-105 font-semibold shadow-lg hover:shadow-green-500/30"
                >
                  Become a Farmer
                </Link>
                <Link 
                  href="/signup?type=investor" 
                  className="px-8 py-3 border-2 border-emerald-500 bg-emerald-500/10 hover:bg-emerald-600/20 text-white rounded-2xl transition-all transform hover:scale-105 font-semibold hover:shadow-lg hover:shadow-emerald-500/20"
                >
                  Start Investing
                </Link>
              </div>
            </div>
          </div>

          {/* Enhanced Trust Signals Section */}
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="bg-gradient-to-br from-black/40 to-emerald-900/20 backdrop-blur-lg rounded-3xl border border-emerald-900/50 p-8 sm:p-10 shadow-2xl hover:shadow-emerald-500/10 transition-all">
              <div className="text-center mb-10">
                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-emerald-400 to-green-300 bg-clip-text text-transparent mb-3">
                  Trusted & Secure
                </h3>
                <p className="text-gray-300 text-base sm:text-lg max-w-2xl mx-auto">
                  Industry certifications and partnerships you can trust
                </p>
              </div>
              
              {/* Certifications with Enhanced Design */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
                {trustSignals.certifications.map((cert, index) => (
                  <div 
                    key={index} 
                    className="group bg-gradient-to-br from-emerald-900/30 to-black/40 rounded-2xl border border-emerald-800/50 p-8 hover:border-emerald-500/70 transition-all transform hover:-translate-y-2 hover:shadow-xl hover:shadow-emerald-500/20"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="text-center">
                      {/* Professional Illustration */}
                      <div className="w-24 h-24 mx-auto mb-6 relative group-hover:scale-110 transition-transform duration-300">
                        {index === 0 ? (
                          // B-Corp Certified - Enhanced Business Excellence Badge
                          <div className="w-full h-full relative">
                            {/* Main badge background with gradient and shadow */}
                            <div className="absolute inset-0 bg-gradient-to-br from-emerald-400 via-green-500 to-emerald-600 rounded-full shadow-lg shadow-emerald-500/40 group-hover:shadow-xl group-hover:shadow-emerald-500/60 transition-all duration-300"></div>
                            
                            {/* Inner circle with texture */}
                            <div className="absolute inset-2 bg-gradient-to-br from-white to-emerald-50 rounded-full border-2 border-emerald-200 flex items-center justify-center relative overflow-hidden">
                              {/* Subtle pattern overlay */}
                              <div className="absolute inset-0 opacity-10">
                                {[...Array(8)].map((_, i) => (
                                  <div 
                                    key={i}
                                    className="absolute w-px h-full bg-emerald-400"
                                    style={{ 
                                      left: `${(i + 1) * 12.5}%`,
                                      transform: `rotate(${i * 22.5}deg)`,
                                      transformOrigin: 'center center'
                                    }}
                                  />
                                ))}
                              </div>
                              
                              {/* B Logo */}
                              <div className="relative z-10 text-emerald-600 font-black text-xl tracking-tight">B</div>
                              
                              {/* Glowing ring effect */}
                              <div className="absolute inset-1 border border-emerald-300/50 rounded-full animate-pulse"></div>
                            </div>
                            
                            {/* Award ribbon */}
                            <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center shadow-lg rotate-12 group-hover:rotate-6 transition-transform">
                              <Award className="w-4 h-4 text-white" />
                            </div>
                            
                            {/* Certification stars */}
                            <div className="absolute top-1 left-1 w-3 h-3 bg-emerald-400 rounded-full opacity-80 animate-ping"></div>
                            <div className="absolute bottom-1 right-2 w-2 h-2 bg-green-400 rounded-full opacity-60 animate-pulse" style={{ animationDelay: '1s' }}></div>
                          </div>
                        ) : index === 1 ? (
                          // Climate Neutral - Advanced Earth Ecosystem
                          <div className="w-full h-full relative">
                            {/* Earth base */}
                            <div className="absolute inset-0 bg-gradient-to-br from-blue-400 via-green-400 to-emerald-500 rounded-full shadow-lg shadow-blue-500/40 group-hover:shadow-xl group-hover:shadow-emerald-500/60 transition-all duration-500 group-hover:rotate-12"></div>
                            
                            {/* Ocean texture */}
                            <div className="absolute inset-1 bg-gradient-to-br from-blue-500/30 to-green-500/30 rounded-full flex items-center justify-center backdrop-blur-sm overflow-hidden">
                              {/* Continents */}
                              <div className="absolute top-2 left-3 w-4 h-3 bg-green-600/80 rounded-sm transform rotate-12"></div>
                              <div className="absolute bottom-3 right-2 w-3 h-4 bg-green-700/80 rounded-sm transform -rotate-6"></div>
                              <div className="absolute top-1/2 left-1 w-2 h-2 bg-emerald-600/80 rounded-full"></div>
                              
                              {/* Globe icon in center */}
                              <Globe className="w-8 h-8 text-white/90 relative z-10" />
                              
                              {/* Cloud layers */}
                              <div className="absolute top-1 left-1/2 w-4 h-2 bg-white/40 rounded-full transform -translate-x-1/2 animate-pulse"></div>
                              <div className="absolute bottom-2 right-1/4 w-3 h-1.5 bg-white/30 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
                            </div>
                            
                            {/* Carbon neutral indicator */}
                            <div className="absolute -top-1 -right-1 w-10 h-10 bg-gradient-to-br from-emerald-400 to-green-500 rounded-full flex items-center justify-center animate-pulse shadow-lg">
                              <Leaf className="w-5 h-5 text-white" />
                            </div>
                            
                            {/* Orbiting elements */}
                            <div className="absolute inset-0 animate-spin" style={{ animationDuration: '20s' }}>
                              <div className="absolute -top-1 left-1/2 w-2 h-2 bg-green-300 rounded-full transform -translate-x-1/2"></div>
                              <div className="absolute top-1/2 -right-1 w-1.5 h-1.5 bg-emerald-300 rounded-full transform -translate-y-1/2"></div>
                            </div>
                            
                            {/* Energy waves */}
                            <div className="absolute inset-0 rounded-full border-2 border-emerald-400/30 animate-pulse"></div>
                            <div className="absolute inset-2 rounded-full border border-green-400/20 animate-pulse" style={{ animationDelay: '0.5s' }}></div>
                          </div>
                        ) : (
                          // SOC 2 Compliant - Advanced Security Shield
                          <div className="w-full h-full relative">
                            {/* Shield background with metallic effect */}
                            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500 via-green-600 to-emerald-700 rounded-2xl shadow-lg shadow-emerald-500/50 group-hover:shadow-xl group-hover:shadow-emerald-500/70 transition-all duration-300 transform group-hover:rotate-3" style={{ clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)' }}></div>
                            
                            {/* Inner shield layer */}
                            <div className="absolute inset-1 bg-gradient-to-br from-emerald-400/40 to-green-500/40 rounded-xl backdrop-blur-sm flex items-center justify-center overflow-hidden" style={{ clipPath: 'polygon(50% 5%, 95% 25%, 95% 75%, 50% 95%, 5% 75%, 5% 25%)' }}>
                              
                              {/* Circuit pattern background */}
                              <div className="absolute inset-0 opacity-20">
                                {/* Horizontal lines */}
                                {[...Array(4)].map((_, i) => (
                                  <div 
                                    key={`h-${i}`}
                                    className="absolute w-full h-px bg-white"
                                    style={{ top: `${25 + i * 16.67}%` }}
                                  />
                                ))}
                                {/* Vertical lines */}
                                {[...Array(4)].map((_, i) => (
                                  <div 
                                    key={`v-${i}`}
                                    className="absolute h-full w-px bg-white"
                                    style={{ left: `${25 + i * 16.67}%` }}
                                  />
                                ))}
                                {/* Circuit nodes */}
                                {[...Array(6)].map((_, i) => (
                                  <div 
                                    key={`node-${i}`}
                                    className="absolute w-1 h-1 bg-white rounded-full animate-pulse"
                                    style={{ 
                                      left: `${30 + (i % 3) * 20}%`,
                                      top: `${30 + Math.floor(i / 3) * 20}%`,
                                      animationDelay: `${i * 0.2}s`
                                    }}
                                  />
                                ))}
                              </div>
                              
                              {/* Main shield icon */}
                              <Shield className="w-11 h-11 text-white relative z-10" />
                              
                              {/* Lock overlay */}
                              <div className="absolute bottom-2 right-2 w-4 h-4 bg-green-400 rounded border-2 border-white flex items-center justify-center">
                                <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                              </div>
                            </div>
                            
                            {/* Security level indicators */}
                            <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 flex space-x-1">
                              {[...Array(3)].map((_, i) => (
                                <div 
                                  key={i}
                                  className={`w-1.5 h-3 rounded-full ${i === 0 ? 'bg-green-400' : i === 1 ? 'bg-emerald-400' : 'bg-green-300'} animate-pulse`}
                                  style={{ animationDelay: `${i * 0.3}s` }}
                                />
                              ))}
                            </div>
                            
                            {/* Scanning effect */}
                            <div className="absolute inset-0 rounded-2xl overflow-hidden">
                              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 animate-pulse" style={{ animationDuration: '3s' }}></div>
                            </div>
                            
                            {/* Security badge */}
                            <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center text-xs font-bold text-white shadow-lg">
                              2
                            </div>
                          </div>
                        )}
                      </div>
                      
                      <div className="space-y-2">
                        <div className="text-lg font-bold text-emerald-300 group-hover:text-emerald-200 transition-colors">
                          {cert.name}
                        </div>
                        <div className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors">
                          {cert.description}
                        </div>
                      </div>
                      
                      {/* Verification Badge */}
                      <div className="mt-4 inline-flex items-center px-3 py-1 bg-emerald-600/20 border border-emerald-500/30 rounded-full text-xs text-emerald-300 font-medium">
                        <div className="w-2 h-2 bg-emerald-400 rounded-full mr-2 animate-pulse"></div>
                        Verified
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Enhanced Partners Section with Logos */}
              <div className="border-t border-emerald-800/30 pt-8">
                <div className="text-center mb-8">
                  <h4 className="text-lg font-semibold text-emerald-400 mb-2">Trusted Partners</h4>
                  <p className="text-gray-400 text-sm">Collaborating with industry leaders</p>
                </div>
                
                {/* Partner Logos Grid with Motion Effects */}
                <div className="relative overflow-hidden rounded-2xl">
                  {/* Scrolling Animation Track */}
                  <div className="flex animate-scroll-horizontal">
                    {/* First set of partners */}
                    {trustSignals.partners.map((partner, index) => (
                      <div 
                        key={`first-${index}`}
                        className="group relative flex-shrink-0 mx-4"
                        style={{ 
                          animationDelay: `${index * 0.15}s`,
                          animation: `float-up-down 3s ease-in-out infinite ${index * 0.5}s`
                        }}
                      >
                        <div className="bg-white/8 backdrop-blur-sm rounded-xl p-4 border border-emerald-800/30 hover:border-emerald-500/60 transition-all duration-300 transform hover:scale-110 hover:shadow-xl hover:shadow-emerald-500/25 w-28 h-18 flex items-center justify-center overflow-hidden hover:rotate-2 group-hover:bg-white/12">
                          {partner.logo.startsWith('http') || partner.logo.startsWith('/images') ? (
                            <Image 
                              src={partner.logo} 
                              alt={partner.name}
                              width={112}
                              height={72}
                              className="max-w-full max-h-full object-contain filter brightness-0 invert opacity-60 group-hover:opacity-90 transition-all duration-500 group-hover:scale-105 group-hover:rotate-3"
                              onError={(e) => {
                                // Fallback to text if image fails to load
                                const target = e.target as HTMLImageElement;
                                target.style.display = 'none';
                                const fallback = target.nextElementSibling as HTMLElement;
                                if (fallback) {
                                  fallback.className = fallback.className.replace('hidden', 'flex');
                                }
                              }}
                            />
                          ) : (
                            <div className="text-emerald-400 font-bold text-sm text-center group-hover:text-emerald-300 transition-colors group-hover:scale-110">
                              {partner.fallback}
                            </div>
                          )}
                          <div className="hidden items-center justify-center text-emerald-400 font-bold text-sm text-center group-hover:text-emerald-300 transition-colors w-full h-full">
                            {partner.fallback}
                          </div>
                        </div>
                        
                        {/* Enhanced Tooltip on hover */}
                        <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-emerald-900/90 backdrop-blur-sm text-emerald-100 text-xs px-3 py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none whitespace-nowrap border border-emerald-700/50 shadow-lg z-10">
                          {partner.name}
                          <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-emerald-900/90"></div>
                        </div>
                      </div>
                    ))}
                    
                    {/* Duplicate set for seamless loop */}
                    {trustSignals.partners.map((partner, index) => (
                      <div 
                        key={`second-${index}`}
                        className="group relative flex-shrink-0 mx-4"
                        style={{ 
                          animationDelay: `${(index + trustSignals.partners.length) * 0.15}s`,
                          animation: `float-up-down 3s ease-in-out infinite ${(index + 3) * 0.5}s`
                        }}
                      >
                        <div className="bg-white/8 backdrop-blur-sm rounded-xl p-4 border border-emerald-800/30 hover:border-emerald-500/60 transition-all duration-300 transform hover:scale-110 hover:shadow-xl hover:shadow-emerald-500/25 w-28 h-18 flex items-center justify-center overflow-hidden hover:rotate-2 group-hover:bg-white/12">
                          {partner.logo.startsWith('http') || partner.logo.startsWith('/images') ? (
                            <Image 
                              src={partner.logo} 
                              alt={partner.name}
                              width={112}
                              height={72}
                              className="max-w-full max-h-full object-contain filter brightness-0 invert opacity-60 group-hover:opacity-90 transition-all duration-500 group-hover:scale-105 group-hover:rotate-3"
                              onError={(e) => {
                                // Fallback to text if image fails to load
                                const target = e.target as HTMLImageElement;
                                target.style.display = 'none';
                                const fallback = target.nextElementSibling as HTMLElement;
                                if (fallback) {
                                  fallback.className = fallback.className.replace('hidden', 'flex');
                                }
                              }}
                            />
                          ) : (
                            <div className="text-emerald-400 font-bold text-sm text-center group-hover:text-emerald-300 transition-colors group-hover:scale-110">
                              {partner.fallback}
                            </div>
                          )}
                          <div className="hidden items-center justify-center text-emerald-400 font-bold text-sm text-center group-hover:text-emerald-300 transition-colors w-full h-full">
                            {partner.fallback}
                          </div>
                        </div>
                        
                        {/* Enhanced Tooltip on hover */}
                        <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-emerald-900/90 backdrop-blur-sm text-emerald-100 text-xs px-3 py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none whitespace-nowrap border border-emerald-700/50 shadow-lg z-10">
                          {partner.name}
                          <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-emerald-900/90"></div>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  {/* Gradient fade overlays */}
                  <div className="absolute left-0 top-0 w-20 h-full bg-gradient-to-r from-black/40 via-black/20 to-transparent pointer-events-none z-10"></div>
                  <div className="absolute right-0 top-0 w-20 h-full bg-gradient-to-l from-black/40 via-black/20 to-transparent pointer-events-none z-10"></div>
                </div>
                
                {/* Alternative: Scrolling Animation (uncomment if preferred) */}
                {/*
                <div className="relative overflow-hidden">
                  <div className="flex animate-scroll-partners">
                    {trustSignals.partners.concat(trustSignals.partners).map((partner, index) => (
                      <div 
                        key={index}
                        className="flex-shrink-0 mx-4 group"
                      >
                        <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-emerald-800/30 hover:border-emerald-500/50 transition-all transform hover:scale-105 hover:shadow-lg hover:shadow-emerald-500/20 w-28 h-16 flex items-center justify-center">
                          {partner.logo.startsWith('http') ? (
                            <img 
                              src={partner.logo} 
                              alt={partner.name}
                              className="max-w-full max-h-full object-contain filter brightness-0 invert opacity-70 group-hover:opacity-100 transition-opacity"
                            />
                          ) : (
                            <div className="text-emerald-400 font-bold text-sm">
                              {partner.fallback}
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                */}
                
                {/* Security Badges */}
                <div className="mt-8 pt-6 border-t border-emerald-800/30">
                  <div className="flex flex-wrap justify-center items-center gap-6 text-sm text-gray-400">
                    <div className="flex items-center gap-2 group">
                      <Shield className="w-5 h-5 text-emerald-400 group-hover:scale-110 transition-transform" />
                      <span className="group-hover:text-emerald-300 transition-colors">Blockchain Secured</span>
                    </div>
                    <div className="flex items-center gap-2 group">
                      <Award className="w-5 h-5 text-emerald-400 group-hover:scale-110 transition-transform" />
                      <span className="group-hover:text-emerald-300 transition-colors">B-Corp Certified</span>
                    </div>
                    <div className="flex items-center gap-2 group">
                      <TreePine className="w-5 h-5 text-emerald-400 group-hover:scale-110 transition-transform" />
                      <span className="group-hover:text-emerald-300 transition-colors">Carbon Verified</span>
                    </div>
                    <div className="flex items-center gap-2 group">
                      <Users className="w-5 h-5 text-emerald-400 group-hover:scale-110 transition-transform" />
                      <span className="group-hover:text-emerald-300 transition-colors">Community Driven</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Enhanced Call to action section */}
          <div className="max-w-4xl mx-auto text-center px-4 py-8 sm:py-10 lg:py-12 relative">
            {/* Background glow effect */}
            <div className="absolute inset-0 bg-emerald-500/10 blur-3xl rounded-full"></div>
            
            <div className="relative z-10">
              <div className="inline-flex items-center px-4 py-2 bg-emerald-600/20 rounded-full text-emerald-300 text-sm mb-4">
                <Award className="w-4 h-4 mr-2" />
                <span>Join 2,500+ members already making an impact</span>
              </div>
              
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4">
                Start Your <span className="text-emerald-400">Regenerative Journey</span> Today
              </h2>
              
              <p className="text-sm sm:text-base lg:text-lg text-gray-300 mb-6 max-w-3xl mx-auto">
                Whether you&apos;re a farmer ready to transform your land or an investor seeking meaningful returns,
                the future of sustainable agriculture starts with your next click.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
                <Link 
                  href="/signup?type=farmer" 
                  className="px-6 py-3 sm:px-8 sm:py-4 bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white rounded-lg transition-all transform hover:scale-105 active:scale-95 flex items-center justify-center gap-2 text-base sm:text-lg font-semibold shadow-lg hover:shadow-emerald-500/25"
                >
                  {/* <Sprout className="w-5 h-5" /> */}
                  <span>Get Funded as a Farmer</span>
                  <ChevronRight className="w-5 h-5" />
                </Link>
                <Link 
                  href="/signup?type=investor" 
                  className="px-6 py-3 sm:px-8 sm:py-4 border-2 border-emerald-500 hover:bg-emerald-600/20 active:bg-emerald-600/40 text-white rounded-lg transition-all transform hover:scale-105 active:scale-95 flex items-center justify-center gap-2 text-base sm:text-lg font-semibold"
                >
                  {/* <TrendingUp className="w-5 h-5" /> */}
                  <span>Start Investing Today</span>
                  <ChevronRight className="w-5 h-5" />
                </Link>
              </div>
              
              <div className="flex items-center justify-center gap-6 text-xs sm:text-sm text-gray-400">
                <div className="flex items-center gap-1">
                  <Shield className="w-4 h-4 text-emerald-400" />
                  <span>Blockchain Secured</span>
                </div>
                <div className="flex items-center gap-1">
                  <Award className="w-4 h-4 text-emerald-400" />
                  <span>B-Corp Certified</span>
                </div>
                <div className="flex items-center gap-1">
                  <TreePine className="w-4 h-4 text-emerald-400" />
                  <span>Real Impact</span>
                </div>
              </div>
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