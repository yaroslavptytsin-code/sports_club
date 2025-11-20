'use client';

import { useState } from 'react';
import { 
  Users, 
  Settings, 
  BarChart3, 
  Calendar,
  UserPlus,
  FileText,
  Trophy,
  Award,
  Target,
  Star,
  TrendingUp
} from 'lucide-react';
import AdvertisementCarousel from '@/components/AdvertisementCarousel';
import ModernNavbar from '@/components/ModernNavbar';

export default function MyClub() {
  const [activeSection, setActiveSection] = useState<'overview' | 'members' | 'workouts' | 'analytics'>('overview');

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex flex-col">
      <ModernNavbar />
      
      <div className="flex-1 flex flex-col w-full px-4 sm:px-6 lg:px-8 py-8">
        {/* Advertisement Carousel - Top Section */}
        <div className="mb-8 flex-shrink-0">
          <AdvertisementCarousel />
        </div>

        {/* Main Content Area - Fills remaining space */}
        <div className="flex-1 flex gap-8 min-h-0">
          {/* Left Sidebar */}
          <div className="w-80 flex-shrink-0">
            <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-6 h-full flex flex-col">
              <div className="text-center mb-8">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <Users className="w-10 h-10 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">Elite Training Club</h2>
                <p className="text-gray-600 text-sm mt-2">Professional Athletic Club</p>
              </div>

              <nav className="space-y-3 flex-1">
                <button
                  onClick={() => setActiveSection('overview')}
                  className={`w-full flex items-center px-4 py-4 text-base font-semibold rounded-2xl transition-all duration-300 ${
                    activeSection === 'overview'
                      ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-2xl transform scale-105'
                      : 'text-gray-700 hover:bg-gray-100 hover:shadow-lg'
                  }`}
                >
                  <Users className="w-5 h-5 mr-3" />
                  Club Overview
                </button>
                
                <button
                  onClick={() => setActiveSection('members')}
                  className={`w-full flex items-center px-4 py-4 text-base font-semibold rounded-2xl transition-all duration-300 ${
                    activeSection === 'members'
                      ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-2xl transform scale-105'
                      : 'text-gray-700 hover:bg-gray-100 hover:shadow-lg'
                  }`}
                >
                  <UserPlus className="w-5 h-5 mr-3" />
                  Members
                </button>
                
                <button
                  onClick={() => setActiveSection('workouts')}
                  className={`w-full flex items-center px-4 py-4 text-base font-semibold rounded-2xl transition-all duration-300 ${
                    activeSection === 'workouts'
                      ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-2xl transform scale-105'
                      : 'text-gray-700 hover:bg-gray-100 hover:shadow-lg'
                  }`}
                >
                  <Calendar className="w-5 h-5 mr-3" />
                  Club Workouts
                </button>
                
                <button
                  onClick={() => setActiveSection('analytics')}
                  className={`w-full flex items-center px-4 py-4 text-base font-semibold rounded-2xl transition-all duration-300 ${
                    activeSection === 'analytics'
                      ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-2xl transform scale-105'
                      : 'text-gray-700 hover:bg-gray-100 hover:shadow-lg'
                  }`}
                >
                  <BarChart3 className="w-5 h-5 mr-3" />
                  Analytics
                </button>
              </nav>

              {/* Quick Stats */}
              <div className="mt-8 p-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl border border-blue-200">
                <h3 className="text-sm font-bold text-blue-800 uppercase tracking-wide mb-4 flex items-center">
                  <TrendingUp className="w-4 h-4 mr-2" />
                  Club Stats
                </h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 text-sm">Total Members</span>
                    <span className="font-bold text-blue-600 text-lg">24</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 text-sm">Active Today</span>
                    <span className="font-bold text-green-600 text-lg">8</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 text-sm">This Week</span>
                    <span className="font-bold text-purple-600 text-lg">42</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content - Stretched to fill remaining space */}
          <div className="flex-1 min-w-0 flex flex-col">
            {activeSection === 'overview' && <ClubOverview />}
            {activeSection === 'members' && <MembersSection />}
            {activeSection === 'workouts' && <ClubWorkouts />}
            {activeSection === 'analytics' && <AnalyticsSection />}
          </div>

          {/* Right Sidebar */}
          <div className="w-96 flex-shrink-0">
            <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-6 h-full flex flex-col">
              <h3 className="text-xl font-bold text-gray-900 mb-6">
                Club Management
              </h3>
              
              <div className="space-y-4 flex-1">
                <button className="w-full flex items-center justify-between p-5 border-2 border-dashed border-blue-200 rounded-2xl hover:border-blue-300 hover:bg-blue-50 transition-all duration-300 group">
                  <span className="text-base font-semibold text-gray-700 group-hover:text-blue-700">Add New Member</span>
                  <UserPlus className="w-5 h-5 text-gray-400 group-hover:text-blue-500" />
                </button>
                
                <button className="w-full flex items-center justify-between p-5 border-2 border-dashed border-green-200 rounded-2xl hover:border-green-300 hover:bg-green-50 transition-all duration-300 group">
                  <span className="text-base font-semibold text-gray-700 group-hover:text-green-700">Create Group Workout</span>
                  <Calendar className="w-5 h-5 text-gray-400 group-hover:text-green-500" />
                </button>
                
                <button className="w-full flex items-center justify-between p-5 border-2 border-dashed border-purple-200 rounded-2xl hover:border-purple-300 hover:bg-purple-50 transition-all duration-300 group">
                  <span className="text-base font-semibold text-gray-700 group-hover:text-purple-700">Generate Report</span>
                  <FileText className="w-5 h-5 text-gray-400 group-hover:text-purple-500" />
                </button>
              </div>

              {/* Recent Club Activities */}
              <div className="mt-8">
                <h4 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                  <Award className="w-5 h-5 mr-2 text-yellow-500" />
                  Recent Activities
                </h4>
                <div className="space-y-3">
                  <div className="text-sm text-gray-600 p-4 bg-gray-50 rounded-xl border border-gray-200">
                    🏊‍♂️ <strong>John Doe</strong> completed advanced swim workout
                  </div>
                  <div className="text-sm text-gray-600 p-4 bg-gray-50 rounded-xl border border-gray-200">
                    👋 <strong>Sarah Wilson</strong> joined the club as new member
                  </div>
                  <div className="text-sm text-gray-600 p-4 bg-gray-50 rounded-xl border border-gray-200">
                    🏃‍♀️ Group running session scheduled for Saturday
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Sub-components for club sections
function ClubOverview() {
  return (
    <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-8 flex-1 flex flex-col">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl font-bold text-gray-900">Club Overview</h2>
        <button className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-8 py-3 rounded-xl text-base font-semibold hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
          Manage Club
        </button>
      </div>

      {/* Club Stats Grid */}
      <div className="grid grid-cols-4 gap-6 mb-8">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-6 rounded-2xl text-white shadow-2xl">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold opacity-90">Total Members</h3>
            <Users className="w-6 h-6 opacity-90" />
          </div>
          <p className="text-4xl font-bold mt-4">24</p>
        </div>
        
        <div className="bg-gradient-to-br from-green-500 to-green-600 p-6 rounded-2xl text-white shadow-2xl">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold opacity-90">Active Today</h3>
            <TrendingUp className="w-6 h-6 opacity-90" />
          </div>
          <p className="text-4xl font-bold mt-4">8</p>
        </div>
        
        <div className="bg-gradient-to-br from-purple-500 to-purple-600 p-6 rounded-2xl text-white shadow-2xl">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold opacity-90">This Week</h3>
            <Calendar className="w-6 h-6 opacity-90" />
          </div>
          <p className="text-4xl font-bold mt-4">42</p>
        </div>
        
        <div className="bg-gradient-to-br from-orange-500 to-orange-600 p-6 rounded-2xl text-white shadow-2xl">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold opacity-90">Completion Rate</h3>
            <Trophy className="w-6 h-6 opacity-90" />
          </div>
          <p className="text-4xl font-bold mt-4">78%</p>
        </div>
      </div>

      {/* Recent Members */}
      <div className="flex-1">
        <h3 className="text-xl font-bold text-gray-900 mb-6">Recent Members</h3>
        <div className="space-y-4 h-full overflow-y-auto">
          {[1, 2, 3, 4, 5].map((item) => (
            <div key={item} className="flex items-center justify-between p-6 border-2 border-gray-200 rounded-2xl hover:border-blue-300 hover:bg-blue-50 transition-all duration-300 group">
              <div className="flex items-center space-x-4">
                <div className="w-14 h-14 bg-gradient-to-br from-blue-400 to-purple-500 rounded-2xl flex items-center justify-center text-white font-bold text-lg">
                  {item}
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 text-lg">Member Name {item}</h4>
                  <p className="text-sm text-gray-500">Joined 2 days ago • 3 workouts completed</p>
                </div>
              </div>
              <div className="text-right">
                <div className="flex items-center space-x-1 text-yellow-500 mb-1">
                  <Star className="w-4 h-4 fill-current" />
                  <span className="text-sm font-semibold">4.8</span>
                </div>
                <p className="text-sm font-medium text-green-600">Active</p>
                <p className="text-xs text-gray-500">Last seen today</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function MembersSection() {
  return (
    <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-8 flex-1 flex flex-col">
      <h2 className="text-3xl font-bold text-gray-900 mb-8">Club Members</h2>
      <div className="grid grid-cols-2 gap-8 flex-1">
        <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl border-2 border-dashed border-gray-300 flex items-center justify-center p-12">
          <div className="text-center text-gray-500">
            <Users className="w-20 h-20 mx-auto mb-6 opacity-60" />
            <p className="text-2xl font-bold mb-2">Member Directory</p>
            <p className="text-lg">Manage all club members and their profiles</p>
          </div>
        </div>
        <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl border-2 border-dashed border-gray-300 flex items-center justify-center p-12">
          <div className="text-center text-gray-500">
            <UserPlus className="w-20 h-20 mx-auto mb-6 opacity-60" />
            <p className="text-2xl font-bold mb-2">Add Members</p>
            <p className="text-lg">Invite new members to join your club</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function ClubWorkouts() {
  return (
    <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-8 flex-1 flex flex-col">
      <h2 className="text-3xl font-bold text-gray-900 mb-8">Club Workouts</h2>
      <div className="grid grid-cols-2 gap-8 flex-1">
        <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl border-2 border-dashed border-gray-300 flex items-center justify-center p-12">
          <div className="text-center text-gray-500">
            <Calendar className="w-20 h-20 mx-auto mb-6 opacity-60" />
            <p className="text-2xl font-bold mb-2">Workout Schedule</p>
            <p className="text-lg">Plan and schedule group workouts</p>
          </div>
        </div>
        <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl border-2 border-dashed border-gray-300 flex items-center justify-center p-12">
          <div className="text-center text-gray-500">
            <Target className="w-20 h-20 mx-auto mb-6 opacity-60" />
            <p className="text-2xl font-bold mb-2">Training Programs</p>
            <p className="text-lg">Create custom training programs</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function AnalyticsSection() {
  return (
    <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-8 flex-1 flex flex-col">
      <h2 className="text-3xl font-bold text-gray-900 mb-8">Club Analytics</h2>
      <div className="grid grid-cols-2 gap-8 flex-1">
        <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl border-2 border-dashed border-gray-300 flex items-center justify-center p-12">
          <div className="text-center text-gray-500">
            <BarChart3 className="w-20 h-20 mx-auto mb-6 opacity-60" />
            <p className="text-2xl font-bold mb-2">Performance Analytics</p>
            <p className="text-lg">Track club-wide performance metrics</p>
          </div>
        </div>
        <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl border-2 border-dashed border-gray-300 flex items-center justify-center p-12">
          <div className="text-center text-gray-500">
            <TrendingUp className="w-20 h-20 mx-auto mb-6 opacity-60" />
            <p className="text-2xl font-bold mb-2">Progress Reports</p>
            <p className="text-lg">Generate detailed progress reports</p>
          </div>
        </div>
      </div>
    </div>
  );
}