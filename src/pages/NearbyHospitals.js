import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaMapMarkerAlt, FaPhone, FaDirections, FaSearch, FaHospital } from 'react-icons/fa';
import { useLanguage } from '../contexts/LanguageContext';

const NearbyHospitals = () => {
  const { t } = useLanguage();
  const [location, setLocation] = useState(null);
  const [hospitals, setHospitals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedType, setSelectedType] = useState('all');

  useEffect(() => {
    // Get user location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const loc = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
          setLocation(loc);
          fetchHospitals(loc);
        },
        (error) => {
          // Default to a location if permission denied
          const defaultLoc = { lat: 12.9716, lng: 77.5946 }; // Bangalore
          setLocation(defaultLoc);
          fetchHospitals(defaultLoc);
        }
      );
    }
  }, []);

  const fetchHospitals = (loc) => {
    // Mock hospital data
    const mockHospitals = [
      {
        id: 1,
        name: 'Government Maternity Hospital',
        type: 'government',
        distance: '0.8 km',
        address: '123 Main Road, Near City Center',
        phone: '080-12345678',
        emergency: true,
        rating: 4.2,
        lat: loc.lat + 0.005,
        lng: loc.lng + 0.005
      },
      {
        id: 2,
        name: 'Mother Care Speciality Hospital',
        type: 'private',
        distance: '1.5 km',
        address: '456 Park Avenue, Green Layout',
        phone: '+91-98765-43210',
        emergency: true,
        rating: 4.5,
        lat: loc.lat - 0.003,
        lng: loc.lng + 0.008
      },
      {
        id: 3,
        name: 'City General Hospital',
        type: 'government',
        distance: '2.3 km',
        address: '789 Hospital Road, Downtown',
        phone: '108',
        emergency: true,
        rating: 3.8,
        lat: loc.lat + 0.01,
        lng: loc.lng - 0.005
      },
      {
        id: 4,
        name: 'Women & Child Care Center',
        type: 'private',
        distance: '3.1 km',
        address: '321 Health Street, Suburb',
        phone: '+91-99887-76655',
        emergency: false,
        rating: 4.7,
        lat: loc.lat - 0.008,
        lng: loc.lng - 0.01
      },
      {
        id: 5,
        name: '24/7 Emergency Care',
        type: 'emergency',
        distance: '4.5 km',
        address: '555 Express Highway',
        phone: '102',
        emergency: true,
        rating: 4.0,
        lat: loc.lat + 0.015,
        lng: loc.lng + 0.012
      }
    ];

    setHospitals(mockHospitals);
    setLoading(false);
  };

  const filteredHospitals = selectedType === 'all' 
    ? hospitals 
    : hospitals.filter(h => h.type === selectedType);

  const getDirections = (hospital) => {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${hospital.lat},${hospital.lng}`;
    window.open(url, '_blank');
  };

  const getTypeColor = (type) => {
    switch(type) {
      case 'government': return 'bg-blue-100 text-blue-700';
      case 'private': return 'bg-green-100 text-green-700';
      case 'emergency': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="pb-24 p-4">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-4"
      >
        <h1 className="text-2xl font-bold gradient-text mb-2">{t('hospitals')}</h1>
        <p className="text-gray-600 text-sm">Find maternity hospitals near you</p>
      </motion.div>

      {/* Map Placeholder */}
      <motion.div
        className="card h-48 mb-4 bg-gradient-to-br from-blue-50 to-purple-50 relative overflow-hidden"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        {/* Map Pattern */}
        <div className="absolute inset-0 opacity-30">
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
              <path d="M 10 0 L 0 0 0 10" fill="none" stroke="#ec4899" strokeWidth="0.5"/>
            </pattern>
            <rect width="100" height="100" fill="url(#grid)" />
          </svg>
        </div>
        
        {/* User Location */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <motion.div
            className="w-6 h-6 bg-pink-500 rounded-full border-4 border-white shadow-lg"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <p className="text-xs text-center mt-1 font-medium bg-white/80 px-2 py-1 rounded-full">
            You are here
          </p>
        </div>

        {/* Hospital Markers */}
        {hospitals.slice(0, 3).map((hospital, index) => (
          <motion.div
            key={hospital.id}
            className="absolute"
            style={{
              top: `${30 + index * 15}%`,
              left: `${20 + index * 25}%`,
            }}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3 + index * 0.1 }}
          >
            <div className="w-8 h-8 bg-blue-500 rounded-full border-2 border-white shadow-lg flex items-center justify-center text-white">
              <FaHospital className="text-xs" />
            </div>
            <p className="text-xs font-medium bg-white/90 px-2 py-1 rounded-full mt-1 whitespace-nowrap">
              {hospital.distance}
            </p>
          </motion.div>
        ))}

        {/* Location Info */}
        {location && (
          <div className="absolute bottom-2 left-2 bg-white/90 rounded-lg px-3 py-2 text-xs">
            <p className="text-gray-600">📍 {location.lat.toFixed(4)}, {location.lng.toFixed(4)}</p>
          </div>
        )}
      </motion.div>

      {/* Filters */}
      <div className="flex gap-2 mb-4 overflow-x-auto pb-2">
        {['all', 'government', 'private', 'emergency'].map(type => (
          <button
            key={type}
            onClick={() => setSelectedType(type)}
            className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
              selectedType === type 
                ? 'bg-pink-500 text-white' 
                : 'bg-white text-gray-600 border border-gray-200'
            }`}
          >
            {type.charAt(0).toUpperCase() + type.slice(1)}
          </button>
        ))}
      </div>

      {/* Hospitals List */}
      <div className="space-y-3">
        {loading ? (
          <div className="card text-center py-12">
            <motion.div
              className="w-10 h-10 border-4 border-pink-200 border-t-pink-500 rounded-full mx-auto mb-4"
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            />
            <p className="text-gray-500">Finding nearby hospitals...</p>
          </div>
        ) : (
          filteredHospitals.map((hospital, index) => (
            <motion.div
              key={hospital.id}
              className="card"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="flex justify-between items-start mb-2">
                <div>
                  <span className={`badge ${getTypeColor(hospital.type)} text-xs mb-2 inline-block`}>
                    {hospital.type}
                  </span>
                  <h3 className="font-semibold text-gray-800">{hospital.name}</h3>
                </div>
                {hospital.emergency && (
                  <span className="badge badge-danger text-xs">24/7</span>
                )}
              </div>

              <div className="space-y-2 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <FaMapMarkerAlt className="text-pink-500" />
                  <span>{hospital.address}</span>
                </div>
                <div className="flex items-center gap-2">
                  <FaPhone className="text-green-500" />
                  <a href={`tel:${hospital.phone}`} className="text-pink-600 hover:underline">
                    {hospital.phone}
                  </a>
                </div>
              </div>

              <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-100">
                <div className="flex items-center gap-3">
                  <span className="text-sm font-medium text-gray-700">{hospital.distance}</span>
                  <div className="flex items-center gap-1">
                    <span className="text-yellow-500">★</span>
                    <span className="text-sm text-gray-600">{hospital.rating}</span>
                  </div>
                </div>
                <button
                  onClick={() => getDirections(hospital)}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-full text-sm hover:bg-blue-600 transition-colors"
                >
                  <FaDirections />
                  Directions
                </button>
              </div>
            </motion.div>
          ))
        )}
      </div>

      {/* Emergency Note */}
      <motion.div
        className="card mt-4 bg-red-50 border-red-200"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <div className="flex items-start gap-3">
          <FaHospital className="text-red-500 text-xl mt-1" />
          <div>
            <h4 className="font-semibold text-red-800">Emergency?</h4>
            <p className="text-sm text-red-600 mt-1">
              For life-threatening emergencies, call <strong>108</strong> (Ambulance) immediately.
            </p>
            <a 
              href="tel:108" 
              className="inline-block mt-2 px-4 py-2 bg-red-500 text-white rounded-full text-sm font-medium"
            >
              Call 108 Now
            </a>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default NearbyHospitals;
