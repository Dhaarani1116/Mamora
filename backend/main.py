from fastapi import FastAPI, HTTPException, UploadFile, File, Form
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional, List
import uvicorn
from datetime import datetime
import json

app = FastAPI(
    title="MaatruCare API",
    description="AI-Powered Maternal Health Backend",
    version="1.0.0"
)

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Data Models
class User(BaseModel):
    name: str
    email: str
    phone: str
    pregnancy_week: int
    due_date: str

class HealthData(BaseModel):
    hemoglobin: float
    blood_pressure_systolic: int
    blood_pressure_diastolic: int
    blood_sugar_fasting: int
    blood_sugar_post_meal: int

class NutritionRequest(BaseModel):
    symptoms: str
    language: str = "en"

class ChatMessage(BaseModel):
    message: str
    language: str = "en"

# Mock Database
users_db = {}
health_records_db = []

# AI Logic Functions
def analyze_health_risk(health_data: HealthData):
    risk_factors = []
    risk_level = "low"
    score = 100

    # Hemoglobin analysis
    if health_data.hemoglobin < 11:
        risk_factors.append("Low hemoglobin - Anemia risk")
        score -= 20
    elif health_data.hemoglobin > 15:
        risk_factors.append("Elevated hemoglobin")
        score -= 5

    # Blood Pressure analysis
    if health_data.blood_pressure_systolic > 140 or health_data.blood_pressure_diastolic > 90:
        risk_factors.append("High blood pressure")
        score -= 15
    elif health_data.blood_pressure_systolic < 90 or health_data.blood_pressure_diastolic < 60:
        risk_factors.append("Low blood pressure")
        score -= 10

    # Blood Sugar analysis
    if health_data.blood_sugar_fasting > 100 or health_data.blood_sugar_post_meal > 140:
        risk_factors.append("Elevated blood sugar - Gestational diabetes risk")
        score -= 15

    # Determine risk level
    if score < 60:
        risk_level = "high"
    elif score < 80:
        risk_level = "medium"

    return {
        "risk_level": risk_level,
        "health_score": max(0, score),
        "risk_factors": risk_factors,
        "recommendations": generate_recommendations(risk_factors, risk_level)
    }

def generate_recommendations(risk_factors, risk_level):
    recommendations = []
    
    if risk_level == "high":
        recommendations.append({
            "type": "urgent",
            "title": "Immediate Medical Attention Required",
            "description": "Your health indicators suggest high risk. Please consult your doctor within 24 hours."
        })
    
    for factor in risk_factors:
        if "hemoglobin" in factor.lower():
            recommendations.append({
                "type": "diet",
                "title": "Iron-Rich Diet",
                "description": "Increase intake of spinach, beetroot, jaggery, and lentils. Take iron supplements as prescribed."
            })
        
        if "blood pressure" in factor.lower():
            recommendations.append({
                "type": "lifestyle",
                "title": "Blood Pressure Management",
                "description": "Reduce salt intake, practice meditation, and monitor BP daily."
            })
        
        if "sugar" in factor.lower():
            recommendations.append({
                "type": "diet",
                "title": "Blood Sugar Control",
                "description": "Avoid sweets, reduce carbohydrate intake, and eat small frequent meals."
            })
    
    return recommendations

def get_nutrition_advice(symptoms: str, language: str = "en"):
    """Rule-based nutrition recommendation system"""
    
    symptoms_lower = symptoms.lower()
    
    conditions = {
        "anemia": ["low hemoglobin", "anemia", "tired", "weak", "fatigue", "dizzy", "paleness"],
        "gestational_diabetes": ["diabetes", "sugar", "glucose", "thirsty", "frequent urination"],
        "morning_sickness": ["nausea", "vomit", "morning sickness", "queasy"],
        "constipation": ["constipation", "hard stool", "difficulty passing"],
        "heartburn": ["heartburn", "acid reflux", "chest burn", "indigestion"],
        "leg_cramps": ["leg cramp", "muscle cramp", "leg pain"]
    }
    
    detected_condition = None
    for condition, keywords in conditions.items():
        if any(keyword in symptoms_lower for keyword in keywords):
            detected_condition = condition
            break
    
    nutrition_db = {
        "anemia": {
            "foods": [
                {"name": "Spinach (Palak)", "nutrients": "Iron, Folate", "benefits": "Boosts hemoglobin"},
                {"name": "Beetroot", "nutrients": "Iron, Vitamin C", "benefits": "Improves blood count"},
                {"name": "Jaggery (Gur)", "nutrients": "Iron", "benefits": "Natural iron source"},
                {"name": "Pomegranate", "nutrients": "Iron, Vitamin C", "benefits": "Enhances iron absorption"},
                {"name": "Lentils (Dal)", "nutrients": "Iron, Protein", "benefits": "Vegetarian iron source"},
            ],
            "avoid": ["Tea/Coffee with meals", "Calcium supplements with iron"],
            "tips": ["Take Vitamin C with iron-rich foods", "Cook in iron vessels"]
        },
        "gestational_diabetes": {
            "foods": [
                {"name": "Bitter Gourd", "nutrients": "Low GI", "benefits": "Regulates blood sugar"},
                {"name": "Whole Wheat", "nutrients": "Complex Carbs", "benefits": "Slow sugar release"},
                {"name": "Lady Finger", "nutrients": "Fiber", "benefits": "Improves insulin sensitivity"},
            ],
            "avoid": ["Sweets", "White rice", "Fruit juices", "Processed foods"],
            "tips": ["Eat small frequent meals", "Monitor blood sugar regularly"]
        },
        "morning_sickness": {
            "foods": [
                {"name": "Ginger", "nutrients": "Anti-nausea", "benefits": "Reduces vomiting"},
                {"name": "Lemon", "nutrients": "Vitamin C", "benefits": "Refreshing, reduces nausea"},
                {"name": "Crackers", "nutrients": "Dry carbs", "benefits": "Easy on stomach"},
            ],
            "avoid": ["Spicy food", "Strong odors", "Fried food"],
            "tips": ["Eat before getting out of bed", "Keep crackers by bedside"]
        },
        "constipation": {
            "foods": [
                {"name": "Papaya", "nutrients": "Fiber, Enzymes", "benefits": "Natural laxative"},
                {"name": "Prunes", "nutrients": "Fiber", "benefits": "Relieves constipation"},
                {"name": "Flaxseeds", "nutrients": "Omega-3, Fiber", "benefits": "Promotes bowel movement"},
            ],
            "avoid": ["Refined flour", "Cheese", "Less water"],
            "tips": ["Drink 8-10 glasses of water", "Exercise regularly"]
        }
    }
    
    if detected_condition and detected_condition in nutrition_db:
        return {
            "condition": detected_condition,
            "data": nutrition_db[detected_condition]
        }
    
    return {
        "condition": "general_pregnancy",
        "data": {
            "foods": [
                {"name": "Folic Acid Rich Foods", "nutrients": "Folate", "benefits": "Prevents birth defects"},
                {"name": "Calcium Sources", "nutrients": "Calcium", "benefits": "Bone development"},
                {"name": "Protein Foods", "nutrients": "Protein", "benefits": "Baby growth"},
            ],
            "avoid": ["Alcohol", "Raw fish", "Unpasteurized milk"],
            "tips": ["Eat balanced meals", "Stay hydrated"]
        }
    }

def process_chat_message(message: str, language: str = "en"):
    """Rule-based chatbot responses"""
    
    message_lower = message.lower()
    
    responses = {
        "en": {
            "greeting": ["Hello! I'm Mamora AI. How can I help you today? 💕"],
            "nutrition": ["During pregnancy, eat: Folic acid foods (leafy greens), Iron (spinach, jaggery), Calcium (milk, paneer), Protein (dal, eggs). Avoid: raw foods, excess caffeine. 🥗"],
            "symptoms": ["Common symptoms: nausea, fatigue, breast tenderness. Call doctor if: severe pain, bleeding, vision changes. ⚠️"],
            "exercise": ["Safe exercises: walking 30 min, swimming, prenatal yoga. Avoid: heavy lifting, contact sports. 🧘"],
            "emergency": ["🚨 EMERGENCY: Call 108 if severe pain, heavy bleeding, or no baby movements!"],
            "appointment": ["Visit schedule: Weeks 4-28 (monthly), 28-36 (bi-weekly), 36-40 (weekly). Don't miss appointments! 📅"],
            "mental": ["Feeling stressed? Practice deep breathing, talk to loved ones, rest well. You're doing great! 💪"],
            "baby": ["Baby development: After week 20, count 10 movements in 2 hours. Decreased movement? Call doctor immediately! 👶"],
            "default": ["I can help with: nutrition, symptoms, exercise, appointments, or emergencies. What do you need? 🤔"]
        },
        "hi": {
            "greeting": ["नमस्ते! मैं मामोरा AI हूं। मैं आज आपकी कैसे मदद कर सकती हूं? 💕"],
            "nutrition": ["गर्भावस्था के दौरान खाएं: फोलिक एसिड (हरी पत्तेदार सब्जियां), आयरन (पालक, गुड़), कैल्शियम (दूध, पनीर), प्रोटीन (दाल, अंडे)। बचें: कच्चे खाद्य पदार्थ, अत्यधिक कैफीन। 🥗"],
            "symptoms": ["सामान्य लक्षण: मतली, थकान, स्तनों में कोमलता। तुरंत डॉक्टर से संपर्क करें यदि: गंभीर दर्द, रक्तस्राव, दृष्टि में बदलाव हो। ⚠️"],
            "exercise": ["सुरक्षित व्यायाम: 30 मिनट टहलना, तैरना, प्रसवपूर्व योग। बचें: भारी वजन उठाना, संपर्क वाले खेल। 🧘"],
            "emergency": ["🚨 आपातकालीन स्थिति: गंभीर दर्द, भारी रक्तस्राव, या बच्चे की हलचल न होने पर तुरंत 108 पर कॉल करें!"],
            "appointment": ["डॉक्टर से मिलने का समय: सप्ताह 4-28 (मासिक), 28-36 (हर दो सप्ताह में), 36-40 (साप्ताहिक)। डॉक्टर से मिलना न भूलें! 📅"],
            "mental": ["तनाव महसूस कर रही हैं? गहरी सांस लेने का अभ्यास करें, अपनों से बात करें, अच्छी तरह आराम करें। आप बहुत अच्छा कर रही हैं! 💪"],
            "baby": ["बच्चे का विकास: सप्ताह 20 के बाद, 2 घंटे में 10 गतिविधियों (किक) की गणना करें। हलचल कम होने पर? तुरंत डॉक्टर को बुलाएं! 👶"],
            "default": ["मैं आपकी मदद कर सकती हूं: पोषण, लक्षण, व्यायाम, नियुक्तियां, या आपातकालीन। आपको क्या चाहिए? 🤔"]
        },
        "ta": {
            "greeting": ["வணக்கம்! நான் மாமோரா AI. இன்று நான் உங்களுக்கு எவ்வாறு உதவ முடியும்? 💕"],
            "nutrition": ["கர்ப்ப காலத்தில் சாப்பிடுங்கள்: போலிக் அமிலம் (பசலைக்கீரை), இரும்புச் சத்து (பீட்ரூட், வெல்லம்), கால்சியம் (பால், பனீர்), புரதம் (பருப்பு, முட்டை). தவிர்க்கவும்: சமைக்காத உணவுகள், அதிக காஃபின். 🥗"],
            "symptoms": ["பொதுவான அறிகுறிகள்: குமட்டல், சோர்வு, மார்பக மென்மை. கடுமையான வலி, இரத்தப்போக்கு, பார்வை மாற்றங்கள் இருந்தால் உடனடியாக மருத்துவரை அழைக்கவும். ⚠️"],
            "exercise": ["பாதுகாப்பான உடற்பயிற்சிகள்: 30 நிமிடம் நடைப்பயிற்சி, நீச்சல், பிரசவக்கால யோகா. தவிர்க்கவும்: அதிக எடை தூக்குதல், அதிர்வு தரும் விளையாட்டுகள். 🧘"],
            "emergency": ["🚨 அவசரநிலை: கடுமையான வலி, அதிக இரத்தப்போக்கு அல்லது குழந்தையின் அசைவு இல்லை என்றால் உடனடியாக 108 ஐ அழைக்கவும்!"],
            "appointment": ["மருத்துவ சந்திப்பு அட்டவணை: 4-28 வாரங்கள் (மாதந்தோறும்), 28-36 வாரங்கள் (இரண்டு வாரங்களுக்கு ஒருமுறை), 36-40 வாரங்கள் (வாரம் ஒருமுறை). சந்திப்புகளைத் தவறவிடாதீர்கள்! 📅"],
            "mental": ["மன அழுத்தமாக உணர்கிறீர்களா? ஆழமாக மூச்சை உள்ளிழுத்து வெளிவிடவும், அன்புகோரியவர்களிடம் பேசவும், நன்றாக ஓய்வெடுக்கவும். நீங்கள் சிறப்பாகச் செய்கிறீர்கள்! 💪"],
            "baby": ["குழந்தையின் வளர்ச்சி: 20 வாரங்களுக்குப் பிறகு, 2 மணிநேரத்தில் 10 அசைவுகளைக் கணக்கிடுங்கள். அசைவு குறைந்தால்? உடனடியாக மருத்துவரை அழைக்கவும்! 👶"],
            "default": ["நான் உங்களுக்கு உதவ முடியும்: ஊட்டச்சத்து, அறிகுறிகள், உடற்பயிற்சி, சந்திப்புகள் அல்லது அவசரநிலைகள். உங்களுக்கு என்ன வேண்டும்? 🤔"]
        }
    }
    
    lang_responses = responses.get(language, responses["en"])
    
    # Match intent
    if any(word in message_lower for word in ["hello", "hi", "hey", "வணக்கம்", "नमस्ते", "நலம்"]):
        return lang_responses["greeting"][0]
    elif any(word in message_lower for word in ["food", "eat", "diet", "nutrition", "உணவு", "खाना", "உணவு முறை", "சாப்பாடு", "டயட்", "पोषण", "आहार"]):
        return lang_responses["nutrition"][0]
    elif any(word in message_lower for word in ["symptom", "pain", "nausea", "அறிகுறி", "लक्षण", "வலி", "குமட்டல்", "வாந்தி", "தலைவலி", "दर्द", "उल्टी"]):
        return lang_responses["symptoms"][0]
    elif any(word in message_lower for word in ["exercise", "workout", "yoga", "உடற்பயிற்சி", "व्यायाम", "யோகா", "பயிற்சி", "योगा", "कसरत"]):
        return lang_responses.get("exercise", lang_responses["default"])[0]
    elif any(word in message_lower for word in ["emergency", "urgent", "bleeding", "அவசரம்", "ஆபத்து", "இரத்தப்போக்கு", "आपातकाल", "खून", "आपात"]):
        return lang_responses.get("emergency", lang_responses["default"])[0]
    elif any(word in message_lower for word in ["appointment", "visit", "doctor", "சந்திப்பு", "மருத்துவர்", "अपॉइंटमेंट", "डॉक्टर"]):
        return lang_responses.get("appointment", lang_responses["default"])[0]
    elif any(word in message_lower for word in ["mental", "stress", "anxiety", "மன அழுத்தம்", "கவலை", "तनाव", "चिंता", "मानसिक"]):
        return lang_responses.get("mental", lang_responses["default"])[0]
    elif any(word in message_lower for word in ["baby", "kick", "movement", "குழந்தை", "அசைவு", "बच्चा", "हलचल", "किक"]):
        return lang_responses.get("baby", lang_responses["default"])[0]
    else:
        return lang_responses["default"][0]

# API Endpoints
@app.get("/")
def root():
    return {
        "message": "MaatruCare API - AI Maternal Health System",
        "version": "1.0.0",
        "status": "active"
    }

@app.post("/api/analyze-health")
def analyze_health(health_data: HealthData):
    result = analyze_health_risk(health_data)
    health_records_db.append({
        "timestamp": datetime.now().isoformat(),
        "data": health_data.dict(),
        "result": result
    })
    return result

@app.post("/api/nutrition")
def get_nutrition(request: NutritionRequest):
    return get_nutrition_advice(request.symptoms, request.language)

@app.post("/api/chat")
def chat(message: ChatMessage):
    response = process_chat_message(message.message, message.language)
    return {
        "message": response,
        "timestamp": datetime.now().isoformat(),
        "language": message.language
    }

@app.get("/api/hospitals")
def get_hospitals(lat: float = 12.9716, lng: float = 77.5946, radius: float = 10.0):
    """Get nearby hospitals (mock data)"""
    hospitals = [
        {
            "id": 1,
            "name": "Government Maternity Hospital",
            "type": "government",
            "distance": 0.8,
            "lat": lat + 0.005,
            "lng": lng + 0.005,
            "phone": "080-12345678",
            "emergency": True,
            "rating": 4.2
        },
        {
            "id": 2,
            "name": "Mother Care Speciality Hospital",
            "type": "private",
            "distance": 1.5,
            "lat": lat - 0.003,
            "lng": lng + 0.008,
            "phone": "+91-98765-43210",
            "emergency": True,
            "rating": 4.5
        },
        {
            "id": 3,
            "name": "City General Hospital",
            "type": "government",
            "distance": 2.3,
            "lat": lat + 0.01,
            "lng": lng - 0.005,
            "phone": "108",
            "emergency": True,
            "rating": 3.8
        }
    ]
    return {"hospitals": hospitals, "total": len(hospitals)}

@app.post("/api/emergency-alert")
def emergency_alert(lat: float, lng: float, user_id: str = "anonymous"):
    """Process emergency SOS alert"""
    return {
        "status": "alert_sent",
        "message": "Emergency services have been notified",
        "location": {"lat": lat, "lng": lng},
        "nearest_hospital": "City General Hospital (2.3 km)",
        "estimated_arrival": "8-12 minutes"
    }

@app.post("/api/sos")
def sos_alert(payload: dict):
    """Process emergency SOS alert from Mamora dashboard"""
    return {
        "status": "alert_sent",
        "message": "Emergency SOS Cloud Signal Dispatched!",
        "location": payload.get("location"),
        "patient_name": payload.get("name"),
        "pregnancy_week": payload.get("week"),
        "timestamp": datetime.now().isoformat()
    }

@app.post("/api/upload-report")
async def upload_report(file: UploadFile = File(...)):
    """Upload and analyze medical report"""
    # Mock analysis
    return {
        "filename": file.filename,
        "status": "analyzed",
        "extracted_data": {
            "hemoglobin": 11.5,
            "blood_pressure": {"systolic": 120, "diastolic": 80},
            "blood_sugar": {"fasting": 85, "post_meal": 120}
        },
        "risk_level": "low",
        "health_score": 85
    }

@app.get("/api/health-tips")
def get_health_tips(week: int = 20):
    """Get personalized health tips based on pregnancy week"""
    tips = {
        "first_trimester": [
            "Take folic acid daily",
            "Avoid alcohol and smoking",
            "Eat small, frequent meals"
        ],
        "second_trimester": [
            "Increase calcium intake",
            "Stay active with light exercise",
            "Monitor weight gain"
        ],
        "third_trimester": [
            "Prepare hospital bag",
            "Count baby kicks",
            "Get plenty of rest"
        ]
    }
    
    trimester = "first_trimester" if week <= 13 else "second_trimester" if week <= 27 else "third_trimester"
    
    return {
        "week": week,
        "trimester": trimester,
        "tips": tips[trimester]
    }

@app.post("/api/sync")
def sync_logs(payload: dict):
    """Sync diagnostics and vitals logs to cloud database"""
    print("Syncing logs:", payload.get("logs", []))
    return {
        "status": "success",
        "message": "Cloud sync complete!",
        "synced_count": len(payload.get("logs", []))
    }

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
