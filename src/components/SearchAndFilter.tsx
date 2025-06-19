import React, { useState } from 'react';
import { Search, Filter, SlidersHorizontal } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface SearchAndFilterProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
  minMagnitude: number;
  onMinMagnitudeChange: (magnitude: number) => void;
  darkMode?: boolean;
}

export const SearchAndFilter: React.FC<SearchAndFilterProps> = ({
  searchTerm,
  onSearchChange,
  minMagnitude,
  onMinMagnitudeChange,
  darkMode = false
}) => {
  const [showFilters, setShowFilters] = useState(false);

  return (
    <motion.div 
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`rounded-xl shadow-lg p-6 border transition-all duration-300 ${
        darkMode 
          ? 'bg-gray-800 border-gray-700' 
          : 'bg-white border-gray-100'
      }`}
    >
      {/* Search Bar */}
      <div className="flex gap-3 mb-4">
        <div className="flex-1 relative">
          <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 ${
            darkMode ? 'text-gray-400' : 'text-gray-400'
          }`} />
          <input
            type="text"
            placeholder="Search by location..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className={`w-full pl-10 pr-4 py-3 rounded-lg border transition-all duration-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
              darkMode 
                ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
            }`}
          />
        </div>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setShowFilters(!showFilters)}
          className={`px-6 py-3 rounded-lg border transition-all duration-200 flex items-center gap-2 ${
            showFilters 
              ? 'bg-blue-100 border-blue-300 text-blue-700' 
              : darkMode
                ? 'bg-gray-700 border-gray-600 text-gray-300 hover:bg-gray-600'
                : 'bg-gray-50 border-gray-300 text-gray-600 hover:bg-gray-100'
          }`}
        >
          <SlidersHorizontal className="w-4 h-4" />
          Filters
        </motion.button>
      </div>

      {/* Animated Filters */}
      <AnimatePresence>
        {showFilters && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className={`border-t pt-4 ${
              darkMode ? 'border-gray-700' : 'border-gray-200'
            }`}
          >
            <div className="flex items-center gap-4">
              <Filter className={`w-4 h-4 ${
                darkMode ? 'text-gray-400' : 'text-gray-500'
              }`} />
              <div className="flex items-center gap-3 flex-1">
                <label htmlFor="minMagnitude" className={`text-sm whitespace-nowrap ${
                  darkMode ? 'text-gray-300' : 'text-gray-600'
                }`}>
                  Min Magnitude:
                </label>
                <input
                  id="minMagnitude"
                  type="range"
                  min="0"
                  max="9"
                  step="0.5"
                  value={minMagnitude}
                  onChange={(e) => onMinMagnitudeChange(parseFloat(e.target.value))}
                  className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                />
                <motion.span 
                  key={minMagnitude}
                  initial={{ scale: 1.2 }}
                  animate={{ scale: 1 }}
                  className={`text-sm font-bold min-w-8 px-2 py-1 rounded ${
                    minMagnitude >= 5 
                      ? 'bg-red-100 text-red-700' 
                      : minMagnitude >= 3 
                        ? 'bg-orange-100 text-orange-700'
                        : 'bg-blue-100 text-blue-700'
                  }`}
                >
                  {minMagnitude.toFixed(1)}
                </motion.span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};