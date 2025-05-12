import React from 'react';
import { Mail, Github, Twitter, Linkedin, Instagram } from 'lucide-react';
import Link from 'next/link';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-black/30 backdrop-blur-md border-t border-emerald-900/30 py-6 sm:py-8 mt-6 sm:mt-8 lg:mt-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-6 sm:gap-8 md:grid-cols-3">
          {/* Company Info */}
          <div>
            <h3 className="text-emerald-400 font-semibold text-lg mb-3">Regen Roots</h3>
            <p className="text-gray-300 text-sm leading-relaxed">
              Empowering farmers, investors & earth-loving foodies to grow a better world.
            </p>
            <div className="mt-4 flex space-x-4">
              <a href="https://twitter.com/RootsRegen" target="_blank" rel="noopener noreferrer" 
                 className="text-gray-400 hover:text-emerald-400 active:text-emerald-500 transition-colors p-2 -m-2"
                 aria-label="Twitter">
                <Twitter size={18} className="sm:w-5 sm:h-5" />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" 
                 className="text-gray-400 hover:text-emerald-400 active:text-emerald-500 transition-colors p-2 -m-2"
                 aria-label="Instagram">
                <Instagram size={18} className="sm:w-5 sm:h-5" />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" 
                 className="text-gray-400 hover:text-emerald-400 active:text-emerald-500 transition-colors p-2 -m-2"
                 aria-label="LinkedIn">
                <Linkedin size={18} className="sm:w-5 sm:h-5" />
              </a>
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" 
                 className="text-gray-400 hover:text-emerald-400 active:text-emerald-500 transition-colors p-2 -m-2"
                 aria-label="GitHub">
                <Github size={18} className="sm:w-5 sm:h-5" />
              </a>
            </div>
          </div>
          
          {/* Quick Links - Improved for mobile */}
          <div className="mt-6 sm:mt-0">
            <h3 className="text-emerald-400 font-semibold text-lg mb-3">Quick Links</h3>
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-1 gap-y-2 gap-x-4 text-sm">
              <Link href="/how-it-works" className="text-gray-300 hover:text-emerald-400 active:text-emerald-500 transition-colors py-1">
                About Us
              </Link>
              <Link href="/how-it-works" className="text-gray-300 hover:text-emerald-400 active:text-emerald-500 transition-colors py-1">
                How It Works
              </Link>
              <Link href="/for-farmers" className="text-gray-300 hover:text-emerald-400 active:text-emerald-500 transition-colors py-1">
                For Farmers
              </Link>
              <Link href="/for-investors" className="text-gray-300 hover:text-emerald-400 active:text-emerald-500 transition-colors py-1">
                For Investors
              </Link>
              <Link href="/blog" className="text-gray-300 hover:text-emerald-400 active:text-emerald-500 transition-colors py-1">
                Blog
              </Link>
            </div>
          </div>
          
          {/* Contact - Improved for mobile */}
          <div className="mt-6 md:mt-0">
            <h3 className="text-emerald-400 font-semibold text-lg mb-3">Contact Us</h3>
            <a 
              href="mailto:rootsregen4@gmail.com" 
              className="flex items-center text-gray-300 hover:text-emerald-400 active:text-emerald-500 transition-colors text-sm mb-2 py-1"
            >
              <Mail size={16} className="mr-2 flex-shrink-0" />
              <span className="break-all">rootsregen4@gmail.com</span>
            </a>
            <p className="text-sm text-gray-400 mt-4 leading-relaxed">
              Sign up to our waitlist to receive updates on our progress and launch.
            </p>
          </div>
        </div>
        
        {/* Bottom section - Responsive layout */}
        <div className="mt-6 sm:mt-8 pt-6 border-t border-gray-800 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-gray-400 text-xs text-center sm:text-left">
            &copy; {currentYear} Regen Roots. All rights reserved.
          </p>
          <div className="flex flex-wrap justify-center gap-x-4 gap-y-2 text-xs">
            <Link href="/how-it-works" className="text-gray-400 hover:text-emerald-400 active:text-emerald-500 transition-colors">
              Privacy Policy
            </Link>
            <Link href="/how-it-works" className="text-gray-400 hover:text-emerald-400 active:text-emerald-500 transition-colors">
              Terms of Service
            </Link>
            <Link href="/how-it-works" className="text-gray-400 hover:text-emerald-400 active:text-emerald-500 transition-colors">
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;