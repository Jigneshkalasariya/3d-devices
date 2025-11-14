import { Component } from '@angular/core';
import { DeviceViewerComponent } from './components/device-viewer/device-viewer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [DeviceViewerComponent],
  template: '<app-device-viewer></app-device-viewer>',
  styles: []
})
export class AppComponent {
  title = 'angular-3d-devices';
}
