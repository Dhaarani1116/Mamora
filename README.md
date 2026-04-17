# MaatruCare - AI-Powered Maternal Health Companion

A complete, production-ready mobile-first web application for maternal healthcare, optimized for real-world usage in rural and low-resource environments.

## 🌟 Features

### Core Features
- 🤰 **Pregnancy Dashboard** - Track weeks, trimesters, baby growth
- 🥗 **AI Nutrition Advisor** - Personalized diet recommendations for Indian foods
- 📄 **Medical Report Analysis** - Upload and analyze health reports with AI
- 📊 **Health Records Timeline** - Complete health history
- 🚨 **Emergency SOS** - One-click emergency alert with location
- ⏰ **Reminder System** - Medicine and appointment reminders (works offline)
- 🏥 **Nearby Hospitals** - Find maternity hospitals with maps
- 💊 **Pharmacy Finder** - Locate medicines and pharmacies
- 🎤 **Voice Assistant** - Speech-to-text input and responses
- 🌐 **Multilingual** - English, Tamil, Hindi support
- 💬 **AI Chatbot** - 24/7 health guidance
- 📴 **Offline-First** - Works without internet

## 🚀 Quick Start

### Prerequisites
- Node.js (v16+)
- Python 3.8+
- npm or yarn

### Installation

1. **Install Frontend Dependencies**
```bash
npm install
```

2. **Install Backend Dependencies**
```bash
cd backend
pip install -r requirements.txt
cd ..
```

3. **Run the Application**

Start both frontend and backend:
```bash
# Terminal 1 - Backend
cd backend
python main.py

# Terminal 2 - Frontend
npm start
```

The app will open at `http://localhost:3000`
Backend API runs at `http://localhost:8000`

## 📱 Mobile App Installation

### Android (Chrome)
1. Open the app in Chrome
2. Tap the menu (3 dots) → "Add to Home screen"
3. Tap "Install"

### iOS (Safari)
1. Open the app in Safari
2. Tap Share button → "Add to Home Screen"
3. Tap "Add"

The app works as a **Progressive Web App (PWA)** with:
- Offline functionality
- Push notifications
- Home screen icon
- Native app-like experience

## 🗂️ Project Structure

```
maternal_health/
├── backend/
│   ├── main.py              # FastAPI backend
│   └── requirements.txt     # Python dependencies
├── public/
│   ├── index.html           # Main HTML
│   ├── manifest.json        # PWA manifest
│   └── service-worker.js    # Offline support
├── src/
│   ├── components/          # Reusable components
│   │   ├── BottomNav.js
│   │   ├── PregnancyCalendar.js
│   │   ├── VoiceAssistant.js
│   │   └── InstallPrompt.js
│   ├── contexts/            # React contexts
│   │   ├── LanguageContext.js
│   │   └── OfflineContext.js
│   ├── pages/               # Main pages
│   │   ├── Login.js
│   │   ├── Dashboard.js
│   │   ├── Nutrition.js
│   │   ├── ReportAnalysis.js
│   │   ├── HealthRecords.js
│   │   ├── Emergency.js
│   │   ├── Reminders.js
│   │   ├── NearbyHospitals.js
│   │   ├── Pharmacy.js
│   │   └── Chatbot.js
│   ├── App.js               # Main app component
│   ├── index.js             # Entry point
│   └── index.css            # Global styles
├── package.json             # Node dependencies
├── tailwind.config.js      # Tailwind CSS config
└── README.md               # This file
```

## 🎨 UI/UX Features

- Modern, premium design with soft pastel colors
- Large buttons and icons for accessibility
- Smooth animations with Framer Motion
- Card-based dashboard layout
- Mobile-first responsive design
- Beautiful maternal-themed illustrations

## 🧠 AI Features

### Health Risk Analysis
- Hemoglobin level assessment
- Blood pressure monitoring
- Blood sugar tracking
- Personalized risk scoring

### Nutrition Recommendations
- Symptom-based diet plans
- Indian/local food suggestions
- Foods to avoid guidance
- Daily meal planning

### Intelligent Chatbot
- Rule-based responses
- Multilingual support
- Voice-enabled interaction
- Emergency guidance

## 📶 Offline Support

The app uses:
- Service Workers for caching
- LocalStorage for data persistence
- IndexedDB for large data
- Background sync when online

## 🔒 Security

- Local data storage
- No sensitive data on servers
- HTTPS-ready for deployment
- Privacy-focused design

## 🌐 API Endpoints

### Health Analysis
```
POST /api/analyze-health
{
  "hemoglobin": 11.5,
  "blood_pressure_systolic": 120,
  "blood_pressure_diastolic": 80,
  "blood_sugar_fasting": 85,
  "blood_sugar_post_meal": 120
}
```

### Nutrition Advice
```
POST /api/nutrition
{
  "symptoms": "low hemoglobin, feeling tired",
  "language": "en"
}
```

### Chatbot
```
POST /api/chat
{
  "message": "What should I eat?",
  "language": "en"
}
```

## 🚀 Deployment

### Deploy Frontend (Netlify/Vercel)
```bash
npm run build
# Deploy 'build' folder
```

### Deploy Backend (Heroku/PythonAnywhere)
```bash
cd backend
# Follow platform-specific instructions
```

## 📞 Emergency Numbers (India)

- **Ambulance**: 108
- **Emergency**: 102
- **Women Helpline**: 1091
- **Child Helpline**: 1098

## 🤝 Contributing

Contributions are welcome! Please feel free to submit issues and pull requests.

## 📄 License

This project is licensed under the MIT License.

## 💖 Made with Care

MaatruCare is built to support every mother on their beautiful journey. Every feature is designed with love, care, and medical accuracy in mind.

---

**Disclaimer**: This app provides general health information and is not a substitute for professional medical advice. Always consult your doctor for medical decisions.
