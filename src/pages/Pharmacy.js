import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaMapMarkerAlt, FaPhone, FaClock, FaSearch, FaPills, FaShoppingCart } from 'react-icons/fa';
import { useLanguage } from '../contexts/LanguageContext';

const Pharmacy = () => {
  const { t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const [pharmacies, setPharmacies] = useState([]);
  const [medicines, setMedicines] = useState([
    { name: 'Folic Acid', category: 'vitamin', price: '₹45', prescription: false },
    { name: 'Iron Tablets', category: 'supplement', price: '₹89', prescription: true },
    { name: 'Calcium + D3', category: 'supplement', price: '₹125', prescription: false },
    { name: 'Prenatal Vitamins', category: 'vitamin', price: '₹199', prescription: false },
    { name: 'Doxylamine', category: 'medicine', price: '₹67', prescription: true },
    { name: 'Progesterone', category: 'hormone', price: '₹245', prescription: true },
  ]);

  useEffect(() => {
    // Mock pharmacy data
    const mockPharmacies = [
      {
        id: 1,
        name: 'Apollo Pharmacy',
        distance: '0.5 km',
        address: '123 MG Road',
        phone: '080-12345678',
        open: true,
        hours: '24 Hours',
        delivery: true
      },
      {
        id: 2,
        name: 'MedPlus',
        distance: '1.2 km',
        address: '456 Market Street',
        phone: '080-87654321',
        open: true,
        hours: '8 AM - 11 PM',
        delivery: true
      },
      {
        id: 3,
        name: 'Local Medical Store',
        distance: '0.3 km',
        address: '789 Colony Road',
        phone: '+91-98765-43210',
        open: false,
        hours: '9 AM - 9 PM',
        delivery: false
      },
      {
        id: 4,
        name: 'NetMeds Store',
        distance: '2.5 km',
        address: '555 Tech Park',
        phone: '1800-123-4567',
        open: true,
        hours: '24 Hours',
        delivery: true
      }
    ];
    setPharmacies(mockPharmacies);
  }, []);

  const filteredMedicines = medicines.filter(m => 
    m.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="pb-24 p-4">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-4"
      >
        <h1 className="text-2xl font-bold gradient-text mb-2">{t('pharmacy')}</h1>
        <p className="text-gray-600 text-sm">Find medicines and nearby pharmacies</p>
      </motion.div>

      {/* Search */}
      <motion.div
        className="card mb-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <div className="relative">
          <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search medicines..."
            className="input-field pl-10"
          />
        </div>
      </motion.div>

      {/* Quick Categories */}
      {!searchQuery && (
        <motion.div
          className="flex gap-2 mb-4 overflow-x-auto pb-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {['All', 'Vitamins', 'Supplements', 'Medicines', 'Baby Care'].map(cat => (
            <button
              key={cat}
              className="px-4 py-2 rounded-full bg-white border border-gray-200 text-sm font-medium whitespace-nowrap hover:bg-pink-50 hover:border-pink-200 transition-colors"
            >
              {cat}
            </button>
          ))}
        </motion.div>
      )}

      {/* Medicines */}
      <div className="space-y-3 mb-6">
        <h3 className="font-semibold text-gray-800">Common Pregnancy Medicines</h3>
        {filteredMedicines.map((medicine, index) => (
          <motion.div
            key={medicine.name}
            className="card flex items-center justify-between"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-pink-100 to-purple-100 flex items-center justify-center">
                <FaPills className="text-pink-500" />
              </div>
              <div>
                <p className="font-medium text-gray-800">{medicine.name}</p>
                <span className={`badge text-xs ${
                  medicine.prescription ? 'bg-yellow-100 text-yellow-700' : 'bg-green-100 text-green-700'
                }`}>
                  {medicine.prescription ? 'Prescription Required' : 'OTC'}
                </span>
              </div>
            </div>
            <div className="text-right">
              <p className="font-bold text-gray-800">{medicine.price}</p>
              <button className="text-xs text-pink-600 font-medium hover:underline flex items-center gap-1">
                <FaShoppingCart /> Add
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Nearby Pharmacies */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <h3 className="font-semibold text-gray-800 mb-4">Nearby Pharmacies</h3>
        <div className="space-y-3">
          {pharmacies.map((pharmacy, index) => (
            <motion.div
              key={pharmacy.id}
              className="card"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + index * 0.1 }}
            >
              <div className="flex justify-between items-start mb-2">
                <h4 className="font-semibold text-gray-800">{pharmacy.name}</h4>
                <div className="flex items-center gap-2">
                  {pharmacy.delivery && (
                    <span className="badge bg-blue-100 text-blue-700 text-xs">Delivery</span>
                  )}
                  <span className={`badge text-xs ${
                    pharmacy.open ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                  }`}>
                    {pharmacy.open ? 'Open' : 'Closed'}
                  </span>
                </div>
              </div>

              <div className="space-y-1 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <FaMapMarkerAlt className="text-pink-500" />
                  <span>{pharmacy.address} • {pharmacy.distance}</span>
                </div>
                <div className="flex items-center gap-2">
                  <FaClock className="text-blue-500" />
                  <span>{pharmacy.hours}</span>
                </div>
                <div className="flex items-center gap-2">
                  <FaPhone className="text-green-500" />
                  <a href={`tel:${pharmacy.phone}`} className="text-pink-600 hover:underline">
                    {pharmacy.phone}
                  </a>
                </div>
              </div>

              <div className="flex gap-2 mt-3">
                <button className="flex-1 py-2 bg-pink-100 text-pink-700 rounded-full text-sm font-medium hover:bg-pink-200 transition-colors">
                  View Store
                </button>
                <button className="flex-1 py-2 bg-gray-100 text-gray-700 rounded-full text-sm font-medium hover:bg-gray-200 transition-colors">
                  Call Now
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Prescription Upload */}
      <motion.div
        className="card mt-4 bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center shadow-sm">
            <FaPills className="text-purple-500 text-xl" />
          </div>
          <div className="flex-1">
            <h4 className="font-semibold text-gray-800">Have a Prescription?</h4>
            <p className="text-sm text-gray-600">Upload and get medicines delivered</p>
          </div>
          <button className="px-4 py-2 bg-purple-500 text-white rounded-full text-sm font-medium hover:bg-purple-600 transition-colors">
            Upload
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default Pharmacy;
