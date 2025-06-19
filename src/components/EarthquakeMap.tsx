import React, { useEffect, useRef, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import { DivIcon } from 'leaflet';
import { motion, AnimatePresence } from 'framer-motion';
import { Earthquake } from '../types/earthquake';
import { formatDateTime } from '../utils/dateUtils';
import { getMagnitudeColor, getMagnitudeLevel, formatCoordinates, formatDepth } from '../utils/earthquakeUtils';
import { Activity, MapPin, Clock, Layers, AlertTriangle, Zap } from 'lucide-react';
import 'leaflet/dist/leaflet.css';

interface EarthquakeMapProps {
  earthquakes: Earthquake[];
  onEarthquakeClick?: (earthquake: Earthquake) => void;
  darkMode?: boolean;
}

// Advanced custom marker with sophisticated animations
const createAdvancedMagnitudeMarker = (magnitude: number, isRecent: boolean = false): DivIcon => {
  const baseSize = Math.max(24, Math.min(60, magnitude * 8));
  const pulseSize = baseSize + 8;
  
  // Color mapping for different magnitude levels
  const getMarkerColors = (mag: number) => {
    if (mag >= 7) return { bg: '#dc2626', border: '#991b1b', glow: '#fca5a5' }; // Red
    if (mag >= 5.5) return { bg: '#ea580c', border: '#c2410c', glow: '#fed7aa' }; // Orange
    if (mag >= 4) return { bg: '#ca8a04', border: '#a16207', glow: '#fde047' }; // Yellow
    if (mag >= 2.5) return { bg: '#2563eb', border: '#1d4ed8', glow: '#93c5fd' }; // Blue
    return { bg: '#16a34a', border: '#15803d', glow: '#86efac' }; // Green
  };

  const colors = getMarkerColors(magnitude);
  const recentClass = isRecent ? 'animate-bounce' : '';
  
  return new DivIcon({
    html: `
      <div class="earthquake-marker-container ${recentClass}" style="width: ${pulseSize}px; height: ${pulseSize}px;">
        <!-- Outer pulse ring -->
        <div class="absolute inset-0 rounded-full animate-ping" 
             style="background: ${colors.glow}; opacity: 0.4;"></div>
        
        <!-- Middle pulse ring -->
        <div class="absolute inset-1 rounded-full animate-pulse" 
             style="background: ${colors.glow}; opacity: 0.6;"></div>
        
        <!-- Main marker -->
        <div class="earthquake-marker-main absolute inset-2 rounded-full flex items-center justify-center font-bold text-white shadow-lg transform transition-all duration-300 hover:scale-110 hover:shadow-xl"
             style="background: linear-gradient(135deg, ${colors.bg}, ${colors.border}); 
                    border: 2px solid ${colors.border};
                    box-shadow: 0 4px 12px rgba(0,0,0,0.3), 0 0 20px ${colors.glow}40;">
          <span style="font-size: ${Math.max(10, baseSize * 0.25)}px; text-shadow: 0 1px 2px rgba(0,0,0,0.5);">
            ${magnitude.toFixed(1)}
          </span>
        </div>
        
        <!-- Intensity indicator -->
        <div class="absolute -top-1 -right-1 w-3 h-3 rounded-full ${magnitude >= 5 ? 'bg-red-500 animate-pulse' : 'bg-gray-400'}"
             style="box-shadow: 0 0 6px rgba(0,0,0,0.3);"></div>
      </div>
    `,
    className: 'custom-earthquake-marker-advanced',
    iconSize: [pulseSize, pulseSize],
    iconAnchor: [pulseSize / 2, pulseSize / 2],
    popupAnchor: [0, -pulseSize / 2]
  });
};

// Enhanced map bounds with smooth animation
const AnimatedMapBounds: React.FC<{ earthquakes: Earthquake[] }> = ({ earthquakes }) => {
  const map = useMap();
  
  useEffect(() => {
    if (earthquakes.length > 0) {
      const bounds = earthquakes.map(eq => [
        eq.geometry.coordinates[1], // latitude
        eq.geometry.coordinates[0]  // longitude
      ] as [number, number]);
      
      // Smooth animated fit bounds
      map.fitBounds(bounds, { 
        padding: [30, 30],
        animate: true,
        duration: 1.5
      });
    }
  }, [earthquakes, map]);
  
  return null;
};

// Enhanced popup component with animations
const AnimatedPopup: React.FC<{
  earthquake: Earthquake;
  onViewDetails: () => void;
}> = ({ earthquake, onViewDetails }) => {
  const { properties, geometry } = earthquake;
  const [longitude, latitude, depth] = geometry.coordinates;
  const isHighMagnitude = properties.mag >= 5;
  const isRecent = Date.now() - properties.time < 3600000; // Less than 1 hour

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, y: 10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.8, y: -10 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="p-0 m-0"
    >
      <div className="bg-white rounded-lg shadow-xl border-0 overflow-hidden min-w-[280px]">
        {/* Header with gradient */}
        <div className={`p-3 bg-gradient-to-r ${
          isHighMagnitude 
            ? 'from-red-500 to-red-600' 
            : properties.mag >= 3 
              ? 'from-orange-500 to-orange-600'
              : 'from-blue-500 to-blue-600'
        } text-white`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="bg-white bg-opacity-20 rounded-full px-2 py-1 text-sm font-bold">
                M {properties.mag?.toFixed(1) || 'N/A'}
              </div>
              {isRecent && (
                <div className="bg-yellow-400 text-yellow-900 px-2 py-1 rounded-full text-xs font-medium animate-pulse">
                  NEW
                </div>
              )}
            </div>
            <div className="text-xs opacity-90">
              {getMagnitudeLevel(properties.mag)}
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-4">
          {/* Location with icon */}
          <div className="flex items-start gap-2 mb-3">
            <MapPin className="w-4 h-4 text-gray-500 mt-0.5 flex-shrink-0" />
            <h3 className="font-semibold text-gray-800 leading-tight text-sm">
              {properties.place || 'Unknown Location'}
            </h3>
          </div>
          
          {/* Details grid */}
          <div className="grid grid-cols-1 gap-2 text-xs">
            <div className="flex items-center gap-2 p-2 bg-gray-50 rounded">
              <Clock className="w-3 h-3 text-blue-500" />
              <div>
                <div className="text-gray-600">Time</div>
                <div className="font-medium text-gray-800">{formatDateTime(properties.time)}</div>
              </div>
            </div>
            
            <div className="flex items-center gap-2 p-2 bg-gray-50 rounded">
              <Activity className="w-3 h-3 text-green-500" />
              <div>
                <div className="text-gray-600">Coordinates</div>
                <div className="font-medium text-gray-800">{formatCoordinates(longitude, latitude)}</div>
              </div>
            </div>
            
            <div className="flex items-center gap-2 p-2 bg-gray-50 rounded">
              <Layers className="w-3 h-3 text-purple-500" />
              <div>
                <div className="text-gray-600">Depth</div>
                <div className="font-medium text-gray-800">{formatDepth(depth)}</div>
              </div>
            </div>
          </div>
          
          {/* Warnings */}
          {(properties.tsunami === 1 || isHighMagnitude) && (
            <div className="mt-3 p-2 bg-red-50 border border-red-200 rounded-lg">
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-red-600" />
                <div className="text-xs">
                  {properties.tsunami === 1 && (
                    <div className="text-red-700 font-medium">⚠️ Tsunami Warning</div>
                  )}
                  {isHighMagnitude && (
                    <div className="text-red-700 font-medium">🚨 High Magnitude Event</div>
                  )}
                </div>
              </div>
            </div>
          )}
          
          {/* Action button */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onViewDetails}
            className="mt-3 w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white px-3 py-2 rounded-lg text-sm font-medium hover:from-blue-700 hover:to-blue-800 transition-all duration-200 shadow-md hover:shadow-lg flex items-center justify-center gap-2"
          >
            <Zap className="w-4 h-4" />
            View Full Details
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export const EarthquakeMap: React.FC<EarthquakeMapProps> = ({ 
  earthquakes, 
  onEarthquakeClick,
  darkMode = false
}) => {
  const mapRef = useRef<any>(null);
  const [selectedEarthquake, setSelectedEarthquake] = useState<string | null>(null);
  const [mapLoaded, setMapLoaded] = useState(false);

  // Determine recent earthquakes (within last hour)
  const getRecentEarthquakes = () => {
    const oneHourAgo = Date.now() - 3600000;
    return earthquakes.filter(eq => eq.properties.time > oneHourAgo);
  };

  const recentEarthquakes = getRecentEarthquakes();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden"
    >
      {/* Enhanced Header */}
      <div className="p-6 bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700 text-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="w-10 h-10 bg-white bg-opacity-20 rounded-full flex items-center justify-center"
            >
              <Activity className="w-5 h-5" />
            </motion.div>
            <div>
              <h2 className="text-xl font-bold">Interactive Earthquake Map</h2>
              <p className="text-blue-100 text-sm">
                Real-time seismic activity visualization
              </p>
            </div>
          </div>
          
          <div className="text-right">
            <div className="text-2xl font-bold">{earthquakes.length}</div>
            <div className="text-blue-100 text-sm">Total Events</div>
            {recentEarthquakes.length > 0 && (
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="bg-yellow-400 text-yellow-900 px-2 py-1 rounded-full text-xs font-medium mt-1"
              >
                {recentEarthquakes.length} Recent
              </motion.div>
            )}
          </div>
        </div>
      </div>
      
      {/* Map Container */}
      <div className="relative">
        <div className="h-[500px] md:h-[600px] relative overflow-hidden">
          <MapContainer
            ref={mapRef}
            center={[20, 0]}
            zoom={2}
            style={{ height: '100%', width: '100%' }}
            className="z-0"
            whenReady={() => setMapLoaded(true)}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url={darkMode 
                ? "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
                : "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              }
            />
            
            <AnimatedMapBounds earthquakes={earthquakes} />
            
            <AnimatePresence>
              {earthquakes.map((earthquake, index) => {
                const [longitude, latitude, depth] = earthquake.geometry.coordinates;
                const { properties } = earthquake;
                const isRecent = Date.now() - properties.time < 3600000;
                
                return (
                  <motion.div
                    key={earthquake.id}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0 }}
                    transition={{ 
                      duration: 0.5, 
                      delay: Math.min(index * 0.05, 2),
                      ease: "easeOut"
                    }}
                  >
                    <Marker
                      position={[latitude, longitude]}
                      icon={createAdvancedMagnitudeMarker(properties.mag, isRecent)}
                      eventHandlers={{
                        click: () => {
                          setSelectedEarthquake(earthquake.id);
                          onEarthquakeClick?.(earthquake);
                        },
                        mouseover: (e) => {
                          e.target.openPopup();
                        }
                      }}
                    >
                      <Popup 
                        className="earthquake-popup-advanced" 
                        maxWidth={320}
                        closeButton={false}
                        autoPan={true}
                      >
                        <AnimatedPopup
                          earthquake={earthquake}
                          onViewDetails={() => onEarthquakeClick?.(earthquake)}
                        />
                      </Popup>
                    </Marker>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </MapContainer>
        </div>

        {/* Loading overlay */}
        <AnimatePresence>
          {!mapLoaded && (
            <motion.div
              initial={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-white bg-opacity-90 flex items-center justify-center z-10"
            >
              <div className="text-center">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="w-8 h-8 border-3 border-blue-600 border-t-transparent rounded-full mx-auto mb-2"
                />
                <p className="text-gray-600 text-sm">Loading interactive map...</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Enhanced Footer Stats */}
      <div className="p-4 bg-gray-50 border-t border-gray-200">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div className="p-2">
            <div className="text-lg font-bold text-red-600">
              {earthquakes.filter(eq => eq.properties.mag >= 5).length}
            </div>
            <div className="text-xs text-gray-600">Major (5.0+)</div>
          </div>
          <div className="p-2">
            <div className="text-lg font-bold text-orange-600">
              {earthquakes.filter(eq => eq.properties.mag >= 3 && eq.properties.mag < 5).length}
            </div>
            <div className="text-xs text-gray-600">Moderate (3.0-4.9)</div>
          </div>
          <div className="p-2">
            <div className="text-lg font-bold text-blue-600">
              {earthquakes.filter(eq => eq.properties.mag < 3).length}
            </div>
            <div className="text-xs text-gray-600">Minor {"<3.0"}</div>
          </div>
          <div className="p-2">
            <div className="text-lg font-bold text-green-600">
              {Math.max(...earthquakes.map(eq => eq.properties.mag || 0)).toFixed(1)}
            </div>
            <div className="text-xs text-gray-600">Highest Mag</div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};