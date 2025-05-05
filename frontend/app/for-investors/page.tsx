'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Coins, TrendingUp, Sprout } from 'lucide-react';

export default function ForInvestors() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-900 via-black to-emerald-900 flex flex-col items-center justify-center p-4 text-center">
      <div className="relative">
        <Coins className="w-20 h-20 text-emerald-400 mb-6" />
        <div className="absolute inset-0 animate-spin-slow opacity-30">
          <Coins className="w-20 h-20 text-emerald-400" />
        </div>
      </div>
      
      <h1 className="text-4xl md:text-5xl font-bold mb-4">
        <span className="text-emerald-400">For</span> Investors
      </h1>
      
      <div className="flex items-center justify-center space-x-3 mb-8">
        <TrendingUp className="w-6 h-6 text-emerald-400 animate-pulse" />
        <p className="text-xl">Growing Your Opportunities Soon!</p>
        <Sprout className="w-6 h-6 text-emerald-300 animate-bounce" />
      </div>
      
      <p className="max-w-lg text-lg text-gray-300 mb-8">
        We&apos;re developing innovative investment opportunities that allow you to support sustainable farming
        while earning returns. Our blockchain-backed platform will provide transparency at every stage.
      </p>
      
      <div className="bg-black/20 p-6 rounded-xl border border-emerald-900/50 backdrop-blur-sm mb-8 max-w-md">
        <p className="text-gray-300 text-sm italic">
          &ldquo;The best investment on Earth is earth.&rdquo; — Louis Glickman
        </p>
      </div>
      
      <Link href="/" className="flex items-center space-x-2 text-emerald-400 hover:text-emerald-300 transition-colors">
        <ArrowLeft size={16} />
        <span>Back to Home</span>
      </Link>
      
      <style jsx global>{`
        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        .animate-spin-slow {
          animation: spin-slow 3s linear infinite;
        }
      `}</style>
    </div>
  );
}