import {
  Component,
  Input,
  ElementRef,
  ViewChild,
  HostListener,
  AfterViewInit
} from '@angular/core';

import * as L from 'leaflet';

@Component({
  selector: 'tr-tile-viewer',
  template:
  `
    <div #container id="tileViewer" style="width: 100%;"></div>
  `,
  styleUrls: []
})
export class TileViewerComponent implements AfterViewInit {
  @Input() url: string;
  @Input() maxZoomLevel: number;
  @ViewChild('container', { static: true }) container: ElementRef;
  @HostListener('window:resize', ['$event'])
  onResize($event) {
    this.fitViewPort();
  }

  ngAfterViewInit() {
    this.fitViewPort();
    this.showViewer();
  }

  private fitViewPort() {
    const rect = this.container.nativeElement.getBoundingClientRect();
    const viewPortHeight = window.innerHeight;
    this.container.nativeElement.style.height = (viewPortHeight - rect.top - 35) + 'px';
  }

  private showViewer() {

    const viewer = L.map('tileViewer',  {
      crs: L.CRS.Simple,
      attributionControl: false
    });

    const A = viewer.unproject([0, 0], 0);
    const C = viewer.unproject([256, 256], 0);

    viewer.fitBounds(L.latLngBounds(A, C), {});

    const tileLayerOptions = {
      minZoom: 0,
      maxZoom: this.maxZoomLevel + 1,
      maxNativeZoom: this.maxZoomLevel,
      bounds: L.latLngBounds(A, C)
    };

    L.tileLayer(
      this.url,
      tileLayerOptions
    )
    .addTo(viewer);
  }


}
