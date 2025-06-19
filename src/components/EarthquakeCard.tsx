import React from 'react';
import { MapPin, Clock, Activity, Layers } from 'lucide-react';
import { motion } from 'framer-motion';
import { Earthquake } from '../types/earthquake';
import { formatDate, formatTime, getTimeAgo } from '../utils/dateUtils';
import { getMagnitudeColor, getMagnitudeLevel, formatCoordinates, formatDepth } from '../utils/earthquakeUtils';

interface EarthquakeCardProps {
  earthquake: Earthquake;
  onClick: () => void;
  darkMode?: boolean;
}

export const EarthquakeCard: React.FC<EarthquakeCardProps> = ({ 
  earthquake, 
  onClick, 
  darkMode = false 
}) => {
  const { properties, geometry } = earthquake;
  const [longitude, latitude, depth] = geometry.coordinates;
  const isRecent = Date.now() - properties.time < 3600000; // Less than 1 hour

  return (
    <motion.div
      whileHover={{ 
        scale: 1.02, 
        y: -4,
        boxShadow: darkMode 
          ? "0 20px 40px rgba(0, 0, 0, 0.4)" 
          : "0 20px 40px rgba(0, 0, 0, 0.15)"
      }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={`rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer border transform ${
        darkMode 
          ? 'bg-gray-800 border-gray-700 hover:border-gray-600' 
          : 'bg-white border-gray-100 hover:border-gray-200'
      }`}
    >
      <div className="p-6">
        {/* Header with magnitude and time */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <motion.div 
              whileHover={{ scale: 1.1 }}
              className={`px-3 py-1 rounded-full text-sm font-bold ${getMagnitudeColor(properties.mag)}`}
            >
              M {properties.mag?.toFixed(1) || 'N/A'}
            </motion.div>
            <span className={`text-sm px-2 py-1 rounded ${
              darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-500'
            }`}>
              {getMagnitudeLevel(properties.mag)}
            </span>
            {isRecent && (
              <motion.span
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="bg-yellow-400 text-yellow-900 px-2 py-1 rounded-full text-xs font-medium"
              >
                NEW
              </motion.span>
            )}
          </div>
          <span className={`text-xs ${
            darkMode ? 'text-gray-400' : 'text-gray-400'
          }`}>
            {getTimeAgo(properties.time)}
          </span>
        </div>

        {/* Location */}
        <div className="flex items-start gap-2 mb-4">
          <MapPin className={`w-4 h-4 mt-0.5 flex-shrink-0 ${
            darkMode ? 'text-gray-400' : 'text-gray-400'
          }`} />
          <h3 className={`font-semibold leading-tight ${
            darkMode ? 'text-white' : 'text-gray-800'
          }`}>
            {properties.place || 'Unknown Location'}
          </h3>
        </div>

        {/* Details Grid */}
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="flex items-center gap-2">
            <Clock className={`w-4 h-4 ${
              darkMode ? 'text-gray-400' : 'text-gray-400'
            }`} />
            <div>
              <div className={`${
                darkMode ? 'text-gray-300' : 'text-gray-600'
              }`}>
                {formatDate(properties.time)}
              </div>
              <div className={`${
                darkMode ? 'text-gray-400' : 'text-gray-500'
              }`}>
                {formatTime(properties.time)}
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Layers className={`w-4 h-4 ${
              darkMode ? 'text-gray-400' : 'text-gray-400'
            }`} />
            <div>
              <div className={`${
                darkMode ? 'text-gray-300' : 'text-gray-600'
              }`}>
                Depth
              </div>
              <div className={`font-medium ${
                darkMode ? 'text-white' : 'text-gray-800'
              }`}>
                {formatDepth(depth)}
              </div>
            </div>
          </div>
        </div>

        {/* Coordinates */}
        <div className={`mt-4 pt-4 border-t ${
          darkMode ? 'border-gray-700' : 'border-gray-100'
        }`}>
          <div className={`flex items-center gap-2 text-xs ${
            darkMode ? 'text-gray-400' : 'text-gray-500'
          }`}>
            <Activity className="w-3 h-3" />
            {formatCoordinates(longitude, latitude)}
          </div>
        </div>

        {/* Tsunami warning */}
        {properties.tsunami === 1 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mt-3 p-2 bg-red-100 border border-red-200 rounded-lg"
          >
            <div className="flex items-center gap-2 text-xs text-red-700">
              <span>⚠️</span>
              <span className="font-medium">Tsunami Warning</span>
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};