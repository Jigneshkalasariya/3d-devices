# Setup Checklist ✓

Use this checklist to ensure everything is configured correctly.

## ✅ Prerequisites
- [ ] Node.js 18+ installed (`node --version`)
- [ ] npm installed (`npm --version`)
- [ ] Firebase account created

## ✅ Firebase Configuration

### Create Firebase Project
- [ ] Go to https://console.firebase.google.com
- [ ] Click "Add project"
- [ ] Name your project (e.g., "angular-3d-devices")
- [ ] Disable Google Analytics (optional for POC)
- [ ] Click "Create project"

### Enable Firestore
- [ ] In Firebase Console, go to "Firestore Database"
- [ ] Click "Create database"
- [ ] Choose "Start in test mode" (for development)
- [ ] Select a location
- [ ] Click "Enable"

### Get Firebase Config
- [ ] Go to Project Settings (gear icon)
- [ ] Scroll to "Your apps"
- [ ] Click the web icon (</>)
- [ ] Register app (name: "angular-3d-devices")
- [ ] Copy the firebaseConfig object

### Update Environment File
- [ ] Open `src/environments/environment.ts`
- [ ] Replace the placeholder values with your Firebase config
- [ ] Save the file

## ✅ Firestore Data

### Add Devices Collection
- [ ] In Firestore Database, click "Start collection"
- [ ] Collection ID: `devices`
- [ ] Click "Next"

### Add Document 1
- [ ] Auto-ID or custom ID
- [ ] Add fields:
  - name (string): "Device Alpha"
  - type (string): "Sensor"
  - status (string): "Active"
  - modelPath (string): "/models/device1.glb"
- [ ] Click "Save"

### Add Document 2
- [ ] Click "Add document"
- [ ] Add fields:
  - name (string): "Device Beta"
  - type (string): "Controller"
  - status (string): "Idle"
  - modelPath (string): "/models/device2.glb"
- [ ] Click "Save"

### Add Document 3
- [ ] Click "Add document"
- [ ] Add fields:
  - name (string): "Device Gamma"
  - type (string): "Monitor"
  - status (string): "Active"
  - modelPath (string): "/models/device3.glb"
- [ ] Click "Save"

## ✅ 3D Models

### Download Models
- [ ] Visit https://poly.pizza/ or https://sketchfab.com/
- [ ] Download 3 GLB files (any objects work for POC)
- [ ] Rename files to:
  - device1.glb
  - device2.glb
  - device3.glb

### Place Models
- [ ] Ensure `public/models/` directory exists
- [ ] Copy the 3 GLB files into `public/models/`
- [ ] Verify files are named correctly

## ✅ Installation

### Install Dependencies
```bash
cd angular-3d-devices
npm install
```
- [ ] No errors during installation
- [ ] All packages installed successfully

## ✅ Run Application

### Start Dev Server
```bash
npm start
```
- [ ] Server starts without errors
- [ ] Open http://localhost:4200
- [ ] Application loads

## ✅ Test Functionality

### Visual Check
- [ ] Table displays with 3 rows
- [ ] Device names, types, and statuses are visible
- [ ] 3D canvas shows on the right side
- [ ] 3 3D models are visible in the canvas

### Interaction Test
- [ ] Click on "Device Alpha" row
- [ ] Camera smoothly zooms to first model
- [ ] Click on "Device Beta" row
- [ ] Camera smoothly zooms to second model
- [ ] Click on "Device Gamma" row
- [ ] Camera smoothly zooms to third model

## ✅ Troubleshooting

If something doesn't work:

### Table is empty
- [ ] Check browser console for errors
- [ ] Verify Firebase config in environment.ts
- [ ] Check Firestore has data
- [ ] Verify Firestore rules allow read access

### Models not showing
- [ ] Check browser console for 404 errors
- [ ] Verify GLB files are in `public/models/`
- [ ] Check file names match exactly
- [ ] Try with smaller GLB files (< 2MB)

### Build errors
- [ ] Clear node_modules: `rm -rf node_modules`
- [ ] Clear package-lock: `rm package-lock.json`
- [ ] Reinstall: `npm install`

### Camera not zooming
- [ ] Check browser console for JavaScript errors
- [ ] Verify models loaded successfully
- [ ] Try clicking different rows

## 🎉 Success!

If all checkboxes are marked, your POC is complete!

## Next Steps

Consider adding:
- [ ] Loading indicators
- [ ] Error handling UI
- [ ] Device detail panel
- [ ] Search/filter functionality
- [ ] More 3D models
- [ ] Custom lighting effects
- [ ] Model rotation controls
- [ ] Deploy to Firebase Hosting
