import { Injectable } from '@angular/core';
import { Firestore, collection, collectionData, addDoc, updateDoc, deleteDoc, doc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Device } from '../models/device.model';

@Injectable({
  providedIn: 'root'
})
export class DeviceService {
  constructor(private firestore: Firestore) {}

  getDevices(): Observable<Device[]> {
    const devicesCollection = collection(this.firestore, 'devices');
    return collectionData(devicesCollection, { idField: 'id' }) as Observable<Device[]>;
  }

  async addDevice(device: Omit<Device, 'id'>): Promise<void> {
    const devicesCollection = collection(this.firestore, 'devices');
    await addDoc(devicesCollection, device);
  }

  async updateDevice(id: string, device: Partial<Device>): Promise<void> {
    const deviceDoc = doc(this.firestore, 'devices', id);
    await updateDoc(deviceDoc, device);
  }

  async deleteDevice(id: string): Promise<void> {
    const deviceDoc = doc(this.firestore, 'devices', id);
    await deleteDoc(deviceDoc);
  }
}
