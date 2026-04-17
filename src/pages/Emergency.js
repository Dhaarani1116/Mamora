import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaExclamationTriangle, FaPhone, FaMapMarkerAlt, FaAmbulance, 
  FaUserMd, FaCrosshairs, FaHospital, FaShieldAlt,
  FaLocationArrow, FaWalking
} from 'react-icons/fa';
import { useLanguage } from '../contexts/LanguageContext';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix Leaflet default icon issue
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;

// Custom marker icons
const hospitalIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

const policeIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png',
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

const userIcon = new L.DivIcon({
  className: 'custom-user-marker',
  html: `<div style="
    width: 24px; 
    height: 24px; 
    background: #3B82F6; 
    border: 3px solid white; 
    border-radius: 50%; 
    box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.3);
    animation: pulse 2s infinite;
  "></div>`,
  iconSize: [24, 24],
  iconAnchor: [12, 12],
});

// Component to center map on user location
function MapCenter({ location }) {
  const map = useMap();
  useEffect(() => {
    if (location) {
      map.setView([location.lat, location.lng], 14);
    }
  }, [location, map]);
  return null;
}

const Emergency = () => {
  const { t, language } = useLanguage();
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [location, setLocation] = useState(null);
  const [nearbyPlaces, setNearbyPlaces] = useState([]);
  const [selectedType, setSelectedType] = useState('all');
  const [showSOSModal, setShowSOSModal] = useState(false);
  const mapRef = useRef(null);

  useEffect(() => {
    // Get current location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
          // Mock nearby places with coordinates relative to user
          setNearbyPlaces([
            { id: 1, name: 'City General Hospital', distance: '0.8 km', phone: '108', type: 'hospital', lat: position.coords.latitude + 0.002, lng: position.coords.longitude + 0.001, icon: FaHospital },
            { id: 2, name: 'Mother Care Clinic', distance: '1.2 km', phone: '+91-98765-43210', type: 'hospital', lat: position.coords.latitude - 0.001, lng: position.coords.longitude + 0.002, icon: FaUserMd },
            { id: 3, name: 'Police Station', distance: '1.5 km', phone: '100', type: 'police', lat: position.coords.latitude + 0.001, lng: position.coords.longitude - 0.002, icon: FaShieldAlt },
            { id: 4, name: '24/7 Emergency Center', distance: '2.5 km', phone: '102', type: 'hospital', lat: position.coords.latitude - 0.002, lng: position.coords.longitude - 0.001, icon: FaAmbulance },
          ]);
        },
        (error) => {
          console.error('Location error:', error);
          // Default location for demo
          setLocation({ lat: 12.9716, lng: 77.5946 });
          setNearbyPlaces([
            { id: 1, name: 'City General Hospital', distance: '0.8 km', phone: '108', type: 'hospital', lat: 12.9736, lng: 77.5956, icon: FaHospital },
            { id: 2, name: 'Mother Care Clinic', distance: '1.2 km', phone: '+91-98765-43210', type: 'hospital', lat: 12.9706, lng: 77.5966, icon: FaUserMd },
            { id: 3, name: 'Police Station', distance: '1.5 km', phone: '100', type: 'police', lat: 12.9726, lng: 77.5926, icon: FaShieldAlt },
            { id: 4, name: '24/7 Emergency Center', distance: '2.5 km', phone: '102', type: 'hospital', lat: 12.9696, lng: 77.5936, icon: FaAmbulance },
          ]);
        }
      );
    }
  }, []);

  const triggerSOS = () => {
    setShowSOSModal(true);
  };

  const confirmSOS = () => {
    setSending(true);
    
    // Get user data and location
    const userData = JSON.parse(localStorage.getItem('maatrucare_user_data') || '{}');
    const emergencyContacts = JSON.parse(localStorage.getItem('maatrucare_emergency_contacts') || '[]');
    
    // Simulate sending alerts
    setTimeout(() => {
      setSending(false);
      setSent(true);
      setShowSOSModal(false);
      
      // Create alert log
      const alertData = {
        timestamp: new Date().toISOString(),
        location: location,
        user: userData,
        contactsNotified: emergencyContacts,
        emergencyServices: ['108', '102'],
        status: 'SENT'
      };
      
      // Save to alert history
      const alertHistory = JSON.parse(localStorage.getItem('maatrucare_alert_history') || '[]');
      alertHistory.unshift(alertData);
      localStorage.setItem('maatrucare_alert_history', JSON.stringify(alertHistory));
      
      console.log('🚨 EMERGENCY ALERT SENT:', alertData);
      
      // Vibrate device
      if (navigator.vibrate) {
        navigator.vibrate([500, 200, 500, 200, 500]);
      }
      
      setTimeout(() => setSent(false), 8000);
    }, 2000);
  };

  const emergencyNumbers = [
    { number: '108', label: t('ambulance') || 'Ambulance', icon: FaAmbulance, color: 'bg-red-500' },
    { number: '102', label: t('emergency') || 'Emergency', icon: FaExclamationTriangle, color: 'bg-orange-500' },
    { number: '100', label: t('police') || 'Police', icon: FaShieldAlt, color: 'bg-blue-500' },
  ];

  const getLocalizedPlaceName = (place) => {
    const translations = {
      'City General Hospital': { ta: 'நகர பொது மருத்துவமனை', hi: 'सिटी जनरल हॉस्पिटल' },
      'Mother Care Clinic': { ta: 'தாய் பராமரிப்பு மருத்துவமனை', hi: 'मदर केयर क्लिनिक' },
      'Police Station': { ta: 'காவல் நிலையம்', hi: 'पुलिस स्टेशन' },
      '24/7 Emergency Center': { ta: '24/7 அவசர மையம்', hi: '24/7 इमरजेंसी सेंटर' },
    };
    return translations[place.name]?.[language] || place.name;
  };

  const filteredPlaces = selectedType === 'all' 
    ? nearbyPlaces 
    : nearbyPlaces.filter(p => p.type === selectedType);

  const defaultPosition = [12.9716, 77.5946]; // Default to Bangalore

  return (
    <div className="pb-24 bg-gray-900 min-h-screen relative">
      {/* Header */}
      <motion.div 
        className="absolute top-0 left-0 right-0 z-[1000] p-4 pointer-events-none"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="flex justify-between items-center max-w-7xl mx-auto">
          <div className="flex items-center gap-2 pointer-events-auto">
            <div className="w-10 h-10 bg-white/20 backdrop-blur rounded-full flex items-center justify-center shadow-lg">
              <FaShieldAlt className="text-white" />
            </div>
            <div>
              <h1 className="text-white font-bold text-lg drop-shadow-md">{t('emergencySOS')}</h1>
              <p className="text-white/90 text-xs font-medium drop-shadow">{t('protected')}</p>
            </div>
          </div>
          <div className="flex items-center gap-2 pointer-events-auto">
            <div className="px-3 py-1.5 bg-green-500/90 backdrop-blur rounded-full text-white text-xs flex items-center gap-1.5 shadow-lg">
              <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
              {t('protected')}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Two Column Layout */}
      <div className="pt-20 px-4 max-w-7xl mx-auto h-[calc(100vh-6rem)]">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 h-full">
          
          {/* Left Column - Map */}
          <div className="relative h-[50vh] lg:h-full rounded-2xl overflow-hidden shadow-2xl">
            <MapContainer
              center={location ? [location.lat, location.lng] : defaultPosition}
              zoom={14}
              scrollWheelZoom={true}
              style={{ height: '100%', width: '100%' }}
              zoomControl={false}
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              
              {location && <MapCenter location={location} />}
              
              {location && (
                <Marker position={[location.lat, location.lng]} icon={userIcon}>
                  <Popup>
                    <div className="text-center">
                      <p className="font-bold text-gray-800">{t('youAreHere')}</p>
                      <p className="text-xs text-gray-500">GPS: {location.lat.toFixed(4)}, {location.lng.toFixed(4)}</p>
                    </div>
                  </Popup>
                </Marker>
              )}
              
              {filteredPlaces.map((place) => (
                <Marker 
                  key={place.id}
                  position={[place.lat, place.lng]}
                  icon={place.type === 'hospital' ? hospitalIcon : policeIcon}
                >
                  <Popup>
                    <div className="p-2 min-w-[150px]">
                      <div className="flex items-center gap-2 mb-2">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          place.type === 'hospital' ? 'bg-red-100' : 'bg-blue-100'
                        }`}>
                          <place.icon className={place.type === 'hospital' ? 'text-red-500' : 'text-blue-500'} />
                        </div>
                        <div>
                          <p className="font-bold text-gray-800 text-sm">{getLocalizedPlaceName(place)}</p>
                          <p className="text-xs text-gray-500">{place.distance} away</p>
                        </div>
                      </div>
                      <a 
                        href={`tel:${place.phone}`}
                        className="flex items-center justify-center gap-2 bg-green-500 text-white px-3 py-2 rounded-lg text-sm font-medium hover:bg-green-600 transition-colors"
                      >
                        <FaPhone className="text-xs" />
                        {place.phone}
                      </a>
                    </div>
                  </Popup>
                </Marker>
              ))}
            </MapContainer>

            {/* Map Filter Buttons */}
            <div className="absolute bottom-4 left-4 right-4 z-[500] flex justify-center gap-2 pointer-events-none">
              <div className="flex gap-2 pointer-events-auto bg-black/40 backdrop-blur-md p-2 rounded-xl">
                <button
                  onClick={() => setSelectedType('all')}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    selectedType === 'all' ? 'bg-white text-gray-900' : 'bg-white/20 text-white hover:bg-white/30'
                  }`}
                >
                  {t('all')}
                </button>
                <button
                  onClick={() => setSelectedType('hospital')}
                  className={`px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-1.5 transition-all ${
                    selectedType === 'hospital' ? 'bg-red-500 text-white' : 'bg-white/20 text-white hover:bg-white/30'
                  }`}
                >
                  <FaHospital />
                  {t('hospitals')}
                </button>
                <button
                  onClick={() => setSelectedType('police')}
                  className={`px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-1.5 transition-all ${
                    selectedType === 'police' ? 'bg-blue-500 text-white' : 'bg-white/20 text-white hover:bg-white/30'
                  }`}
                >
                  <FaShieldAlt />
                  {t('police')}
                </button>
              </div>
            </div>
          </div>

          {/* Right Column - Places List */}
          <div className="bg-gray-800 rounded-2xl p-4 h-[40vh] lg:h-full overflow-hidden flex flex-col">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-white font-bold text-lg">{t('nearbyHospitals')}</h2>
              <span className="text-gray-400 text-sm">{filteredPlaces.length} {t('placesFound')}</span>
            </div>
            
            <div className="flex gap-2 mb-4">
              <span className="flex items-center gap-1 text-xs text-gray-400">
                <div className="w-2 h-2 bg-red-500 rounded-full" /> {t('hospital')}
              </span>
              <span className="flex items-center gap-1 text-xs text-gray-400">
                <div className="w-2 h-2 bg-blue-500 rounded-full" /> {t('police')}
              </span>
            </div>

            <div className="overflow-y-auto flex-1 space-y-3 pr-1">
              {filteredPlaces.map((place, index) => (
                <motion.div
                  key={place.id}
                  className="flex items-center justify-between p-3 bg-gray-700 rounded-xl hover:bg-gray-600 transition-colors"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      place.type === 'hospital' ? 'bg-red-100 text-red-500' : 'bg-blue-100 text-blue-500'
                    }`}>
                      <place.icon />
                    </div>
                    <div>
                      <p className="font-medium text-white text-sm">{getLocalizedPlaceName(place)}</p>
                      <p className="text-xs text-gray-400">{place.distance} • {place.phone}</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <a
                      href={`tel:${place.phone}`}
                      className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center text-white hover:bg-green-600 transition-colors"
                    >
                      <FaPhone className="text-sm" />
                    </a>
                  </div>
                </motion.div>
              ))}
              
              {filteredPlaces.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  <p>No places found</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* SOS Emergency Hub Button - Fixed at bottom */}
      <motion.div 
        className="fixed bottom-4 right-4 z-[60]"
        initial={{ y: 100 }}
        animate={{ y: 0 }}
      >
        {!sent && (
          <motion.button
            onClick={triggerSOS}
            className="bg-gradient-to-r from-red-500 to-red-600 text-white rounded-full w-16 h-16 flex items-center justify-center shadow-lg shadow-red-500/30"
            whileTap={{ scale: 0.95 }}
          >
            <FaExclamationTriangle className="text-2xl" />
          </motion.button>
        )}
      </motion.div>

      {/* Alert Sent Notification - Show in right panel area */}
      <AnimatePresence>
        {sent && (
          <motion.div
            className="fixed top-20 right-4 z-[60] max-w-sm"
            initial={{ x: 300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 300, opacity: 0 }}
          >
            <div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-2xl p-4 shadow-2xl">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
                  <FaExclamationTriangle className="text-xl" />
                </div>
                <div>
                  <p className="font-bold">{t('alertSent')}</p>
                  <p className="text-xs opacity-90">{t('helpOnWay')}</p>
                </div>
              </div>
              
              <div className="bg-white/10 rounded-xl p-2 mt-3 space-y-1">
                <div className="flex items-center gap-2 text-xs">
                  <div className="w-2 h-2 bg-green-300 rounded-full animate-pulse" />
                  <span>{t('smsSentTo')}: +91 98765 43210</span>
                </div>
                <div className="flex items-center gap-2 text-xs">
                  <div className="w-2 h-2 bg-blue-300 rounded-full animate-pulse" />
                  <span>{t('locationShared')}</span>
                </div>
              </div>
              
              <p className="text-xs text-center mt-2 opacity-80">
                {new Date().toLocaleTimeString()}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* SOS Modal - Bottom Sheet Style */}
      <AnimatePresence>
        {showSOSModal && (
          <motion.div
            className="fixed inset-0 bg-black/60 z-[70] flex items-end justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowSOSModal(false)}
          >
            <motion.div
              className="bg-white rounded-t-3xl p-6 w-full max-w-md mb-0"
              initial={{ y: 300, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 300, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="w-12 h-1 bg-gray-300 rounded-full mx-auto mb-6" />
              
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <FaExclamationTriangle className="text-red-500 text-2xl" />
                </div>
                <h2 className="text-lg font-bold text-gray-800 mb-1">
                  {t('confirmEmergency')}
                </h2>
                <p className="text-gray-600 text-sm">
                  {t('sosWarning')}
                </p>
              </div>

              {/* Emergency Numbers Quick Access */}
              <div className="grid grid-cols-3 gap-2 mb-6">
                {emergencyNumbers.map((item) => (
                  <a
                    key={item.number}
                    href={`tel:${item.number}`}
                    className={`${item.color} text-white rounded-xl p-3 flex flex-col items-center gap-1`}
                  >
                    <item.icon className="text-lg" />
                    <span className="text-xs font-bold">{item.number}</span>
                  </a>
                ))}
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setShowSOSModal(false)}
                  className="flex-1 py-3 bg-gray-100 text-gray-700 rounded-xl font-medium"
                >
                  {t('cancel')}
                </button>
                <button
                  onClick={confirmSOS}
                  disabled={sending}
                  className="flex-1 py-3 bg-red-500 text-white rounded-xl font-medium flex items-center justify-center gap-2"
                >
                  {sending ? (
                    <motion.div
                      className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    />
                  ) : (
                    <>{t('confirm')} SOS</>
                  )}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* CSS Styles for animations */}
      <style>{`
        @keyframes pulse {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.2); opacity: 0.7; }
        }
        .custom-user-marker {
          background: transparent !important;
          border: none !important;
        }
        .leaflet-popup-content-wrapper {
          border-radius: 12px;
          padding: 0;
          overflow: hidden;
        }
        .leaflet-popup-content {
          margin: 0;
          padding: 0;
        }
      `}</style>
    </div>
  );
};

export default Emergency;
