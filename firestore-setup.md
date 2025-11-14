# Firestore Setup Guide

## Option 1: Manual Setup (Firebase Console)

1. Go to [Firebase Console](https://console.firebase.google.com)
2. Select your project
3. Navigate to Firestore Database
4. Click "Start collection"
5. Collection ID: `devices`
6. Add three documents with auto-generated IDs:

### Document 1
```
name: "Device Alpha"
type: "Sensor"
status: "Active"
modelPath: "/models/device1.glb"
```

### Document 2
```
name: "Device Beta"
type: "Controller"
status: "Idle"
modelPath: "/models/device2.glb"
```

### Document 3
```
name: "Device Gamma"
type: "Monitor"
status: "Active"
modelPath: "/models/device3.glb"
```

## Option 2: Programmatic Setup

Create a file `scripts/populate-firestore.ts`:

```typescript
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const devices = [
  {
    name: "Device Alpha",
    type: "Sensor",
    status: "Active",
    modelPath: "/models/device1.glb"
  },
  {
    name: "Device Beta",
    type: "Controller",
    status: "Idle",
    modelPath: "/models/device2.glb"
  },
  {
    name: "Device Gamma",
    type: "Monitor",
    status: "Active",
    modelPath: "/models/device3.glb"
  }
];

async function populateFirestore() {
  try {
    for (const device of devices) {
      const docRef = await addDoc(collection(db, 'devices'), device);
      console.log(`Document written with ID: ${docRef.id}`);
    }
    console.log('Firestore populated successfully!');
  } catch (error) {
    console.error('Error adding documents: ', error);
  }
}

populateFirestore();
```

Run with: `npx ts-node scripts/populate-firestore.ts`

## Firestore Security Rules

For development, use these rules (⚠️ NOT for production):

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /devices/{document=**} {
      allow read, write: if true;
    }
  }
}
```

For production, implement proper authentication and authorization rules.
