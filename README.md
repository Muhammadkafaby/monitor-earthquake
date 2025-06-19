# 🌍 Earthquake Monitor

A modern, real-time earthquake monitoring application built with React and TypeScript. This application fetches and displays earthquake data from the USGS (United States Geological Survey) API, providing users with up-to-date information about seismic activity worldwide through both list and interactive map views with advanced animations and modern UI.

![Earthquake Monitor](https://images.pexels.com/photos/87009/earth-soil-creep-moon-lunar-surface-87009.jpeg?auto=compress&cs=tinysrgb&w=800)

## ✨ Features

### Core Features
- **Real-time Data**: Fetches earthquake data from USGS API (updated every minute)
- **Interactive Map**: Advanced world map with animated earthquake markers using React Leaflet
- **List & Map Views**: Toggle between card-based list view and interactive map view
- **Detailed Modal**: Click any earthquake to view comprehensive details with animations
- **Responsive Design**: Works seamlessly on mobile, tablet, and desktop
- **Search & Filter**: Search by location and filter by minimum magnitude with animated UI
- **Refresh Button**: Manual refresh with loading states and smooth animations
- **Error Handling**: Graceful error handling with retry functionality
- **Dark Mode**: Toggle between light and dark themes with smooth transitions

### Advanced Map Features
- **Animated Markers**: Magnitude-based colored markers with pulse animations and hover effects
- **Smart Popups**: Detailed earthquake info in animated popups with gradient headers
- **Auto-fit Bounds**: Map automatically adjusts to show all earthquakes with smooth animation
- **Recent Earthquake Indicators**: Special animations for earthquakes within the last hour
- **Responsive Design**: Map adapts to different screen sizes with optimized controls
- **Modern Styling**: Professional map interface with custom CSS and advanced animations
- **Performance Optimized**: Smooth marker loading with staggered animations

### Design Features
- **Modern UI**: Clean, minimalist design with Framer Motion animations
- **Color-coded Magnitudes**: Visual indicators for earthquake severity with gradient effects
- **Hover Effects**: Interactive cards and markers with sophisticated animations
- **Loading States**: Elegant loading spinners with animated transitions
- **Professional Layout**: Card-based layout with proper spacing and modern typography
- **Micro-interactions**: Subtle animations throughout the interface for enhanced UX
- **Gradient Backgrounds**: Beautiful gradient backgrounds that adapt to dark/light mode

## 🚀 Getting Started

### Prerequisites
- Node.js (version 16 or higher)
- npm or yarn

### Installation

1. **Clone or download the project**
   ```bash
   # If you have git
   git clone <repository-url>
   cd earthquake-monitor

   # Or extract the downloaded files and navigate to the folder
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173` (or the URL shown in your terminal)

### Build for Production

```bash
# Build the application
npm run build

# Preview the production build locally
npm run preview
```

## 🛠️ Technical Details

### Technologies Used
- **React 18** with TypeScript
- **Vite** for fast development and building
- **Tailwind CSS** for styling and responsive design
- **Framer Motion** for advanced animations and micro-interactions
- **React Leaflet** for interactive maps
- **Leaflet** for map functionality
- **Lucide React** for beautiful icons
- **USGS API** for real-time earthquake data

### Dependencies Added
- **leaflet**: Core mapping library
- **react-leaflet**: React components for Leaflet maps
- **@types/leaflet**: TypeScript definitions for Leaflet
- **framer-motion**: Advanced animation library for React

### Project Structure
```
src/
├── components/          # Reusable UI components
│   ├── EarthquakeCard.tsx      # Enhanced with animations
│   ├── EarthquakeModal.tsx     # Enhanced with animations
│   ├── EarthquakeMap.tsx       # Advanced interactive map
│   ├── LoadingSpinner.tsx
│   ├── ErrorMessage.tsx
│   └── SearchAndFilter.tsx     # Enhanced with animations
├── hooks/              # Custom React hooks
│   └── useEarthquakes.ts
├── types/              # TypeScript type definitions
│   └── earthquake.ts
├── utils/              # Helper functions
│   ├── dateUtils.ts
│   └── earthquakeUtils.ts
├── App.tsx             # Main application with dark mode
└── main.tsx           # Application entry point
```

### API Information
This application uses the USGS Earthquake API:
- **Endpoint**: `https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson`
- **Data**: Last 24 hours of earthquake activity worldwide
- **Update Frequency**: Every minute
- **No API key required**

## 🗺️ Advanced Map Features

### Interactive Markers
- **Dynamic Sizing**: Marker size scales with earthquake magnitude (20px-60px)
- **Color Coding**: Sophisticated color system based on magnitude severity
- **Multi-layer Animation**: Pulse rings, glow effects, and hover animations
- **Recent Indicators**: Special bounce animation for earthquakes within the last hour
- **Hover Effects**: Scale up with enhanced shadow and glow effects
- **Gradient Backgrounds**: Linear gradients for professional appearance

### Enhanced Popups
- **Animated Entry**: Smooth scale and fade animations using Framer Motion
- **Gradient Headers**: Color-coded headers based on earthquake magnitude
- **Comprehensive Info**: Time, coordinates, depth, and warnings in organized layout
- **Action Buttons**: Animated buttons with hover effects
- **Responsive Design**: Adapts to different screen sizes
- **Professional Styling**: Consistent with overall app design

### Map Controls & Interaction
- **Smooth Bounds Fitting**: Animated camera movement to show all earthquakes
- **Loading Overlay**: Professional loading animation while map initializes
- **Touch Optimization**: Enhanced for mobile and tablet interaction
- **Custom Styling**: Professional map controls with shadows and hover effects
- **Performance**: Staggered marker loading to prevent UI blocking

## 📱 Enhanced Features in Detail

### Dark Mode Support
- **System Integration**: Respects user's system preference
- **Smooth Transitions**: All elements animate between light and dark themes
- **Consistent Theming**: All components support dark mode
- **Map Integration**: Dark map tiles for dark mode
- **Accessibility**: Maintains proper contrast ratios in both modes

### Advanced Animations
- **Page Transitions**: Smooth page load animations
- **Component Animations**: Individual component entrance animations
- **Micro-interactions**: Button hover effects, scale animations
- **Loading States**: Professional loading animations throughout
- **Modal Animations**: Sophisticated modal entrance/exit animations
- **List Animations**: Staggered card loading animations

### Enhanced Search & Filtering
- **Animated Filters**: Smooth expand/collapse animations
- **Real-time Updates**: Instant filtering with smooth transitions
- **Visual Feedback**: Animated magnitude indicator
- **Responsive Design**: Adapts to all screen sizes
- **Professional Styling**: Consistent with overall design language

### Responsive Design
- **Mobile First**: Optimized for mobile devices
- **Tablet Optimization**: Perfect layout for tablet screens
- **Desktop Enhancement**: Full-featured desktop experience
- **Touch Friendly**: Large touch targets and smooth interactions
- **Performance**: Optimized animations for all devices

## 🎨 Design Philosophy

The application follows modern design principles with advanced animations:
- **Minimalism**: Clean, uncluttered interface with purposeful animations
- **Clarity**: Clear information hierarchy with smooth transitions
- **Accessibility**: Proper contrast ratios and semantic HTML
- **Performance**: Optimized animations that don't impact performance
- **Consistency**: Unified design language across all components
- **Delight**: Subtle animations that enhance user experience

## 🔧 Customization

### Animation Settings
Animations can be customized in component files using Framer Motion:
```typescript
// Example: Customize card hover animation
whileHover={{ 
  scale: 1.02, 
  y: -4,
  boxShadow: "0 20px 40px rgba(0, 0, 0, 0.15)"
}}
```

### Map Marker Customization
Advanced marker styling in `src/components/EarthquakeMap.tsx`:
```typescript
const createAdvancedMagnitudeMarker = (magnitude: number, isRecent: boolean) => {
  const baseSize = Math.max(24, Math.min(60, magnitude * 8));
  // Customize size calculation, colors, and animations here
};
```

### Color System
Comprehensive color system in `src/utils/earthquakeUtils.ts`:
```typescript
const getMarkerColors = (mag: number) => {
  if (mag >= 7) return { bg: '#dc2626', border: '#991b1b', glow: '#fca5a5' };
  // Customize color mappings here
};
```

### Dark Mode Theming
Dark mode colors can be customized throughout the components using Tailwind's dark mode classes:
```typescript
className={`transition-colors duration-300 ${
  darkMode 
    ? 'bg-gray-800 text-white' 
    : 'bg-white text-gray-900'
}`}
```

## 📄 License

This project is open source and available under the MIT License.

## 🙏 Acknowledgments

- **USGS** for providing free, real-time earthquake data
- **OpenStreetMap** for providing free map tiles
- **Leaflet** for the excellent mapping library
- **React Leaflet** for React integration
- **Framer Motion** for advanced animation capabilities
- **Tailwind CSS** for the utility-first CSS framework
- **Lucide** for the beautiful icon set
- **Vite** for the fast development experience

## 🐛 Troubleshooting

### Common Issues

1. **Map Not Loading**: Ensure you have a stable internet connection for loading map tiles from OpenStreetMap.

2. **Animations Performance**: If animations are slow on older devices, they will automatically reduce motion based on user preferences.

3. **CORS Errors**: The USGS API supports CORS, but if you encounter issues, ensure you're accessing the site via HTTP/HTTPS, not file:// protocol.

4. **Data Not Loading**: Check your internet connection and ensure the USGS API is accessible. The application will show an error message with a retry button.

5. **Dark Mode Issues**: Dark mode state is managed in the main App component and passed down to all child components.

### Performance Optimization

1. **Large Dataset Performance**: The application handles large datasets efficiently with staggered animations and optimized rendering.

2. **Mobile Performance**: Animations are optimized for mobile devices with reduced complexity when needed.

3. **Memory Management**: Components properly clean up animations and event listeners.

### Development

```bash
# Check for linting issues
npm run lint

# Build and test production bundle
npm run build && npm run preview
```

### Animation-specific Troubleshooting

1. **Framer Motion Issues**: Ensure all animated components are properly wrapped with motion elements.

2. **Animation Performance**: Use `will-change` CSS property sparingly and let Framer Motion handle optimization.

3. **Reduced Motion**: The application respects user's `prefers-reduced-motion` settings.

---

Made with ❤️ using React, TypeScript, Framer Motion, React Leaflet, and USGS earthquake data.