# Quick Start Guide

## Prerequisites
- Node.js 18+ installed
- npm or yarn
- Firebase account

## Step-by-Step Setup (5 minutes)

### 1. Firebase Setup (2 minutes)
```bash
# Go to https://console.firebase.google.com
# Create a new project
# Enable Firestore Database
# Copy your config from Project Settings > General > Your apps
```

### 2. Update Firebase Config (30 seconds)
Edit `src/environments/environment.ts` and paste your Firebase config.

### 3. Add Sample Data to Firestore (1 minute)
In Firebase Console:
- Go to Firestore Database
- Create collection: `devices`
- Add 3 documents with these fields:
  - name: "Device Alpha", type: "Sensor", status: "Active", modelPath: "/models/device1.glb"
  - name: "Device Beta", type: "Controller", status: "Idle", modelPath: "/models/device2.glb"
  - name: "Device Gamma", type: "Monitor", status: "Active", modelPath: "/models/device3.glb"

### 4. Add 3D Models (1 minute)
- Download 3 GLB files from https://poly.pizza/ or https://sketchfab.com/
- Rename to device1.glb, device2.glb, device3.glb
- Place in `public/models/` folder

### 5. Run the App (30 seconds)
```bash
npm start
```

Open http://localhost:4200

### 6. Test the Interaction
- You should see a table with 3 devices
- Click any row in the table
- Watch the camera zoom to the corresponding 3D model!

## Troubleshooting

### Models not loading?
- Check browser console for errors
- Verify GLB files are in `public/models/`
- Try with smaller GLB files (< 2MB)

### No data in table?
- Check Firebase config in environment.ts
- Verify Firestore has the `devices` collection
- Check browser console for Firebase errors
- Update Firestore security rules to allow read access

### Build errors?
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

## What's Next?

Once the POC is working, you can:
- Add more devices to Firestore
- Customize the 3D scene (lighting, background)
- Add device details panel
- Implement device filtering/search
- Add animations to 3D models
- Deploy to Firebase Hosting
