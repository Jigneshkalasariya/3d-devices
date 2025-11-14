# Getting Started with Angular 3D Devices POC

## What You Have

A complete Angular 20+ application with:
- ✅ Standalone components architecture
- ✅ Firebase & Firestore integration ready
- ✅ Three.js 3D rendering setup
- ✅ Angular Material table
- ✅ Interactive camera zoom functionality
- ✅ TypeScript 5.8 with strict mode

## Quick Start (3 Steps)

### 1. Configure Firebase (2 minutes)

Edit `src/environments/environment.ts` and add your Firebase credentials:

```typescript
export const environment = {
  production: false,
  firebase: {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_PROJECT_ID.appspot.com",
    messagingSenderId: "YOUR_SENDER_ID",
    appId: "YOUR_APP_ID"
  }
};
```

Get these from: Firebase Console → Project Settings → General → Your apps

### 2. Add Firestore Data (1 minute)

In Firebase Console → Firestore Database, create collection `devices` with 3 documents:

```
Document 1:
- name: "Device Alpha"
- type: "Sensor"
- status: "Active"
- modelPath: "/models/device1.glb"

Document 2:
- name: "Device Beta"
- type: "Controller"
- status: "Idle"
- modelPath: "/models/device2.glb"

Document 3:
- name: "Device Gamma"
- type: "Monitor"
- status: "Active"
- modelPath: "/models/device3.glb"
```

### 3. Add 3D Models (1 minute)

Download 3 GLB files and place them in `public/models/`:
- device1.glb
- device2.glb
- device3.glb

**Where to get models:** https://poly.pizza/ or https://sketchfab.com/

## Run the App

```bash
npm start
```

Open http://localhost:4200

## What to Expect

- A table on the left showing 3 devices from Firestore
- A 3D canvas on the right showing 3 models
- Click any table row → camera smoothly zooms to that model

## Project Structure

```
src/app/
├── components/
│   └── device-viewer/          # Main component
│       ├── device-viewer.component.ts
│       ├── device-viewer.component.html
│       └── device-viewer.component.scss
├── services/
│   └── device.service.ts       # Firestore service
├── models/
│   └── device.model.ts         # TypeScript interface
├── app.component.ts            # Root component
└── app.config.ts               # Firebase config
```

## Key Features

### Real-time Firestore
The app automatically updates when Firestore data changes.

### CRUD Operations
- ✅ **Create** - Add new devices with dialog form
- ✅ **Read** - Real-time device list from Firestore
- ✅ **Update** - Edit device properties
- ✅ **Delete** - Remove devices with confirmation

### Three.js Integration
- Loads GLB models
- Ambient + directional lighting
- Responsive canvas
- Smooth camera animations

### Interactive Table
- Angular Material design
- Click rows to focus 3D models
- Edit/Delete buttons per row
- Status badges with colors
- Hover effects

## Troubleshooting

**No data in table?**
- Check Firebase config in environment.ts
- Verify Firestore collection exists
- Check browser console for errors

**Models not showing?**
- Verify GLB files are in public/models/
- Check file names match exactly
- Try smaller files (< 2MB)

**Build errors?**
```bash
rm -rf node_modules package-lock.json
npm install
```

## Next Steps

- Customize the 3D scene (lighting, camera position)
- Add more device properties
- Implement search/filter
- Add device detail panel
- Deploy to Firebase Hosting

## Documentation

- `README.md` - Full project overview
- `SETUP-CHECKLIST.md` - Detailed setup steps
- `3D-MODELS-GUIDE.md` - Where to find models
- `firestore-setup.md` - Firestore configuration

## Support

Check the browser console for errors and refer to the documentation files for detailed guidance.
