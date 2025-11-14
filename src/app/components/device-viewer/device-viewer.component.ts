import { Component, OnInit, OnDestroy, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { DeviceService } from '../../services/device.service';
import { Device } from '../../models/device.model';

@Component({
  selector: 'app-device-viewer',
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule,
    MatTableModule, 
    MatCardModule, 
    MatButtonModule, 
    MatIconModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule
  ],
  templateUrl: './device-viewer.component.html',
  styleUrls: ['./device-viewer.component.scss']
})
export class DeviceViewerComponent implements OnInit, OnDestroy {
  @ViewChild('canvas', { static: true }) canvasRef!: ElementRef<HTMLCanvasElement>;
  
  devices: Device[] = [];
  displayedColumns: string[] = ['name', 'type', 'status', 'actions'];
  
  private scene!: THREE.Scene;
  private camera!: THREE.PerspectiveCamera;
  private renderer!: THREE.WebGLRenderer;
  private models: THREE.Object3D[] = [];
  private animationId: number = 0;

  constructor(
    private deviceService: DeviceService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.initThreeJS();
    this.loadDevices();
  }

  ngOnDestroy(): void {
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
    }
    this.renderer?.dispose();
  }

  private initThreeJS(): void {
    const canvas = this.canvasRef.nativeElement;
    
    // Scene
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0x1a1a1a);
    
    // Camera
    this.camera = new THREE.PerspectiveCamera(
      75,
      canvas.clientWidth / canvas.clientHeight,
      0.1,
      1000
    );
    this.camera.position.set(0, 2, 8);
    this.camera.lookAt(0, 0, 0);
    
    // Renderer
    this.renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
    this.renderer.setSize(canvas.clientWidth, canvas.clientHeight);
    this.renderer.setPixelRatio(window.devicePixelRatio);
    
    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    this.scene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(5, 10, 5);
    this.scene.add(directionalLight);
    
    // Handle window resize
    window.addEventListener('resize', () => this.onWindowResize());
    
    this.animate();
  }

  private loadDevices(): void {
    this.deviceService.getDevices().subscribe(devices => {
      this.devices = devices;
      this.loadModels();
    });
  }

  private loadModels(): void {
    const loader = new GLTFLoader();
    const positions = [
      new THREE.Vector3(-3, 0, 0),
      new THREE.Vector3(0, 0, 0),
      new THREE.Vector3(3, 0, 0)
    ];

    this.devices.forEach((device, index) => {
      loader.load(
        device.modelPath,
        (gltf) => {
          const model = gltf.scene;
          model.position.copy(positions[index]);
          model.userData = { deviceId: device.id };
          this.scene.add(model);
          this.models.push(model);
        },
        undefined,
        (error) => {
          console.error(`Error loading model for ${device.name}:`, error);
          // Create a fallback cube if model fails to load
          const geometry = new THREE.BoxGeometry(1, 1, 1);
          const material = new THREE.MeshStandardMaterial({ color: 0x00ff00 });
          const cube = new THREE.Mesh(geometry, material);
          cube.position.copy(positions[index]);
          cube.userData = { deviceId: device.id };
          this.scene.add(cube);
          this.models.push(cube);
        }
      );
    });
  }

  private animate(): void {
    this.animationId = requestAnimationFrame(() => this.animate());
    this.renderer.render(this.scene, this.camera);
  }

  private onWindowResize(): void {
    const canvas = this.canvasRef.nativeElement;
    this.camera.aspect = canvas.clientWidth / canvas.clientHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(canvas.clientWidth, canvas.clientHeight);
  }

  onRowClick(device: Device): void {
    const model = this.models.find(m => m.userData['deviceId'] === device.id);
    if (model) {
      this.focusOnModel(model);
    }
  }

  private focusOnModel(model: THREE.Object3D): void {
    const targetPosition = model.position.clone();
    targetPosition.z += 3;
    targetPosition.y += 1;
    
    this.animateCameraTo(targetPosition, model.position);
  }

  private animateCameraTo(position: THREE.Vector3, lookAt: THREE.Vector3): void {
    const startPosition = this.camera.position.clone();
    const startLookAt = new THREE.Vector3(0, 0, 0);
    const duration = 1000;
    const startTime = Date.now();

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = this.easeInOutCubic(progress);

      this.camera.position.lerpVectors(startPosition, position, eased);
      const currentLookAt = new THREE.Vector3().lerpVectors(startLookAt, lookAt, eased);
      this.camera.lookAt(currentLookAt);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    animate();
  }

  private easeInOutCubic(t: number): number {
    return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
  }

  async openAddDialog(): Promise<void> {
    const dialogRef = this.dialog.open(DeviceFormDialog, {
      width: '400px',
      data: { mode: 'add' }
    });

    const result = await dialogRef.afterClosed().toPromise();
    if (result) {
      await this.deviceService.addDevice(result);
    }
  }

  async openEditDialog(device: Device): Promise<void> {
    const dialogRef = this.dialog.open(DeviceFormDialog, {
      width: '400px',
      data: { mode: 'edit', device: { ...device } }
    });

    const result = await dialogRef.afterClosed().toPromise();
    if (result) {
      await this.deviceService.updateDevice(device.id, result);
    }
  }

  async deleteDevice(device: Device): Promise<void> {
    if (confirm(`Delete ${device.name}?`)) {
      await this.deviceService.deleteDevice(device.id);
      const model = this.models.find(m => m.userData['deviceId'] === device.id);
      if (model) {
        this.scene.remove(model);
        this.models = this.models.filter(m => m !== model);
      }
    }
  }
}

@Component({
  selector: 'device-form-dialog',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule
  ],
  template: `
    <h2 mat-dialog-title>{{ data.mode === 'add' ? 'Add Device' : 'Edit Device' }}</h2>
    <mat-dialog-content>
      <mat-form-field appearance="outline" style="width: 100%; margin-bottom: 16px;margin-top: 16px;">
        <mat-label>Name</mat-label>
        <input matInput [(ngModel)]="formData.name" required>
      </mat-form-field>

      <mat-form-field appearance="outline" style="width: 100%; margin-bottom: 16px;">
        <mat-label>Type</mat-label>
        <mat-select [(ngModel)]="formData.type" required>
          <mat-option value="Sensor">Sensor</mat-option>
          <mat-option value="Controller">Controller</mat-option>
          <mat-option value="Monitor">Monitor</mat-option>
          <mat-option value="Actuator">Actuator</mat-option>
        </mat-select>
      </mat-form-field>

      <mat-form-field appearance="outline" style="width: 100%; margin-bottom: 16px;">
        <mat-label>Status</mat-label>
        <mat-select [(ngModel)]="formData.status" required>
          <mat-option value="Active">Active</mat-option>
          <mat-option value="Idle">Idle</mat-option>
          <mat-option value="Offline">Offline</mat-option>
        </mat-select>
      </mat-form-field>

      <mat-form-field appearance="outline" style="width: 100%;">
        <mat-label>Model Path</mat-label>
        <input matInput [(ngModel)]="formData.modelPath" placeholder="/models/device.glb" required>
      </mat-form-field>
    </mat-dialog-content>
    <mat-dialog-actions align="end">
      <button mat-button (click)="onCancel()">Cancel</button>
      <button mat-raised-button color="primary" (click)="onSave()" [disabled]="!isValid()">
        {{ data.mode === 'add' ? 'Add' : 'Save' }}
      </button>
    </mat-dialog-actions>
  `
})
export class DeviceFormDialog {
  formData: any = {
    name: '',
    type: 'Sensor',
    status: 'Active',
    modelPath: '/models/device1.glb'
  };

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<DeviceFormDialog>
  ) {
    if (data.mode === 'edit' && data.device) {
      this.formData = { ...data.device };
    }
  }

  isValid(): boolean {
    return !!(this.formData.name && this.formData.type && this.formData.status && this.formData.modelPath);
  }

  onSave(): void {
    if (this.isValid()) {
      const { id, ...deviceData } = this.formData;
      this.dialogRef.close(deviceData);
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}

import { Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
