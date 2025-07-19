import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Camera, Trophy, Star, Clock, Target, Plus, Heart, ShoppingCart } from 'lucide-react';

// Types
interface Product {
  id: number;
  name: string;
  price: string;
  image: string;
  description: string;
  rating: number;
}

interface Progress {
  id: number;
  title: string;
  date: string;
  image: string;
  type: 'photo' | 'milestone' | 'achievement';
  description?: string;
}

interface HobbyData {
  id: string;
  name: string;
  icon: string;
  color: string;
  gradient: string;
  products: Product[];
  progress: Progress[];
  stats: {
    timeSpent: string;
    projectsCompleted: number;
    skillLevel: number;
    achievements: number;
  };
}

// Sample data
const hobbiesData: HobbyData[] = [
  {
    id: 'pen-drawing',
    name: 'Pen Drawing',
    icon: '✏️',
    color: '#6366f1',
    gradient: 'from-indigo-500 to-purple-600',
    products: [
      {
        id: 1,
        name: 'Sakura Pigma Micron Pens',
        price: '$24.99',
        image: 'https://images.pexels.com/photos/1193743/pexels-photo-1193743.jpeg?auto=compress&cs=tinysrgb&w=300',
        description: 'Professional archival ink pens for detailed drawings',
        rating: 4.8
      },
      {
        id: 2,
        name: 'Strathmore Drawing Paper',
        price: '$15.99',
        image: 'https://images.pexels.com/photos/1194420/pexels-photo-1194420.jpeg?auto=compress&cs=tinysrgb&w=300',
        description: 'High-quality paper perfect for pen and ink work',
        rating: 4.6
      },
      {
        id: 3,
        name: 'Rotring Technical Pen Set',
        price: '$89.99',
        image: 'https://images.pexels.com/photos/1047540/pexels-photo-1047540.jpeg?auto=compress&cs=tinysrgb&w=300',
        description: 'Precision technical pens for architectural drawings',
        rating: 4.9
      }
    ],
    progress: [
      {
        id: 1,
        title: 'Botanical Study Complete',
        date: '2024-01-15',
        image: 'https://images.pexels.com/photos/1193743/pexels-photo-1193743.jpeg?auto=compress&cs=tinysrgb&w=300',
        type: 'milestone',
        description: 'Finished my first detailed botanical illustration'
      },
      {
        id: 2,
        title: 'Daily Sketch Challenge',
        date: '2024-01-10',
        image: 'https://images.pexels.com/photos/1194420/pexels-photo-1194420.jpeg?auto=compress&cs=tinysrgb&w=300',
        type: 'photo'
      }
    ],
    stats: {
      timeSpent: '45h 30m',
      projectsCompleted: 12,
      skillLevel: 3,
      achievements: 8
    }
  },
  {
    id: 'resin-making',
    name: 'Resin Making',
    icon: '💎',
    color: '#06b6d4',
    gradient: 'from-cyan-500 to-blue-600',
    products: [
      {
        id: 4,
        name: 'EpoxyPlus Resin Kit',
        price: '$34.99',
        image: 'https://images.pexels.com/photos/6991574/pexels-photo-6991574.jpeg?auto=compress&cs=tinysrgb&w=300',
        description: 'Crystal clear epoxy resin for jewelry making',
        rating: 4.7
      },
      {
        id: 5,
        name: 'Silicone Molds Set',
        price: '$19.99',
        image: 'https://images.pexels.com/photos/6991578/pexels-photo-6991578.jpeg?auto=compress&cs=tinysrgb&w=300',
        description: 'Various shapes for creating resin jewelry',
        rating: 4.5
      }
    ],
    progress: [
      {
        id: 3,
        title: 'First Pendant Created',
        date: '2024-01-12',
        image: 'https://images.pexels.com/photos/6991574/pexels-photo-6991574.jpeg?auto=compress&cs=tinysrgb&w=300',
        type: 'achievement'
      }
    ],
    stats: {
      timeSpent: '28h 15m',
      projectsCompleted: 8,
      skillLevel: 2,
      achievements: 5
    }
  },
  {
    id: 'bead-crafts',
    name: 'Bead Crafts',
    icon: '📿',
    color: '#ec4899',
    gradient: 'from-pink-500 to-rose-600',
    products: [
      {
        id: 6,
        name: 'Glass Bead Assortment',
        price: '$29.99',
        image: 'https://images.pexels.com/photos/7125530/pexels-photo-7125530.jpeg?auto=compress&cs=tinysrgb&w=300',
        description: 'Colorful glass beads in various sizes',
        rating: 4.6
      }
    ],
    progress: [
      {
        id: 4,
        title: 'Bracelet Collection',
        date: '2024-01-08',
        image: 'https://images.pexels.com/photos/7125530/pexels-photo-7125530.jpeg?auto=compress&cs=tinysrgb&w=300',
        type: 'photo'
      }
    ],
    stats: {
      timeSpent: '32h 45m',
      projectsCompleted: 15,
      skillLevel: 4,
      achievements: 12
    }
  }
];

function App() {
  const [currentHobby, setCurrentHobby] = useState(0);
  const [productScrollPosition, setProductScrollPosition] = useState(0);

  const hobby = hobbiesData[currentHobby];

  // Product carousel navigation
  const scrollProducts = (direction: 'left' | 'right') => {
    const maxScroll = hobby.products.length - 1;
    if (direction === 'left' && productScrollPosition > 0) {
      setProductScrollPosition(productScrollPosition - 1);
    } else if (direction === 'right' && productScrollPosition < maxScroll) {
      setProductScrollPosition(productScrollPosition + 1);
    }
  };

  // Reset scroll position when changing hobbies
  useEffect(() => {
    setProductScrollPosition(0);
  }, [currentHobby]);

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-3 h-3 ${i < Math.floor(rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
      />
    ));
  };

  const renderSkillLevel = (level: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <div
        key={i}
        className={`w-2 h-2 rounded-full ${i < level ? 'bg-current' : 'bg-gray-300'}`}
      />
    ));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="px-4 py-3">
          <h1 className="text-xl font-bold text-gray-900 text-center">Hobby Tracker</h1>
        </div>
      </header>

      {/* Hobby Navigation */}
      <div className="bg-white border-b border-gray-200">
        <div className="flex overflow-x-auto scrollbar-hide px-4 py-3 space-x-3">
          {hobbiesData.map((hobbyItem, index) => (
            <button
              key={hobbyItem.id}
              onClick={() => setCurrentHobby(index)}
              className={`flex-shrink-0 flex items-center space-x-2 px-4 py-2 rounded-full transition-all duration-300 ${
                currentHobby === index
                  ? `bg-gradient-to-r ${hobbyItem.gradient} text-white shadow-lg`
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
              style={{ minWidth: '120px' }}
            >
              <span className="text-lg">{hobbyItem.icon}</span>
              <span className="font-medium text-sm">{hobbyItem.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="pb-6">
        {/* Hero Section */}
        <div className={`bg-gradient-to-r ${hobby.gradient} text-white p-6`}>
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-2xl font-bold">{hobby.name}</h2>
              <p className="text-white/80">Track your progress and discover new tools</p>
            </div>
            <div className="text-4xl">{hobby.icon}</div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-4 mt-6">
            <div className="bg-white/20 backdrop-blur-sm rounded-lg p-3">
              <div className="flex items-center space-x-2 mb-1">
                <Clock className="w-4 h-4" />
                <span className="text-sm font-medium">Time Spent</span>
              </div>
              <p className="text-lg font-bold">{hobby.stats.timeSpent}</p>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-lg p-3">
              <div className="flex items-center space-x-2 mb-1">
                <Target className="w-4 h-4" />
                <span className="text-sm font-medium">Projects</span>
              </div>
              <p className="text-lg font-bold">{hobby.stats.projectsCompleted}</p>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-lg p-3">
              <div className="flex items-center space-x-2 mb-1">
                <Star className="w-4 h-4" />
                <span className="text-sm font-medium">Skill Level</span>
              </div>
              <div className="flex items-center space-x-1 mt-1">
                {renderSkillLevel(hobby.stats.skillLevel)}
              </div>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-lg p-3">
              <div className="flex items-center space-x-2 mb-1">
                <Trophy className="w-4 h-4" />
                <span className="text-sm font-medium">Achievements</span>
              </div>
              <p className="text-lg font-bold">{hobby.stats.achievements}</p>
            </div>
          </div>
        </div>

        {/* Product Recommendations */}
        <div className="px-4 py-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-gray-900">Recommended Products</h3>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => scrollProducts('left')}
                disabled={productScrollPosition === 0}
                className="p-2 rounded-full bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-200 transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={() => scrollProducts('right')}
                disabled={productScrollPosition >= hobby.products.length - 1}
                className="p-2 rounded-full bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-200 transition-colors"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Product Carousel */}
          <div className="relative overflow-hidden">
            <div
              className="flex transition-transform duration-300 ease-in-out"
              style={{
                transform: `translateX(-${productScrollPosition * 100}%)`,
              }}
            >
              {hobby.products.map((product) => (
                <div key={product.id} className="w-full flex-shrink-0 px-2">
                  <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                    <div className="aspect-square bg-gray-100">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-4">
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="font-semibold text-gray-900 text-sm leading-tight">
                          {product.name}
                        </h4>
                        <button className="p-1 hover:bg-gray-100 rounded-full transition-colors">
                          <Heart className="w-4 h-4 text-gray-400" />
                        </button>
                      </div>
                      <div className="flex items-center space-x-1 mb-2">
                        {renderStars(product.rating)}
                        <span className="text-xs text-gray-500 ml-1">({product.rating})</span>
                      </div>
                      <p className="text-xs text-gray-600 mb-3 line-clamp-2">
                        {product.description}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-lg font-bold" style={{ color: hobby.color }}>
                          {product.price}
                        </span>
                        <button
                          className="flex items-center space-x-1 px-3 py-2 rounded-lg text-white text-sm font-medium transition-all duration-200 hover:scale-105"
                          style={{ backgroundColor: hobby.color }}
                        >
                          <ShoppingCart className="w-4 h-4" />
                          <span>Add</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Scroll Indicators */}
          <div className="flex justify-center space-x-2 mt-4">
            {hobby.products.map((_, index) => (
              <button
                key={index}
                onClick={() => setProductScrollPosition(index)}
                className={`w-2 h-2 rounded-full transition-all duration-200 ${
                  index === productScrollPosition ? 'w-6' : ''
                }`}
                style={{
                  backgroundColor: index === productScrollPosition ? hobby.color : '#d1d5db',
                }}
              />
            ))}
          </div>
        </div>

        {/* Progress Showcase */}
        <div className="px-4 py-6 bg-white">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-gray-900">Your Progress</h3>
            <button
              className="flex items-center space-x-1 px-3 py-2 rounded-lg text-white text-sm font-medium transition-all duration-200 hover:scale-105"
              style={{ backgroundColor: hobby.color }}
            >
              <Plus className="w-4 h-4" />
              <span>Add</span>
            </button>
          </div>

          {/* Progress Grid */}
          <div className="space-y-4">
            {hobby.progress.map((item) => (
              <div key={item.id} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-xl">
                <div className="relative">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-16 h-16 object-cover rounded-lg"
                  />
                  <div
                    className="absolute -top-1 -right-1 w-6 h-6 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: hobby.color }}
                  >
                    {item.type === 'milestone' && <Target className="w-3 h-3 text-white" />}
                    {item.type === 'achievement' && <Trophy className="w-3 h-3 text-white" />}
                    {item.type === 'photo' && <Camera className="w-3 h-3 text-white" />}
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold text-gray-900 text-sm">{item.title}</h4>
                  <p className="text-xs text-gray-500">{item.date}</p>
                  {item.description && (
                    <p className="text-xs text-gray-600 mt-1">{item.description}</p>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Add Progress Button */}
          <button className="w-full mt-4 p-4 border-2 border-dashed border-gray-300 rounded-xl text-gray-500 hover:border-gray-400 hover:text-gray-600 transition-colors">
            <div className="flex flex-col items-center space-y-2">
              <Camera className="w-6 h-6" />
              <span className="text-sm font-medium">Add Progress Photo</span>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;