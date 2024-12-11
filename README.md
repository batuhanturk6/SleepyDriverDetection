# Sleepy Driver Detection System

### Real-time driver alertness monitoring to enhance road safety

## Overview
The **Sleepy Driver Detection System** is a mobile application designed to reduce fatigue-related accidents by monitoring driver alertness in real time. Utilizing smartphone or external cameras, the system identifies signs of fatigue, provides audible and visual alerts, and delivers personalized safety recommendations. Compatible with both Android and iOS devices, it offers a user-friendly experience with advanced features such as Spotify alarm integration and voice commands powered by GPT API.

---

## Key Features

### Fatigue Detection
- **Real-Time Monitoring**: Tracks eye movements and facial expressions using smartphone or external cameras.
- **Alert System**: Notifies drivers when signs of fatigue, such as prolonged eye closure, excessive blinking, or yawning, are detected.

### Customizable Alarm System
- **Spotify Integration**: Allows personalized alarm sounds via the Spotify API.
- **Adjustable Settings**: Enables users to customize alarm volume, tone, and duration.

### Driving Data Analysis
- **Detailed Reports**: Generates daily, weekly, and monthly reports on fatigue trends, alarm triggers, and driving performance.
- **Graphical Insights**: Provides heatmaps and other visual analyses for better understanding of driving behavior.

### Voice Commands
- **Hands-Free Interaction**: Facilitates voice-activated commands using GPT API.
- **Convenience**: Configure alarms, receive driving updates, and get safety recommendations with simple voice prompts.

### Crash Detection and Emergency Alerts
- **Accident Detection**: Identifies crashes based on sudden deceleration or inactivity.
- **Emergency Notifications**: Sends alerts with real-time location and severity details to emergency contacts.

### Accessibility Features
- **Enhanced Usability**: Includes larger on-screen buttons and vibration alerts for visually or hearing-impaired users.

---

## Installation

### Step 1: Clone the Repository
```bash
git clone https://github.com/batuhanturk6/SleepyDriverDetection.git
cd SleepyDriverDetection
```

### Step 2: Install Dependencies
Ensure that Node.js is installed, then run:
```bash
npm install
```

### Step 3: Environment Configuration
Create a `.env` file in the root directory and add your API keys:
```
SPOTIFY_API_KEY=your_spotify_api_key
GPT_API_KEY=your_gpt_api_key
```
Set up Firebase for crash detection and notifications if applicable.

### Step 4: Run the Application
For Android or iOS, start the app:
```bash
npm start
```
Open the app using Expo or your preferred emulator.

### Step 5: Build for Production
To create production-ready builds:
```bash
npm run build
```

---

## Usage
1. Open the app and log in or register.
2. Calibrate the camera for optimal fatigue detection.
3. Start monitoring your drive.
4. Customize alarm settings in the **Settings** section.
5. View detailed driving reports under **Reports**.

---

## Contributors
- **Arman Yılmazkurt**
- **Simay Ardıç**
- **Emirhan Kaya**
- **Ece Güylüz**
- **Batuhan Türk**

For questions or contributions, contact any team member or open an issue on GitHub.

---

## License
This project is licensed under the **MIT License**.

---

## Project Resources
- [GitHub Repository](https://github.com/batuhanturk6/SleepyDriverDetection)
- [Spotify API Documentation](https://developer.spotify.com/documentation/web-api/)
- [OpenAI GPT API Documentation](https://platform.openai.com/docs/)
