import React from 'react';
import { Mail, Github, Twitter, Linkedin, Instagram } from 'lucide-react';
import Link from 'next/link';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-black/30 backdrop-blur-md border-t border-emerald-900/30 py-8 mt-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-emerald-400 font-semibold text-lg mb-3">Regen Roots</h3>
            <p className="text-gray-300 text-sm">
              Empowering farmers, investors & earth-loving foodies to grow a better world.
            </p>
            <div className="mt-4 flex space-x-4">
              <a href="https://twitter.com/RootsRegen" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-emerald-400 transition-colors">
                <Twitter size={18} />
                <span className="sr-only">Twitter</span>
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-emerald-400 transition-colors">
                <Instagram size={18} />
                <span className="sr-only">Instagram</span>
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-emerald-400 transition-colors">
                <Linkedin size={18} />
                <span className="sr-only">LinkedIn</span>
              </a>
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-emerald-400 transition-colors">
                <Github size={18} />
                <span className="sr-only">GitHub</span>
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-emerald-400 font-semibold text-lg mb-3">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/how-it-works" className="text-gray-300 hover:text-emerald-400 transition-colors">About Us</Link>
              </li>
              <li>
                <Link href="/how-it-works" className="text-gray-300 hover:text-emerald-400 transition-colors">How It Works</Link>
              </li>
              <li>
                <Link href="/for-farmers" className="text-gray-300 hover:text-emerald-400 transition-colors">For Farmers</Link>
              </li>
              <li>
                <Link href="/for-investors" className="text-gray-300 hover:text-emerald-400 transition-colors">For Investors</Link>
              </li>
              <li>
                <Link href="/blog" className="text-gray-300 hover:text-emerald-400 transition-colors">Blog</Link>
              </li>
            </ul>
          </div>
          
          {/* Contact */}
          <div>
            <h3 className="text-emerald-400 font-semibold text-lg mb-3">Contact Us</h3>
            <a 
              href="mailto:hello@regenroots.xyz" 
              className="flex items-center text-gray-300 hover:text-emerald-400 transition-colors text-sm mb-2"
            >
              <Mail size={16} className="mr-2" />
              rootsregen4@gmail.com
            </a>
            <p className="text-sm text-gray-400 mt-4">
              Sign up to our waitlist to receive updates on our progress and launch.
            </p>
          </div>
        </div>
        
        <div className="mt-8 pt-6 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-xs">
            &copy; {currentYear} Regen Roots. All rights reserved.
          </p>
          <div className="mt-4 md:mt-0 space-x-4 text-xs">
            <Link href="/how-it-works" className="text-gray-400 hover:text-emerald-400 transition-colors">Privacy Policy</Link>
            <Link href="/how-it-works" className="text-gray-400 hover:text-emerald-400 transition-colors">Terms of Service</Link>
            <Link href="/how-it-works" className="text-gray-400 hover:text-emerald-400 transition-colors">Cookie Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;