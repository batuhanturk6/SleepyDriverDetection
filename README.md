Detailed README for Sleepy Driver Detection Application
# Sleepy Driver Detection System
Real-time driver alertness monitoring to enhance road safety.

Overview
The Sleepy Driver Detection system is a mobile application designed to minimize fatigue-related accidents by monitoring drivers' alertness using smartphone or external cameras. The system provides real-time fatigue detection, audible and visual alerts, and personalized safety recommendations. It is compatible with Android and iOS devices, offering user-friendly features such as Spotify alarm integration and voice commands via GPT API.

Key Features
Fatigue Detection

Real-time tracking of eye movements and facial expressions using smartphone or external cameras.
Alerts drivers when fatigue signs like prolonged eye closure, excessive blinking, or yawning are detected.
Customizable Alarm System

Integration with Spotify API for personalized alarm sounds.
Alarm volume, tone, and duration adjustable to driver preferences.
Driving Data Analysis

Daily, weekly, and monthly reports on fatigue trends, alarm triggers, and driving performance.
Heatmaps and graphical analyses for better insights.
Voice Commands

Hands-free interaction with voice-activated commands powered by GPT API.
Configure alarms, get driving updates, and receive safety recommendations through simple voice prompts.
Crash Detection and Emergency Alerts

Detects crashes based on sudden deceleration or inactivity.
Sends alerts to emergency contacts with real-time location and severity details.
Accessibility Features

Larger on-screen buttons and vibration alerts for visually or hearing-impaired users.
Installation
Follow these steps to set up the application:

Clone the Repository:

bash
Kodu kopyala
git clone https://github.com/batuhanturk6/SleepyDriverDetection.git
cd SleepyDriverDetection
Install Dependencies:
Make sure Node.js is installed, then run:

bash
Kodu kopyala
npm install
Environment Configuration:

Add your API keys in a .env file in the root directory.
Example:
makefile
Kodu kopyala
SPOTIFY_API_KEY=your_spotify_api_key
GPT_API_KEY=your_gpt_api_key
Set up Firebase for crash detection and notifications if applicable.
Run the Application:
For Android or iOS:

bash
Kodu kopyala
npm start
Open the app using Expo or your preferred emulator.

Build for Production:
To create production-ready builds:

bash
Kodu kopyala
npm run build
Usage
Open the app and log in or register.
Calibrate the camera for optimal fatigue detection.
Start monitoring your drive.
Customize alarm settings in the "Settings" section.
View driving reports under "Reports."
Contributors
Arman Yılmazkurt
Simay Ardıç
Emirhan Kaya
Ece Gülyüz
Batuhan Türk
For questions or contributions, contact any team member or open a GitHub issue.

License
This project is licensed under the MIT License.

Project Resources
GitHub Repository
Spotify API Documentation
OpenAI GPT API Documentation
