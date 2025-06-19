import React, { useState, useMemo } from 'react';
import { RefreshCw, Activity, Globe, Clock, Map, Moon, Sun, Github, Heart } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useEarthquakes } from './hooks/useEarthquakes';
import { EarthquakeCard } from './components/EarthquakeCard';
import { EarthquakeModal } from './components/EarthquakeModal';
import { EarthquakeMap } from './components/EarthquakeMap';
import { LoadingSpinner } from './components/LoadingSpinner';
import { ErrorMessage } from './components/ErrorMessage';
import { SearchAndFilter } from './components/SearchAndFilter';
import { Earthquake } from './types/earthquake';
import { formatDateTime } from './utils/dateUtils';

function App() {
  const { earthquakes, loading, error, lastUpdated, refetch } = useEarthquakes();
  const [selectedEarthquake, setSelectedEarthquake] = useState<Earthquake | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [minMagnitude, setMinMagnitude] = useState(0);
  const [activeView, setActiveView] = useState<'list' | 'map'>('map');
  const [darkMode, setDarkMode] = useState(false);

  // Filter earthquakes based on search and filters
  const filteredEarthquakes = useMemo(() => {
    return earthquakes.filter(earthquake => {
      const matchesSearch = earthquake.properties.place
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase()) ?? false;
      
      const matchesMagnitude = earthquake.properties.mag >= minMagnitude;
      
      return matchesSearch && matchesMagnitude;
    });
  }, [earthquakes, searchTerm, minMagnitude]);

  const handleEarthquakeClick = (earthquake: Earthquake) => {
    setSelectedEarthquake(earthquake);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedEarthquake(null);
  };

  const handleRefresh = () => {
    refetch();
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      darkMode 
        ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-indigo-900' 
        : 'bg-gradient-to-br from-blue-50 via-white to-indigo-50'
    }`}>
      {/* Enhanced Header */}
      <header className={`shadow-lg border-b transition-colors duration-300 ${
        darkMode 
          ? 'bg-gray-800 border-gray-700' 
          : 'bg-white border-gray-200'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="flex items-center gap-4"
            >
              <motion.div 
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
                className={`p-3 rounded-xl shadow-lg ${
                  darkMode 
                    ? 'bg-blue-600 shadow-blue-500/25' 
                    : 'bg-blue-100 shadow-blue-200/50'
                }`}
              >
                <Activity className={`w-8 h-8 ${
                  darkMode ? 'text-white' : 'text-blue-600'
                }`} />
              </motion.div>
              <div>
                <h1 className={`text-3xl font-bold ${
                  darkMode ? 'text-white' : 'text-gray-900'
                }`}>
                  Earthquake Monitor
                </h1>
                <p className={`${
                  darkMode ? 'text-gray-300' : 'text-gray-600'
                }`}>
                  Real-time seismic activity visualization
                </p>
              </div>
            </motion.div>
            
            <div className="flex items-center gap-4">
              {/* Dark Mode Toggle */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={toggleDarkMode}
                className={`p-2 rounded-lg transition-colors ${
                  darkMode 
                    ? 'bg-gray-700 text-yellow-400 hover:bg-gray-600' 
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </motion.button>

              {/* Last Updated */}
              {lastUpdated && (
                <motion.div 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className={`text-right text-sm ${
                    darkMode ? 'text-gray-300' : 'text-gray-500'
                  }`}
                >
                  <div className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    Last updated
                  </div>
                  <div className="font-medium">
                    {formatDateTime(lastUpdated.getTime())}
                  </div>
                </motion.div>
              )}
              
              {/* Refresh Button */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleRefresh}
                disabled={loading}
                className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
                Refresh
              </motion.button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search and Filters */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <SearchAndFilter
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            minMagnitude={minMagnitude}
            onMinMagnitudeChange={setMinMagnitude}
            darkMode={darkMode}
          />
        </motion.div>

        {/* Enhanced View Toggle */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-6"
        >
          <div className={`flex items-center gap-2 rounded-xl p-1 shadow-lg w-fit ${
            darkMode 
              ? 'bg-gray-800 border border-gray-700' 
              : 'bg-white border border-gray-200'
          }`}>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setActiveView('map')}
              className={`flex items-center gap-2 px-6 py-3 rounded-lg transition-all duration-300 ${
                activeView === 'map'
                  ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg'
                  : darkMode
                    ? 'text-gray-300 hover:text-white hover:bg-gray-700'
                    : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50'
              }`}
            >
              <Map className="w-4 h-4" />
              Interactive Map
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setActiveView('list')}
              className={`flex items-center gap-2 px-6 py-3 rounded-lg transition-all duration-300 ${
                activeView === 'list'
                  ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg'
                  : darkMode
                    ? 'text-gray-300 hover:text-white hover:bg-gray-700'
                    : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50'
              }`}
            >
              <Activity className="w-4 h-4" />
              List View
            </motion.button>
          </div>
        </motion.div>

        {/* Enhanced Stats */}
        {!loading && !error && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
          >
            <motion.div 
              whileHover={{ scale: 1.02, y: -2 }}
              className={`rounded-xl shadow-lg p-6 border transition-all duration-300 ${
                darkMode 
                  ? 'bg-gray-800 border-gray-700' 
                  : 'bg-white border-gray-100'
              }`}
            >
              <div className="flex items-center gap-4">
                <div className="p-3 bg-blue-100 rounded-xl">
                  <Globe className="w-8 h-8 text-blue-600" />
                </div>
                <div>
                  <div className={`text-3xl font-bold ${
                    darkMode ? 'text-white' : 'text-gray-900'
                  }`}>
                    {earthquakes.length}
                  </div>
                  <div className={`${
                    darkMode ? 'text-gray-300' : 'text-gray-600'
                  }`}>
                    Total Earthquakes (24h)
                  </div>
                </div>
              </div>
            </motion.div>
            
            <motion.div 
              whileHover={{ scale: 1.02, y: -2 }}
              className={`rounded-xl shadow-lg p-6 border transition-all duration-300 ${
                darkMode 
                  ? 'bg-gray-800 border-gray-700' 
                  : 'bg-white border-gray-100'
              }`}
            >
              <div className="flex items-center gap-4">
                <div className="p-3 bg-green-100 rounded-xl">
                  <Activity className="w-8 h-8 text-green-600" />
                </div>
                <div>
                  <div className={`text-3xl font-bold ${
                    darkMode ? 'text-white' : 'text-gray-900'
                  }`}>
                    {filteredEarthquakes.length}
                  </div>
                  <div className={`${
                    darkMode ? 'text-gray-300' : 'text-gray-600'
                  }`}>
                    Filtered Results
                  </div>
                </div>
              </div>
            </motion.div>
            
            <motion.div 
              whileHover={{ scale: 1.02, y: -2 }}
              className={`rounded-xl shadow-lg p-6 border transition-all duration-300 ${
                darkMode 
                  ? 'bg-gray-800 border-gray-700' 
                  : 'bg-white border-gray-100'
              }`}
            >
              <div className="flex items-center gap-4">
                <div className="p-3 bg-red-100 rounded-xl">
                  <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-sm">M</span>
                  </div>
                </div>
                <div>
                  <div className={`text-3xl font-bold ${
                    darkMode ? 'text-white' : 'text-gray-900'
                  }`}>
                    {earthquakes.length > 0 
                      ? Math.max(...earthquakes.map(eq => eq.properties.mag || 0)).toFixed(1)
                      : '0.0'
                    }
                  </div>
                  <div className={`${
                    darkMode ? 'text-gray-300' : 'text-gray-600'
                  }`}>
                    Highest Magnitude
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}

        {/* Content */}
        <AnimatePresence mode="wait">
          {loading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <LoadingSpinner size="lg" text="Fetching latest earthquake data..." />
            </motion.div>
          )}
          
          {error && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
            >
              <ErrorMessage message={error} onRetry={handleRefresh} />
            </motion.div>
          )}
          
          {!loading && !error && filteredEarthquakes.length === 0 && earthquakes.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="text-center py-12"
            >
              <Globe className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className={`text-lg font-semibold mb-2 ${
                darkMode ? 'text-gray-300' : 'text-gray-600'
              }`}>
                No earthquakes match your filters
              </h3>
              <p className={`${
                darkMode ? 'text-gray-400' : 'text-gray-500'
              }`}>
                Try adjusting your search terms or minimum magnitude
              </p>
            </motion.div>
          )}
          
          {!loading && !error && earthquakes.length === 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="text-center py-12"
            >
              <Activity className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className={`text-lg font-semibold mb-2 ${
                darkMode ? 'text-gray-300' : 'text-gray-600'
              }`}>
                No recent earthquakes
              </h3>
              <p className={`${
                darkMode ? 'text-gray-400' : 'text-gray-500'
              }`}>
                No earthquakes recorded in the past 24 hours
              </p>
            </motion.div>
          )}

          {/* Enhanced Map View */}
          {!loading && !error && activeView === 'map' && filteredEarthquakes.length > 0 && (
            <motion.div
              key="map-view"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4 }}
            >
              <EarthquakeMap 
                earthquakes={filteredEarthquakes}
                onEarthquakeClick={handleEarthquakeClick}
                darkMode={darkMode}
              />
            </motion.div>
          )}

          {/* Enhanced List View */}
          {!loading && !error && activeView === 'list' && filteredEarthquakes.length > 0 && (
            <motion.div
              key="list-view"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {filteredEarthquakes.map((earthquake, index) => (
                <motion.div
                  key={earthquake.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05, duration: 0.4 }}
                >
                  <EarthquakeCard
                    earthquake={earthquake}
                    onClick={() => handleEarthquakeClick(earthquake)}
                    darkMode={darkMode}
                  />
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Enhanced Footer */}
      <footer className={`mt-16 border-t transition-colors duration-300 ${
        darkMode 
          ? 'bg-gray-800 border-gray-700' 
          : 'bg-white border-gray-200'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Copyright */}
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="flex items-center gap-2"
            >
              <span className={`text-sm ${
                darkMode ? 'text-gray-400' : 'text-gray-600'
              }`}>
                © 2025 Earthquake Monitor. Made with
              </span>
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Heart className="w-4 h-4 text-red-500 fill-current" />
              </motion.div>
              <span className={`text-sm ${
                darkMode ? 'text-gray-400' : 'text-gray-600'
              }`}>
                by
              </span>
              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href="https://github.com/Muhammadkafaby"
                target="_blank"
                rel="noopener noreferrer"
                className={`flex items-center gap-2 text-sm font-medium transition-colors ${
                  darkMode 
                    ? 'text-blue-400 hover:text-blue-300' 
                    : 'text-blue-600 hover:text-blue-800'
                }`}
              >
                <Github className="w-4 h-4" />
                Muhammad Kafaby
              </motion.a>
            </motion.div>

            {/* Data Source */}
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex items-center gap-2"
            >
              <span className={`text-sm ${
                darkMode ? 'text-gray-400' : 'text-gray-600'
              }`}>
                Data provided by
              </span>
              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href="https://earthquake.usgs.gov/"
                target="_blank"
                rel="noopener noreferrer"
                className={`flex items-center gap-2 text-sm font-medium transition-colors ${
                  darkMode 
                    ? 'text-green-400 hover:text-green-300' 
                    : 'text-green-600 hover:text-green-800'
                }`}
              >
                <Activity className="w-4 h-4" />
                USGS Earthquake Hazards Program
              </motion.a>
            </motion.div>
          </div>

          {/* Additional Info */}
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className={`mt-4 pt-4 border-t text-center ${
              darkMode ? 'border-gray-700' : 'border-gray-200'
            }`}
          >
            <p className={`text-xs ${
              darkMode ? 'text-gray-500' : 'text-gray-500'
            }`}>
              Real-time earthquake monitoring application built with React, TypeScript, and Leaflet. 
              Data updates every minute from USGS GeoJSON feeds.
            </p>
          </motion.div>
        </div>
      </footer>

      {/* Enhanced Modal */}
      <EarthquakeModal
        earthquake={selectedEarthquake}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        darkMode={darkMode}
      />
    </div>
  );
}

export default App;