'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowLeft, BookOpen, PenTool, FileText } from 'lucide-react';

export default function Blog() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-900 via-black to-emerald-900 flex flex-col items-center justify-center p-4 text-center">
      <div className="relative">
        <BookOpen className="w-20 h-20 text-emerald-400 mb-6" />
        <div className="absolute inset-0 animate-flip opacity-30">
          <BookOpen className="w-20 h-20 text-emerald-400" />
        </div>
      </div>
      
      <h1 className="text-4xl md:text-5xl font-bold mb-4">
        <span className="text-emerald-400">Regen</span> Blog
      </h1>
      
      <div className="flex items-center justify-center space-x-3 mb-8">
        <PenTool className="w-6 h-6 text-emerald-400 animate-writing" />
        <p className="text-xl">Content Cultivating Soon!</p>
        <FileText className="w-6 h-6 text-gray-300 animate-pulse" />
      </div>
      
      <p className="max-w-lg text-lg text-gray-300 mb-8">
        Our team is planting the seeds for insightful articles, case studies, and stories about regenerative agriculture.
        Stay tuned for a harvest of knowledge that will inspire and inform!
      </p>
      
      <div className="bg-black/20 p-6 rounded-xl border border-emerald-900/50 backdrop-blur-sm mb-8 max-w-md">
        <p className="text-gray-300 text-sm italic">
          "To forget how to dig the earth and to tend the soil is to forget ourselves." — Mahatma Gandhi
        </p>
      </div>
      
      <Link href="/" className="flex items-center space-x-2 text-emerald-400 hover:text-emerald-300 transition-colors">
        <ArrowLeft size={16} />
        <span>Back to Home</span>
      </Link>
      
      <style jsx global>{`
        @keyframes flip {
          0%, 100% { transform: rotateY(0deg); }
          50% { transform: rotateY(180deg); }
        }
        .animate-flip {
          animation: flip 3s ease-in-out infinite;
        }
        
        @keyframes writing {
          0% { transform: translate(0, 0) rotate(0deg); }
          25% { transform: translate(2px, -2px) rotate(5deg); }
          50% { transform: translate(0, 2px) rotate(0deg); }
          75% { transform: translate(-2px, -1px) rotate(-5deg); }
          100% { transform: translate(0, 0) rotate(0deg); }
        }
        .animate-writing {
          animation: writing 2s ease-in-out infinite;
          transform-origin: bottom;
        }
      `}</style>
    </div>
  );
}