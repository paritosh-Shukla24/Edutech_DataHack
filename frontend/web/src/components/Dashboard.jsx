import React from 'react'
import { BarChart2, Users, Clock, Download, Send, MessageCircle, Twitter, Instagram, Linkedin, Crown, ChevronRight, TrendingUp, Zap, Target } from 'lucide-react'

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-gray-100 p-8 font-sans">
    <div className="max-w-7xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Key Metrics */}
        {[
          { value: '84+', label: 'Metrics', icon: BarChart2 },
          { value: '35+', label: 'Analytics', icon: Users },
          { value: '12+', label: 'Reports', icon: Clock },
        ].map((metric, index) => (
          <div key={index} className="bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-2xl p-6 flex flex-col items-center justify-center transition-all duration-300 hover:bg-opacity-20">
            <metric.icon className="text-purple-400 mb-3" size={28} />
            <h2 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">{metric.value}</h2>
            <p className="text-sm text-gray-400 mt-2">{metric.label}</p>
          </div>
        ))}

        {/* Main Info Card */}
        <div className="bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-2xl p-8 col-span-1 md:col-span-2 row-span-2">
          <div className="flex items-center mb-6">
            <div className="w-20 h-20 bg-gradient-to-br from-purple-400 to-pink-600 rounded-full mr-6 flex items-center justify-center">
              <BarChart2 size={32} className="text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">Data Insights</h1>
              <p className="text-gray-400">Real-time Analytics Platform</p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-6 mt-6">
            {[
              { label: 'Region', value: 'Global' },
              { label: 'Languages', value: 'Multi' },
              { label: 'Datasets', value: 'Various' },
              { label: 'Timezone', value: 'UTC' },
            ].map((item, index) => (
              <div key={index} className="flex items-center bg-white bg-opacity-5 rounded-xl p-4 transition-all duration-300 hover:bg-opacity-10">
                <div className="w-3 h-3 bg-purple-400 rounded-full mr-3"></div>
                <span className="text-sm">{item.label}: <span className="font-semibold">{item.value}</span></span>
              </div>
            ))}
          </div>
          <div className="mt-8 flex space-x-4">
            <button className="bg-gradient-to-r from-purple-500 to-pink-600 text-white px-6 py-3 rounded-xl flex items-center text-sm font-semibold transition-all duration-300 hover:opacity-90">
              <Send className="w-4 h-4 mr-2" />
              Export Data
            </button>
            <button className="bg-white bg-opacity-10 text-white px-6 py-3 rounded-xl flex items-center text-sm font-semibold transition-all duration-300 hover:bg-opacity-20">
              <MessageCircle className="w-4 h-4 mr-2" />
              Share Insights
            </button>
          </div>
        </div>

        {/* User Feedback Section */}
        <div className="bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-2xl p-6 row-span-2">
          <h2 className="text-2xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">User Feedback</h2>
          {[
            { name: 'User A', team: 'Team Alpha', date: '11 Aug', review: 'The real-time processing capabilities have significantly improved our decision-making process.' },
            { name: 'User B', team: 'Team Beta', date: '28 Jul', review: 'Intuitive interface and powerful analytics tools. It has streamlined our workflow considerably.' },
          ].map((review, index) => (
            <div key={index} className="mb-4 bg-white bg-opacity-5 rounded-xl p-4 transition-all duration-300 hover:bg-opacity-10">
              <div className="flex items-center mb-3">
                <div className="w-10 h-10 bg-gradient-to-br from-purple-400 to-pink-600 rounded-full mr-3 flex items-center justify-center text-white font-bold">
                  {review.name[5]}
                </div>
                <div>
                  <h3 className="font-semibold text-sm">{review.name}</h3>
                  <p className="text-xs text-gray-400">{review.team}</p>
                </div>
                <span className="ml-auto text-xs text-gray-400">{review.date}</span>
              </div>
              <p className="text-sm">{review.review}</p>
            </div>
          ))}
        </div>

        {/* Performance Metrics */}
        <div className="bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-2xl p-6">
          <h2 className="text-2xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">Performance Metrics</h2>
          <div className="space-y-4">
            {[
              { label: 'Efficiency', value: '92%', icon: Zap, color: 'text-green-400' },
              { label: 'Accuracy', value: '88%', icon: Target, color: 'text-blue-400' },
              { label: 'Growth', value: '+15%', icon: TrendingUp, color: 'text-yellow-400' },
            ].map((metric, index) => (
              <div key={index} className="flex items-center justify-between bg-white bg-opacity-5 rounded-xl p-4 transition-all duration-300 hover:bg-opacity-10">
                <div className="flex items-center">
                  <metric.icon className={`${metric.color} mr-3`} size={24} />
                  <span className="text-sm font-medium">{metric.label}</span>
                </div>
                <span className={`text-lg font-bold ${metric.color}`}>{metric.value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Analysis Workflow */}
        <div className="bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-2xl p-6 col-span-1 md:col-span-2">
          <h2 className="text-2xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">Analysis Workflow</h2>
          <div className="flex justify-between">
            {[
              'Data Collection',
              'Preprocessing',
              'Model Training',
              'Validation',
              'Deployment',
            ].map((step, index) => (
              <div key={index} className="flex flex-col items-center">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-pink-600 rounded-full flex items-center justify-center text-white font-bold mb-2">
                  {index + 1}
                </div>
                <p className="text-xs text-center">{step}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Integration Ecosystem */}
        <div className="bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-2xl p-6 col-span-1 md:col-span-3">
          <h2 className="text-2xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">Integration Ecosystem</h2>
          <div className="grid grid-cols-4 md:grid-cols-8 gap-4">
            {['API 1', 'Service 2', 'Platform 3', 'Tool 4', 'System 5', 'Framework 6', 'Library 7', 'SDK 8'].map((partner, index) => (
              <div key={index} className="bg-white bg-opacity-5 rounded-xl p-3 text-center transition-all duration-300 hover:bg-opacity-10">
                <p className="text-xs">{partner}</p>
              </div>
            ))}
          </div>
        </div>

        {/* External Resources */}
        <div className="bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-2xl p-6 col-span-1 md:col-span-2">
          <h2 className="text-2xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">External Resources</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { icon: Twitter, label: 'Latest Updates' },
              { icon: Instagram, label: 'Visual Insights' },
              { icon: Linkedin, label: 'Professional Network' },
            ].map((social, index) => (
              <div key={index} className="flex items-center bg-white bg-opacity-5 rounded-xl p-4 transition-all duration-300 hover:bg-opacity-10">
                <social.icon className="w-5 h-5 mr-3 text-purple-400" />
                <span className="text-sm">{social.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Premium Access */}
        <div className="bg-gradient-to-br from-purple-600 to-pink-700 rounded-2xl p-6 relative overflow-hidden group">
          <div className="absolute inset-0 bg-white opacity-10 transition-opacity duration-300 group-hover:opacity-20"></div>
          <div className="relative z-10">
            <div className="flex items-center mb-4">
              <Crown className="text-yellow-400 mr-3" size={28} />
              <h2 className="text-2xl font-bold text-white">Premium Access</h2>
            </div>
            <p className="text-sm text-gray-200 mb-6">Unlock advanced features and priority support</p>
            <button className="w-full bg-white text-purple-600 px-6 py-3 rounded-xl font-semibold mb-3 transition-all duration-300 hover:bg-opacity-90">
              Upgrade Now
            </button>
            <button className="w-full bg-white bg-opacity-20 text-white px-6 py-3 rounded-xl font-semibold flex items-center justify-center transition-all duration-300 hover:bg-opacity-30">
              Learn More
              <ChevronRight className="ml-2 w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
  )
}

export default Dashboard