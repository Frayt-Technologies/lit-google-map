import {LitElement} from 'lit';
import {customElement, property} from 'lit/decorators.js';
import {Shape} from './shape';

@customElement('lit-google-map-polyline')
export class LitGoogleMapPolyline extends LitElement implements Shape {
    @property({type: String, attribute: 'encoded-path'})
    encodedPath: string = '';

    @property({type: String, attribute: 'stroke-color'})
    strokeColor: string = '#FF0000';

    @property({type: Number, attribute: 'stroke-opacity'})
    strokeOpacity: number = 0.8;

    @property({type: Number, attribute: 'stroke-weight'})
    strokeWeight: number = 2;

    map: google.maps.Map = null;
    polyline: google.maps.Polyline = null;

    attachToMap(map: google.maps.Map): void {
        this.map = map;
        this.mapChanged();
    }

    mapChanged() {
        // Polyline will be rebuilt, so disconnect existing one from old map and listeners.
        if (this.polyline) {
            this.polyline.setMap(null);
            google.maps.event.clearInstanceListeners(this.polyline);
        }

        if (this.map && this.map instanceof google.maps.Map) {
            this.mapReady();
        }
    }

    mapReady() {
        this.polyline = new google.maps.Polyline({
            map: this.map,
            strokeColor: this.strokeColor,
            strokeOpacity: this.strokeOpacity,
            strokeWeight: this.strokeWeight,
            path: google.maps.geometry.encoding.decodePath(this.encodedPath)
        });
    }
}
