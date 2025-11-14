# 3D Models Guide

## Where to Get Free GLB Models

### 1. Sketchfab (Recommended)
- URL: https://sketchfab.com/
- Filter by "Downloadable" and select "glTF" format
- Look for CC-licensed models
- Great for tech devices, electronics, and industrial equipment

### 2. Poly Pizza
- URL: https://poly.pizza/
- Free, open-source 3D models
- Simple download process
- Good selection of low-poly models

### 3. Quaternius
- URL: https://quaternius.com/
- Free CC0 models
- Great for prototyping
- Easy to download

### 4. Free3D
- URL: https://free3d.com/
- Filter by GLB/GLTF format
- Mix of free and paid models

## Quick Setup

1. Download 3 GLB files (any 3D objects will work for the POC)
2. Rename them to:
   - `device1.glb`
   - `device2.glb`
   - `device3.glb`
3. Place them in the `public/models/` directory

## Creating Simple Test Models

If you want to create simple test models quickly:

### Using Blender (Free)
1. Download Blender: https://www.blender.org/
2. Create simple objects (cube, sphere, cylinder)
3. Export as GLB: File > Export > glTF 2.0 (.glb/.gltf)
4. Choose GLB format

### Using Online Tools
- **Vectary**: https://www.vectary.com/ (online 3D modeling)
- **Tinkercad**: https://www.tinkercad.com/ (simple 3D design)

## Model Requirements

- Format: GLB (binary glTF)
- Size: Keep under 5MB for good performance
- Complexity: Low to medium poly count (< 50k triangles) for smooth performance
- Textures: Embedded in GLB file

## Testing Your Models

You can preview GLB files before using them:
- https://gltf-viewer.donmccurdy.com/
- https://sandbox.babylonjs.com/

## Example Model Search Terms

For device-themed models, search for:
- "IoT device"
- "sensor"
- "electronic device"
- "smart device"
- "controller"
- "monitor"
- "tech gadget"
