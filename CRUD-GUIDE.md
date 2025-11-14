# CRUD Operations Guide

## Overview

The application now supports full CRUD (Create, Read, Update, Delete) operations for devices.

## Features

### ✅ Create Device
- Click "Add Device" button in the table header
- Fill in the form:
  - **Name**: Device name (e.g., "Device Delta")
  - **Type**: Sensor, Controller, Monitor, or Actuator
  - **Status**: Active, Idle, or Offline
  - **Model Path**: Path to GLB file (e.g., "/models/device4.glb")
- Click "Add" to save

### ✅ Read Devices
- Devices automatically load from Firestore
- Real-time updates when data changes
- Displayed in Material table with status badges

### ✅ Update Device
- Click the edit icon (pencil) on any device row
- Modify any field in the dialog
- Click "Save" to update

### ✅ Delete Device
- Click the delete icon (trash) on any device row
- Confirm deletion
- Device removed from Firestore and 3D scene

## UI Components

### Table Actions
Each row has two action buttons:
- **Edit** (blue pencil icon) - Opens edit dialog
- **Delete** (red trash icon) - Deletes with confirmation

### Status Badges
Color-coded status indicators:
- **Active** - Green badge
- **Idle** - Orange badge
- **Offline** - Red badge

### Dialog Form
Material Design dialog with:
- Text input for name
- Dropdown for type
- Dropdown for status
- Text input for model path
- Cancel/Save buttons

## Code Structure

### Service Methods
```typescript
// device.service.ts
getDevices(): Observable<Device[]>
addDevice(device: Omit<Device, 'id'>): Promise<void>
updateDevice(id: string, device: Partial<Device>): Promise<void>
deleteDevice(id: string): Promise<void>
```

### Component Methods
```typescript
// device-viewer.component.ts
openAddDialog(): Promise<void>
openEditDialog(device: Device): Promise<void>
deleteDevice(device: Device): Promise<void>
```

## Firestore Security Rules

For development, use these rules:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /devices/{document=**} {
      allow read, write: if true;
    }
  }
}
```

⚠️ **Important**: Update security rules for production with proper authentication!

## Usage Examples

### Adding a New Device
1. Click "Add Device"
2. Enter:
   - Name: "Temperature Sensor"
   - Type: "Sensor"
   - Status: "Active"
   - Model Path: "/models/sensor.glb"
3. Click "Add"
4. Device appears in table and 3D scene

### Editing a Device
1. Click edit icon on device row
2. Change status from "Active" to "Idle"
3. Click "Save"
4. Status badge updates immediately

### Deleting a Device
1. Click delete icon on device row
2. Confirm deletion
3. Device removed from table and 3D scene

## Validation

Form validation ensures:
- All fields are required
- Name cannot be empty
- Type must be selected
- Status must be selected
- Model path must be provided

## Real-time Updates

Changes are reflected immediately:
- Add device → Appears in table instantly
- Edit device → Updates in real-time
- Delete device → Removes from view
- 3D models sync with data changes

## Error Handling

The app handles:
- Failed Firestore operations
- Missing 3D models (fallback cube)
- Network errors
- Invalid data

## Tips

1. **Model Paths**: Ensure GLB files exist before adding devices
2. **Unique Names**: Use descriptive names for easy identification
3. **Status Updates**: Change status to track device states
4. **Bulk Operations**: Add multiple devices quickly with the form
5. **Testing**: Try all CRUD operations to verify Firestore connection

## Next Steps

- Add search/filter functionality
- Implement batch operations
- Add device categories
- Export device data
- Import devices from CSV
- Add device history/logs
