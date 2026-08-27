'use client';

import { useState } from 'react';
import { User, Shield, CheckCircle, Upload, AlertCircle } from 'lucide-react';

export default function ProfilePage() {
  const [verificationState, setVerificationState] = useState<'unverified' | 'pending' | 'verified'>('unverified');
  const [isSaving, setIsSaving] = useState(false);

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
    }, 800);
  };

  const handleSubmitVerification = () => {
    setVerificationState('pending');
    setTimeout(() => {
      // Simulate admin approval for demo purposes
      setVerificationState('verified');
    }, 3000);
  };

  return (
    <div className="p-4 md:p-8 max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-semibold text-gray-900">User Profile</h1>
        <p className="text-sm text-gray-500 mt-1">Manage your account details and verification status.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Left Column - Main Form */}
        <div className="md:col-span-2 space-y-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900 flex items-center">
                <User className="w-5 h-5 mr-2 text-gray-400" />
                Personal Information
              </h2>
            </div>
            <div className="p-6">
              <form onSubmit={handleSaveProfile} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                    <input type="text" defaultValue="Guest" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:outline-none text-sm" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                    <input type="text" defaultValue="User" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:outline-none text-sm" />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                  <input type="email" defaultValue="demo@ecoroute.io" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:outline-none text-sm text-gray-500" disabled />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Organization / Company</label>
                  <input type="text" defaultValue="Demo Corp" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:outline-none text-sm" />
                </div>

                <div className="pt-4 flex justify-end">
                  <button 
                    type="submit"
                    disabled={isSaving}
                    className="bg-gray-900 hover:bg-gray-800 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors disabled:opacity-50"
                  >
                    {isSaving ? 'Saving...' : 'Save Changes'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>

        {/* Right Column - Verification Status */}
        <div className="space-y-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
              <h2 className="text-lg font-semibold text-gray-900 flex items-center">
                <Shield className="w-5 h-5 mr-2 text-gray-500" />
                Verification Status
              </h2>
            </div>
            <div className="p-6 flex flex-col items-center text-center">
              
              {verificationState === 'unverified' && (
                <>
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                    <AlertCircle className="w-8 h-8 text-gray-400" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-1">Not Verified</h3>
                  <p className="text-sm text-gray-500 mb-6">You must verify your identity to dispatch trucks and edit routes.</p>
                  
                  <div className="w-full text-left bg-gray-50 p-4 rounded-lg border border-gray-200 border-dashed mb-4">
                    <div className="flex items-center justify-center py-4">
                       <Upload className="w-5 h-5 text-gray-400 mr-2" />
                       <span className="text-sm font-medium text-gray-600">Upload ID Document</span>
                    </div>
                  </div>
                  
                  <button 
                    onClick={handleSubmitVerification}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                  >
                    Submit for Verification
                  </button>
                </>
              )}

              {verificationState === 'pending' && (
                <>
                  <div className="w-16 h-16 bg-blue-50 border-4 border-blue-100 rounded-full flex items-center justify-center mb-4 relative">
                    <span className="absolute inset-0 rounded-full border-2 border-blue-500 border-t-transparent animate-spin"></span>
                    <Shield className="w-6 h-6 text-blue-500" />
                  </div>
                  <h3 className="font-semibold text-blue-900 mb-1">Verification Pending</h3>
                  <p className="text-sm text-gray-500">Your documents are currently under review by an administrator. This usually takes 1-2 hours.</p>
                </>
              )}

              {verificationState === 'verified' && (
                <>
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                    <CheckCircle className="w-8 h-8 text-green-600" />
                  </div>
                  <h3 className="font-semibold text-green-900 mb-1">Verified Account</h3>
                  <p className="text-sm text-gray-600 font-medium bg-green-50 px-3 py-1 rounded-full border border-green-200 mt-2">Level 3 Access Granted</p>
                  <p className="text-xs text-gray-500 mt-4">You have full permission to dispatch trucks and access all fleet analytics.</p>
                </>
              )}

            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
