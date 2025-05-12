'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Sprout } from 'lucide-react';
import AuthForm from '@/components/auth/AuthForm';

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-900 via-black to-emerald-900 flex flex-col">
      {/* Header */}
      <header className="p-6">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <Link href="/" className="flex items-center space-x-3">
            <div className="relative">
              <Sprout className="w-6 h-6 text-emerald-400" />
              <div className="absolute inset-0 animate-ping opacity-50">
                <Sprout className="w-6 h-6 text-emerald-400" />
              </div>
            </div>
            <span className="text-xl font-bold">Regen Roots</span>
          </Link>
          <Link href="/" className="flex items-center space-x-2 text-emerald-400 hover:text-emerald-300 transition-colors">
            <ArrowLeft size={16} />
            <span>Back</span>
          </Link>
        </div>
      </header>
      
      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center px-4 py-12">
        <h1 className="text-3xl sm:text-4xl font-bold mb-8 text-center">
          <span className="text-emerald-400">Welcome</span> Back
        </h1>
        
        <AuthForm type="login" />
        
        <div className="mt-8 max-w-md text-center text-sm text-gray-400">
          By logging in, you agree to our 
          <Link href="/terms" className="text-emerald-400 hover:text-emerald-300 mx-1">Terms of Service</Link> 
          and 
          <Link href="/privacy" className="text-emerald-400 hover:text-emerald-300 mx-1">Privacy Policy</Link>.
        </div>
      </main>
    </div>
  );
}