import React from 'react';
import { X, MapPin, Clock, Activity, Layers, Globe, AlertTriangle, Gauge, TrendingUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Earthquake } from '../types/earthquake';
import { formatDateTime } from '../utils/dateUtils';
import { getMagnitudeColor, getMagnitudeLevel, formatCoordinates, formatDepth } from '../utils/earthquakeUtils';

interface EarthquakeModalProps {
  earthquake: Earthquake | null;
  isOpen: boolean;
  onClose: () => void;
  darkMode?: boolean;
}

export const EarthquakeModal: React.FC<EarthquakeModalProps> = ({ 
  earthquake, 
  isOpen, 
  onClose,
  darkMode = false 
}) => {
  if (!earthquake) return null;

  const { properties, geometry } = earthquake;
  const [longitude, latitude, depth] = geometry.coordinates;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          {/* Enhanced Backdrop */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm"
            onClick={onClose}
          />
          
          {/* Modal */}
          <div className="flex items-center justify-center min-h-screen p-4">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className={`relative rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto transform ${
                darkMode 
                  ? 'bg-gray-800 border border-gray-700' 
                  : 'bg-white border border-gray-200'
              }`}
            >
              {/* Enhanced Header */}
              <div className={`sticky top-0 border-b rounded-t-2xl ${
                darkMode 
                  ? 'bg-gray-800 border-gray-700' 
                  : 'bg-white border-gray-200'
              }`}>
                <div className="px-6 py-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <motion.div 
                        whileHover={{ scale: 1.05 }}
                        className={`px-3 py-1 rounded-full text-lg font-bold ${getMagnitudeColor(properties.mag)}`}
                      >
                        M {properties.mag?.toFixed(1) || 'N/A'}
                      </motion.div>
                      <div>
                        <span className={`text-sm px-2 py-1 rounded ${
                          darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-500'
                        }`}>
                          {getMagnitudeLevel(properties.mag)}
                        </span>
                      </div>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.1, rotate: 90 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={onClose}
                      className={`p-2 rounded-full transition-colors ${
                        darkMode 
                          ? 'hover:bg-gray-700 text-gray-400 hover:text-white' 
                          : 'hover:bg-gray-100 text-gray-500 hover:text-gray-700'
                      }`}
                    >
                      <X className="w-5 h-5" />
                    </motion.button>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                {/* Location */}
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="mb-6"
                >
                  <div className="flex items-start gap-3 mb-2">
                    <MapPin className={`w-5 h-5 mt-1 flex-shrink-0 ${
                      darkMode ? 'text-gray-400' : 'text-gray-400'
                    }`} />
                    <h2 className={`text-xl font-bold leading-tight ${
                      darkMode ? 'text-white' : 'text-gray-800'
                    }`}>
                      {properties.place || 'Unknown Location'}
                    </h2>
                  </div>
                </motion.div>

                {/* Key Information Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  {/* Time */}
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                    className={`rounded-lg p-4 ${
                      darkMode ? 'bg-gray-700' : 'bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <Clock className="w-5 h-5 text-blue-500" />
                      <h3 className={`font-semibold ${
                        darkMode ? 'text-white' : 'text-gray-800'
                      }`}>
                        Time
                      </h3>
                    </div>
                    <p className={`${
                      darkMode ? 'text-gray-300' : 'text-gray-600'
                    }`}>
                      {formatDateTime(properties.time)}
                    </p>
                    {properties.updated && (
                      <p className={`text-sm mt-1 ${
                        darkMode ? 'text-gray-400' : 'text-gray-500'
                      }`}>
                        Updated: {formatDateTime(properties.updated)}
                      </p>
                    )}
                  </motion.div>

                  {/* Location Details */}
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                    className={`rounded-lg p-4 ${
                      darkMode ? 'bg-gray-700' : 'bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <Globe className="w-5 h-5 text-green-500" />
                      <h3 className={`font-semibold ${
                        darkMode ? 'text-white' : 'text-gray-800'
                      }`}>
                        Coordinates
                      </h3>
                    </div>
                    <p className={`${
                      darkMode ? 'text-gray-300' : 'text-gray-600'
                    }`}>
                      {formatCoordinates(longitude, latitude)}
                    </p>
                    <p className={`text-sm mt-1 ${
                      darkMode ? 'text-gray-400' : 'text-gray-500'
                    }`}>
                      Lat: {latitude.toFixed(4)}°, Lon: {longitude.toFixed(4)}°
                    </p>
                  </motion.div>

                  {/* Depth */}
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 }}
                    className={`rounded-lg p-4 ${
                      darkMode ? 'bg-gray-700' : 'bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <Layers className="w-5 h-5 text-purple-500" />
                      <h3 className={`font-semibold ${
                        darkMode ? 'text-white' : 'text-gray-800'
                      }`}>
                        Depth
                      </h3>
                    </div>
                    <p className={`${
                      darkMode ? 'text-gray-300' : 'text-gray-600'
                    }`}>
                      {formatDepth(depth)}
                    </p>
                  </motion.div>

                  {/* Magnitude Type */}
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 }}
                    className={`rounded-lg p-4 ${
                      darkMode ? 'bg-gray-700' : 'bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <Gauge className="w-5 h-5 text-orange-500" />
                      <h3 className={`font-semibold ${
                        darkMode ? 'text-white' : 'text-gray-800'
                      }`}>
                        Magnitude Type
                      </h3>
                    </div>
                    <p className={`${
                      darkMode ? 'text-gray-300' : 'text-gray-600'
                    }`}>
                      {properties.magType || 'Unknown'}
                    </p>
                  </motion.div>
                </div>

                {/* Additional Information */}
                {(properties.felt || properties.sig || properties.tsunami) && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4"
                  >
                    <div className="flex items-center gap-2 mb-3">
                      <AlertTriangle className="w-5 h-5 text-yellow-600" />
                      <h3 className="font-semibold text-yellow-800">Additional Information</h3>
                    </div>
                    <div className="space-y-2 text-sm">
                      {properties.felt && (
                        <p className="text-yellow-700">
                          <span className="font-medium">Felt reports:</span> {properties.felt}
                        </p>
                      )}
                      {properties.sig && (
                        <p className="text-yellow-700">
                          <span className="font-medium">Significance:</span> {properties.sig}
                        </p>
                      )}
                      {properties.tsunami === 1 && (
                        <motion.p
                          animate={{ scale: [1, 1.02, 1] }}
                          transition={{ duration: 2, repeat: Infinity }}
                          className="text-red-700 font-medium"
                        >
                          ⚠️ Tsunami warning issued
                        </motion.p>
                      )}
                    </div>
                  </motion.div>
                )}

                {/* Technical Details */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 }}
                  className={`rounded-lg p-4 ${
                    darkMode ? 'bg-gray-700' : 'bg-gray-50'
                  }`}
                >
                  <div className="flex items-center gap-2 mb-3">
                    <TrendingUp className={`w-5 h-5 ${
                      darkMode ? 'text-gray-400' : 'text-gray-600'
                    }`} />
                    <h3 className={`font-semibold ${
                      darkMode ? 'text-white' : 'text-gray-800'
                    }`}>
                      Technical Details
                    </h3>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className={`${
                        darkMode ? 'text-gray-400' : 'text-gray-500'
                      }`}>
                        Event ID:
                      </span>
                      <p className={`font-mono ${
                        darkMode ? 'text-gray-300' : 'text-gray-700'
                      }`}>
                        {earthquake.id}
                      </p>
                    </div>
                    <div>
                      <span className={`${
                        darkMode ? 'text-gray-400' : 'text-gray-500'
                      }`}>
                        Network:
                      </span>
                      <p className={`${
                        darkMode ? 'text-gray-300' : 'text-gray-700'
                      }`}>
                        {properties.net}
                      </p>
                    </div>
                    <div>
                      <span className={`${
                        darkMode ? 'text-gray-400' : 'text-gray-500'
                      }`}>
                        Status:
                      </span>
                      <p className={`capitalize ${
                        darkMode ? 'text-gray-300' : 'text-gray-700'
                      }`}>
                        {properties.status}
                      </p>
                    </div>
                    <div>
                      <span className={`${
                        darkMode ? 'text-gray-400' : 'text-gray-500'
                      }`}>
                        Type:
                      </span>
                      <p className={`capitalize ${
                        darkMode ? 'text-gray-300' : 'text-gray-700'
                      }`}>
                        {properties.type}
                      </p>
                    </div>
                  </div>
                </motion.div>

                {/* USGS Link */}
                {properties.url && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 }}
                    className={`mt-6 pt-4 border-t ${
                      darkMode ? 'border-gray-700' : 'border-gray-200'
                    }`}
                  >
                    <motion.a
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      href={properties.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 transition-colors font-medium"
                    >
                      <Activity className="w-4 h-4" />
                      View detailed report on USGS
                    </motion.a>
                  </motion.div>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
};