import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Cloud, Sun, Tractor } from 'lucide-react';

export default function ForFarmers() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-900 via-black to-emerald-900 flex flex-col items-center justify-center p-4 text-center">
      <div className="relative">
        <Tractor className="w-20 h-20 text-emerald-400 mb-6" />
        <div className="absolute inset-0 animate-pulse opacity-30">
          <Tractor className="w-20 h-20 text-emerald-400" />
        </div>
      </div>
      
      <h1 className="text-4xl md:text-5xl font-bold mb-4">
        <span className="text-emerald-400">For</span> Farmers
      </h1>
      
      <div className="flex items-center justify-center space-x-3 mb-8">
        <Sun className="w-6 h-6 text-yellow-400 animate-pulse" />
        <p className="text-xl">Sprouting Soon!</p>
        <Cloud className="w-6 h-6 text-blue-300 animate-bounce" />
      </div>
      
      <p className="max-w-lg text-lg text-gray-300 mb-8">
        We&apos;re cultivating resources and tools designed specifically for regenerative farmers.
        Soon you&apos;ll discover how our platform helps you connect with conscious investors and grow sustainably.
      </p>
      
      <div className="bg-black/20 p-6 rounded-xl border border-emerald-900/50 backdrop-blur-sm mb-8 max-w-md">
        <p className="text-gray-300 text-sm italic">
          &ldquo;The farmer is the only man in our economy who buys everything at retail, sells everything at wholesale, and pays the freight both ways.&rdquo; — John F. Kennedy
        </p>
      </div>
      
      <Link href="/" className="flex items-center space-x-2 text-emerald-400 hover:text-emerald-300 transition-colors">
        <ArrowLeft size={16} />
        <span>Back to Home</span>
      </Link>
    </div>
  );
}