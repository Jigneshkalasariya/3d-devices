# Angular 3D Devices POC

A proof-of-concept Angular 20+ application that integrates Firebase Firestore with Three.js to display devices in a table and render corresponding 3D models.

## Features

- ✅ Angular 20+ with standalone components
- ✅ Firebase & Firestore integration
- ✅ Real-time data synchronization
- ✅ Three.js 3D rendering with GLB model support
- ✅ Angular Material table
- ✅ Interactive camera zoom on row click
- ✅ Smooth camera animations

## Setup Instructions

### 1. Firebase Configuration

1. Create a Firebase project at [https://console.firebase.google.com](https://console.firebase.google.com)
2. Enable Firestore Database
3. Get your Firebase config from Project Settings
4. Update `src/environments/environment.ts` with your Firebase credentials:

```typescript
export const environment = {
  production: false,
  firebase: {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_AUTH_DOMAIN",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_STORAGE_BUCKET",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID"
  }
};
```

### 2. Firestore Data Setup

Create a collection named `devices` in Firestore with three documents:

**Document 1:**
```json
{
  "name": "Device Alpha",
  "type": "Sensor",
  "status": "Active",
  "modelPath": "/models/device1.glb"
}
```

**Document 2:**
```json
{
  "name": "Device Beta",
  "type": "Controller",
  "status": "Idle",
  "modelPath": "/models/device2.glb"
}
```

**Document 3:**
```json
{
  "name": "Device Gamma",
  "type": "Monitor",
  "status": "Active",
  "modelPath": "/models/device3.glb"
}
```

### 3. 3D Models

Place your GLB model files in the `public/models/` directory:
- `device1.glb`
- `device2.glb`
- `device3.glb`

You can download free GLB models from:
- [Sketchfab](https://sketchfab.com/feed)
- [Poly Pizza](https://poly.pizza/)
- [Google Poly Archive](https://github.com/google/poly)

### 4. Install Dependencies

```bash
npm install
```

### 5. Run the Application

```bash
npm start
```

Navigate to `http://localhost:4200/`

## How It Works

1. The app fetches device data from Firestore in real-time
2. Devices are displayed in an Angular Material table
3. Three.js loads and renders 3D models corresponding to each device
4. Clicking a table row triggers a smooth camera animation that zooms to the corresponding 3D model

## Project Structure

```
src/
├── app/
│   ├── components/
│   │   └── device-viewer/          # Main component with table and 3D canvas
│   ├── services/
│   │   └── device.service.ts       # Firestore data service
│   ├── models/
│   │   └── device.model.ts         # Device interface
│   ├── app.component.ts            # Root component
│   ├── app.config.ts               # App configuration with Firebase
│   └── main.ts                     # Bootstrap
├── environments/
│   └── environment.ts              # Firebase config
└── styles.scss                     # Global styles
public/
└── models/                         # GLB 3D model files
```

## Technologies Used

- Angular 20.3
- Firebase 11.10
- @angular/fire 20.0
- Three.js 0.181
- Angular Material 20.2
- TypeScript 5.8

## Notes

- The app uses standalone components (no NgModule)
- Real-time Firestore updates are automatically reflected in the UI
- Camera animations use cubic easing for smooth transitions
- Fallback cubes are rendered if GLB models fail to load
"# 3d-devices" 
