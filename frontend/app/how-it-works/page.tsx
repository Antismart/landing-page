import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Cog, Construction } from 'lucide-react';

export default function HowItWorks() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-900 via-black to-emerald-900 flex flex-col items-center justify-center p-4 text-center">
      <div className="relative">
        <Construction className="w-20 h-20 text-emerald-400 mb-6" />
        <div className="absolute inset-0 animate-ping opacity-30">
          <Construction className="w-20 h-20 text-emerald-400" />
        </div>
      </div>
      
      <h1 className="text-4xl md:text-5xl font-bold mb-4">
        <span className="text-emerald-400">How</span> It <span className="text-emerald-400">Works</span>
      </h1>
      
      <div className="flex items-center justify-center space-x-3 mb-8">
        <Cog className="w-6 h-6 text-emerald-400 animate-spin" />
        <p className="text-xl">Coming Soon!</p>
        <Cog className="w-6 h-6 text-emerald-400 animate-spin" style={{ animationDirection: 'reverse' }} />
      </div>
      
      <p className="max-w-lg text-lg text-gray-300 mb-8">
        We're crafting a detailed explanation of our regenerative agriculture platform.
        Check back soon to learn how we connect farmers, investors, and earth-loving foodies!
      </p>
      
      <div className="bg-black/20 p-6 rounded-xl border border-emerald-900/50 backdrop-blur-sm mb-8 max-w-md">
        <p className="text-gray-300 text-sm italic">
          "The secret of getting ahead is getting started." - Mark Twain
        </p>
      </div>
      
      <Link href="/" className="flex items-center space-x-2 text-emerald-400 hover:text-emerald-300 transition-colors">
        <ArrowLeft size={16} />
        <span>Back to Home</span>
      </Link>
    </div>
  );
}