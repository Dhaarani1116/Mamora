import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaSearch, FaArrowRight, FaHeart, FaTimes } from 'react-icons/fa';
import { useLanguage } from '../contexts/LanguageContext';

const Nutrition = () => {
  const { t, language } = useLanguage();
  const [symptoms, setSymptoms] = useState('');
  const [recommendations, setRecommendations] = useState(null);
  const [loading, setLoading] = useState(false);
  const [selectedFood, setSelectedFood] = useState(null);

  // Food images from Unsplash & User Provided Links
  const foodImages = {
    spinach: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRhDYQ-Klr-qxmInZ3aBYfDOAz_m5ua6j5wGSJsisrbSg&s=10',
    beetroot: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTn70o75FUR9dimwnwtUKhmgSZvq7pWpiBh2ctITSMCsg1EQC4WEutlLPk&s',
    pomegranate: 'https://www.gettystewart.com/wp-content/uploads/2022/11/pomegranate-and-seeds-s.jpg',
    lentils: 'https://naturallieplantbased.com/wp-content/uploads/2025/03/lentils-1.jpg',
    jaggery: 'https://www.health.com/thmb/sjw6tl9BsMoU490NoiI_Wk7ljYc=/2121x0/filters:no_upscale():max_bytes(150000):strip_icc()/Health-GettyImages-2185398044-78d583abd4cc492aaef1c55a3a403a5f.jpg',
    bittergourd: 'https://radhakrishnaagriculture.in/cdn/shop/files/bittergourd..jpg?v=1709206932',
    ladyfinger: 'https://www.organiktruck.com/cdn/shop/files/Organik_Truck_Lady_Finger_-2.jpg?v=1776626104',
    wheat: 'https://i0.wp.com/pam-main-website-media.s3.amazonaws.com/wp-content/uploads/2024/03/06110226/Wheat-Flour.jpg?fit=1200%2C800&ssl=1',
    cucumber: 'https://bombayseeds.com/cdn/shop/files/Cucumbers.jpg?v=1729232030',
    ginger: 'https://dabur1884.com/cdn/shop/articles/Top_10_Ginger_Tea_Benefits__Immune_Inflammation_and_More_1_630a7479-c801-4b7b-b5c7-93e2a9ba3533.png?v=1764053038',
    lemon: 'https://thevegetablebazaar.in/wp-content/uploads/2022/04/Lemon.png',
    coconut: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRKXnMIkGQo7ZTHs1M_7diZfO7MmFyOVDfvIQ&s',
    papaya: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTS66zVsX1BHHKrI6kJBfNs1h31Un1a_zIWVg&s',
    prunes: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTb6LBu5Ht013W1KOEIH_rXMh5yCNWNFOiXyQ&s',
    flaxseeds: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQAjrIaSd9VruveFvAVlmrWKoTQmBP29TT_6A&s',
    curd: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTjIgNK2xWyAFcCloXvrpcZci_5DYK_2iwj4Q&s',
    milk: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSph7KkV8WkmWuc6b4DDO-mVc6-Lx8eN-CTuQ&s',
    sesame: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTo0NAi4SSZq1SnACIlp-lNa9glJEQdQAZ71Q&s',
    ragi: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTy1dBFcCNcAahq_AbUs-QLfYJpqnnODyyPuw&s',
    almonds: 'https://krisikart.com/wp-content/uploads/2026/01/almonds-GettyImages-683814187-2000-44a06e730fac4c60a10cbb5f9642b589.jpg',
    default: 'https://images.unsplash.com/photo-1490818387583-1baba5e638af?w=400'
  };

  const nutritionDatabase = {
    anemia: {
      condition: 'Low Hemoglobin / Anemia',
      conditionTa: 'குறைந்த ஹீமோகுளோபின் / இரத்த சோகை',
      conditionHi: 'कम हीमोग्लोबिन / एनीमिया',
      foods: [
        { name: 'Spinach (Palak)', nameTa: 'பசலைக் கீரை', nameHi: 'पालक', image: foodImages.spinach, nutrients: 'Iron, Folate' },
        { name: 'Beetroot', nameTa: 'பீட்ரூட்', nameHi: 'चुकंदर', image: foodImages.beetroot, nutrients: 'Iron, Vitamin C' },
        { name: 'Jaggery (Gur)', nameTa: 'வெல்லம்', nameHi: 'गुड़', image: foodImages.jaggery, nutrients: 'Iron' },
        { name: 'Pomegranate', nameTa: 'மாதுளம்', nameHi: 'अनार', image: foodImages.pomegranate, nutrients: 'Iron, Vitamin C' },
        { name: 'Lentils (Dal)', nameTa: 'பருப்பு', nameHi: 'दाल', image: foodImages.lentils, nutrients: 'Iron, Protein' },
      ],
      avoid: ['Tea/Coffee with meals', 'Calcium supplements with iron-rich foods'],
      mealPlan: {
        breakfast: { en: 'Spinach paratha + Pomegranate juice', ta: 'பசலை பராத்தா + மாதுளை ஜூஸ்', hi: 'पालक पराठा + अनार जूस' },
        snack: { en: 'Jaggery chikki', ta: 'வெல்ல சிக்கி', hi: 'गुड़ की चिक्की' },
        lunch: { en: 'Mixed dal + Beetroot curry + Rice', ta: 'கலவை பருப்பு + பீட்ரூட் கறி + சாதம்', hi: 'मिक्स दाल + चुकंदर सब्जी + चावल' },
        evening: { en: 'Sprouts chaat', ta: 'முளைகட்டிய கொட்டை சாட்', hi: 'स्प्राउट्स चाट' },
        dinner: { en: 'Palak paneer + Chapati', ta: 'பசலை பனீர் + சப்பாத்தி', hi: 'पालक पनीर + चपाती' }
      }
    },
    diabetes: {
      condition: 'Gestational Diabetes',
      conditionTa: 'கர்ப்ப கால நீரிழிவு',
      conditionHi: 'गर्भकालीन मधुमेह',
      foods: [
        { name: 'Bitter Gourd (Karela)', nameTa: 'பாகற்காய்', nameHi: 'करेला', image: foodImages.bittergourd, nutrients: 'Low GI' },
        { name: 'Lady Finger (Bhindi)', nameTa: 'வெண்டைக்காய்', nameHi: 'भिंडी', image: foodImages.ladyfinger, nutrients: 'Fiber' },
        { name: 'Whole Wheat', nameTa: 'கோதுமை', nameHi: 'गेहूं', image: foodImages.wheat, nutrients: 'Complex Carbs' },
        { name: 'Cucumber', nameTa: 'வெள்ளரிக்காய்', nameHi: 'खीरा', image: foodImages.cucumber, nutrients: 'Low Calorie' },
      ],
      avoid: ['Sweets', 'White rice', 'Fruit juices', 'Processed foods'],
      mealPlan: {
        breakfast: { en: 'Wheat porridge + Cucumber salad', ta: 'கோதுமை கஞ்சி + வெள்ளரிக்காய் சாலட்', hi: 'दलिया + खीरे का सलाद' },
        snack: { en: 'Roasted chana', ta: 'வறுத்த கொண்டைக்கடலை', hi: 'भुने चने' },
        lunch: { en: 'Karela sabzi + Brown rice', ta: 'பாகற்காய் சப்ஜி + பழுப்பு அரிசி', hi: 'करेला सब्जी + ब्राउन राइस' },
        evening: { en: 'Sprouts', ta: 'முளைகட்டிய கொட்டை', hi: 'स्प्राउट्स' },
        dinner: { en: 'Bhindi masala + Chapati', ta: 'வெண்டைக்காய் மசாலா + சப்பாத்தி', hi: 'भिंडी मसाला + चपाती' }
      }
    },
    nausea: {
      condition: 'Morning Sickness / Nausea',
      conditionTa: 'காலையில் உணர்ச்சி குமட்டல்',
      conditionHi: 'सुबह की मतली',
      foods: [
        { name: 'Ginger (Adrak)', nameTa: 'இஞ்சி', nameHi: 'अदरक', image: foodImages.ginger, nutrients: 'Anti-nausea' },
        { name: 'Lemon', nameTa: 'எலுமிச்சை', nameHi: 'नींबू', image: foodImages.lemon, nutrients: 'Vitamin C' },
        { name: 'Coconut water', nameTa: 'தேங்காய் தண்ணீர்', nameHi: 'नारियल पानी', image: foodImages.coconut, nutrients: 'Electrolytes' },
      ],
      avoid: ['Spicy food', 'Strong odors', 'Fried food', 'Heavy meals'],
      mealPlan: {
        breakfast: { en: 'Dry crackers + Ginger tea', ta: 'காய்ந்த பிஸ்கட் + இஞ்சி தேநீர்', hi: 'कुरकुरे बिस्कुट + अदरक की चाय' },
        snack: { en: 'Coconut water', ta: 'தேங்காய் தண்ணீர்', hi: 'नारियल पानी' },
        lunch: { en: 'Khichdi + Dahi', ta: 'கிச்சடி + தயிர்', hi: 'खिचड़ी + दही' },
        evening: { en: 'Lemon water', ta: 'எலுமிச்சை தண்ணீர்', hi: 'नींबू पानी' },
        dinner: { en: 'Light dal soup + Rice', ta: 'சாதாரண பருப்பு சூப் + சாதம்', hi: 'हल्की दाल सूप + चावल' }
      }
    },
    constipation: {
      condition: 'Constipation',
      conditionTa: 'மலச்சிக்கல்',
      conditionHi: 'कब्ज',
      foods: [
        { name: 'Papaya', nameTa: 'பப்பாளி', nameHi: 'पपीता', image: foodImages.papaya, nutrients: 'Fiber, Enzymes' },
        { name: 'Prunes', nameTa: 'உலர்ந்த பிளம்', nameHi: 'प्रून', image: foodImages.prunes, nutrients: 'Natural laxative' },
        { name: 'Flaxseeds', nameTa: 'ஆளிவிதை', nameHi: 'अलसी के बीज', image: foodImages.flaxseeds, nutrients: 'Omega-3, Fiber' },
        { name: 'Curd (Dahi)', nameTa: 'தயிர்', nameHi: 'दही', image: foodImages.curd, nutrients: 'Probiotics' },
      ],
      avoid: ['Refined flour', 'Cheese', 'Processed food', 'Less water'],
      mealPlan: {
        breakfast: { en: 'Papaya + Flaxseed smoothie', ta: 'பப்பாளி + ஆளிவிதை ஸ்மூத்தி', hi: 'पपीता + अलसी स्मूदी' },
        snack: { en: 'Prunes (4-5 pieces)', ta: 'உலர்ந்த பிளம் (4-5)', hi: 'प्रून (4-5)' },
        lunch: { en: 'Vegetable curry + Curd + Roti', ta: 'காய்கறி கறி + தயிர் + ரொட்டி', hi: 'सब्जी + दही + रोटी' },
        evening: { en: 'Buttermilk', ta: 'மோர்', hi: 'छाछ' },
        dinner: { en: 'Mixed veg soup', ta: 'கலவை காய்கறி சூப்', hi: 'मिक्स वेज सूप' }
      }
    },
    calcium: {
      condition: 'Calcium Deficiency',
      conditionTa: 'கால்சியம் குறைபாடு',
      conditionHi: 'कैल्शियम की कमी',
      foods: [
        { name: 'Milk & Dairy', nameTa: 'பால் மற்றும் பால் பொருட்கள்', nameHi: 'दूध और डेयरी', image: foodImages.milk, nutrients: 'Calcium, Protein' },
        { name: 'Sesame Seeds (Til)', nameTa: 'எள்', nameHi: 'तिल', image: foodImages.sesame, nutrients: 'Calcium' },
        { name: 'Ragi (Finger Millet)', nameTa: 'கேழ்வரகு', nameHi: 'रागी', image: foodImages.ragi, nutrients: 'Calcium' },
        { name: 'Almonds', nameTa: 'பாதாம்', nameHi: 'बादाम', image: foodImages.almonds, nutrients: 'Calcium, Vitamin E' },
      ],
      avoid: ['Excessive caffeine', 'Sodas', 'Too much salt'],
      mealPlan: {
        breakfast: { en: 'Ragi dosa + Milk', ta: 'கேழ்வரகு தோசை + பால்', hi: 'रागी डोसा + दूध' },
        snack: { en: 'Soaked almonds (8-10)', ta: 'நனைத்த பாதாம் (8-10)', hi: 'भीगे बादाम (8-10)' },
        lunch: { en: 'Regular meal + Buttermilk', ta: 'சாதாரண உணவு + மோர்', hi: 'सामान्य भोजन + छाछ' },
        evening: { en: 'Sesame laddu', ta: 'எள் லட்டு', hi: 'तिल लड्डू' },
        dinner: { en: 'Paneer curry + Roti', ta: 'பனீர் கறி + ரொட்டி', hi: 'पनीर सब्जी + रोटी' }
      }
    }
  };

  const getLocalizedText = (obj) => {
    if (!obj) return '';
    if (typeof obj === 'string') return obj;
    return obj[language] || obj.en || '';
  };

  const analyzeSymptoms = () => {
    setLoading(true);
    
    setTimeout(() => {
      const lowerSymptoms = symptoms.toLowerCase();
      let result = nutritionDatabase.anemia; // default
      
      if (lowerSymptoms.includes('diabetes') || lowerSymptoms.includes('sugar') || lowerSymptoms.includes('glucose')) {
        result = nutritionDatabase.diabetes;
      } else if (lowerSymptoms.includes('nausea') || lowerSymptoms.includes('vomit') || lowerSymptoms.includes('morning')) {
        result = nutritionDatabase.nausea;
      } else if (lowerSymptoms.includes('constipat') || lowerSymptoms.includes('stool')) {
        result = nutritionDatabase.constipation;
      } else if (lowerSymptoms.includes('calcium') || lowerSymptoms.includes('bone') || lowerSymptoms.includes('teeth')) {
        result = nutritionDatabase.calcium;
      }
      
      setRecommendations(result);
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="pb-24 p-4">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6"
      >
        <h1 className="text-2xl font-bold gradient-text mb-2">{t('aiNutrition')}</h1>
        <p className="text-gray-600 text-sm">AI-powered diet recommendations for Indian mothers</p>
      </motion.div>

      {/* Search Section */}
      <motion.div
        className="card mb-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {t('enterSymptoms')}
        </label>
        <div className="relative">
          <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <textarea
            value={symptoms}
            onChange={(e) => setSymptoms(e.target.value)}
            placeholder="E.g., I feel nauseous in the morning, have low hemoglobin, feeling weak..."
            className="input-field pl-10 min-h-[100px] resize-none"
          />
        </div>
        <button
          onClick={analyzeSymptoms}
          disabled={!symptoms || loading}
          className="btn-primary w-full mt-4 flex items-center justify-center gap-2"
        >
          {loading ? (
            <motion.div
              className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            />
          ) : (
            <>{t('getRecommendations')} ✨</>
          )}
        </button>
      </motion.div>

      {/* Results */}
      <AnimatePresence>
        {recommendations && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="space-y-4"
          >
            {/* Condition Badge */}
            <div className="bg-gradient-to-r from-pink-50 to-purple-50 rounded-2xl p-4 border border-pink-200">
              <p className="text-sm text-gray-600">{t('detectedCondition') || 'Detected Condition:'}</p>
              <p className="text-lg font-bold text-pink-700">
                {getLocalizedText({ en: recommendations.condition, ta: recommendations.conditionTa, hi: recommendations.conditionHi })}
              </p>
            </div>

      {/* Recommended Foods with Images */}
            <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
              <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <span className="text-2xl">🥗</span>
                {t('recommendedFoods') || 'Recommended Foods'}
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {recommendations.foods.map((food, index) => (
                  <motion.div
                    key={food.name}
                    className="bg-white rounded-xl overflow-hidden border border-gray-100 shadow-sm cursor-pointer"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                    onClick={() => setSelectedFood(food)}
                    whileTap={{ scale: 0.95 }}
                  >
                    <div className="h-24 overflow-hidden">
                      <img 
                        src={food.image || foodImages.default} 
                        alt={food.name}
                        className="w-full h-full object-cover"
                        onError={(e) => { e.target.src = foodImages.default; }}
                      />
                    </div>
                    <div className="p-3">
                      <p className="font-medium text-gray-800 text-sm">{getLocalizedText({ en: food.name, ta: food.nameTa, hi: food.nameHi })}</p>
                      <p className="text-xs text-teal-600">{food.nutrients}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Foods to Avoid */}
            <div className="card border-red-100">
              <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                <span className="text-2xl">⚠️</span>
                {t('avoidFoods')}
              </h3>
              <ul className="space-y-2">
                {recommendations.avoid.map((item, index) => (
                  <motion.li
                    key={item}
                    className="flex items-center gap-2 text-sm text-red-600 bg-red-50 rounded-lg px-3 py-2"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                  >
                    <span>❌</span> {item}
                  </motion.li>
                ))}
              </ul>
            </div>

            {/* Daily Meal Plan */}
            <div className="bg-gradient-to-br from-green-50 to-teal-50 rounded-2xl p-4 border border-green-100">
              <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <span className="text-2xl">📋</span>
                {t('dailyMealPlan') || 'Daily Meal Plan'}
              </h3>
              <div className="space-y-3">
                {Object.entries(recommendations.mealPlan).map(([meal, food], index) => (
                  <motion.div
                    key={meal}
                    className="flex items-center gap-3 bg-white/70 rounded-lg p-3"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 + index * 0.1 }}
                  >
                    <div className="w-16 text-xs font-medium text-teal-600 uppercase">{meal}</div>
                    <div className="flex-1 text-sm text-gray-800">{getLocalizedText(food)}</div>
                    <FaArrowRight className="text-teal-400 text-xs" />
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Save Button */}
            <button
              onClick={() => {
                const saved = JSON.parse(localStorage.getItem('maatrucare_nutrition') || '[]');
                saved.push({
                  date: new Date().toISOString(),
                  symptoms,
                  recommendations
                });
                localStorage.setItem('maatrucare_nutrition', JSON.stringify(saved));
                alert('Saved to your records!');
              }}
              className="btn-secondary w-full"
            >
              💾 Save to Records
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Quick Categories */}
      {!recommendations && (
        <motion.div
          className="mt-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <h3 className="font-semibold text-gray-800 mb-3">Common Concerns</h3>
          <div className="grid grid-cols-2 gap-3">
            {Object.entries(nutritionDatabase).map(([key, data]) => (
              <button
                key={key}
                onClick={() => {
                  setSymptoms(data.condition);
                  setRecommendations(data);
                }}
                className="card text-left p-3 hover:bg-pink-50 transition-colors"
              >
                <p className="font-medium text-sm text-gray-800">{data.condition}</p>
                <p className="text-xs text-gray-500 mt-1">{data.foods.length} recommended foods</p>
              </button>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default Nutrition;
