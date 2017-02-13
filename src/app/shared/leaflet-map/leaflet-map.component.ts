/**
 * Created by --- on 1/25/2017.
 */
import {Component, ViewChild} from "@angular/core";
import {NavigatorComponent} from "./navigator/navigator.component";
import {MarkerComponent} from "./marker/marker.component";
import {MapService} from "../services/map.service";
import {GeocodingService} from "../services/geocoding.service";
import {Location} from "../core/location.class";

export let currentLocPano = new Object();

@Component({
  selector: "leaflet-map",
  template: require<any>("./leaflet-map.component.html"),
  styles: [
    require<any>("./leaflet-map.component.less")
  ],
  providers: []

})

export class LeafletMapComponent  {

  @ViewChild(MarkerComponent) markerComponent: MarkerComponent;



  constructor(private mapService: MapService, private geocoder: GeocodingService) {
  //exports.currentLocPano = this.currentLocPano;


  }



  ngOnInit() {
    let map = L.map("map", {
      zoomControl: false,
      center: L.latLng(18.4663, -66.105721),
      zoom: 12,
      minZoom: 4,
      maxZoom: 19,
      layers: [L.tileLayer("http://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png", { attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>, Tiles courtesy of <a href="http://hot.openstreetmap.org/" target="_blank">Humanitarian OpenStreetMap Team</a>' })]
    });

    L.control.zoom({ position: "topright" }).addTo(map);
    L.control.layers(this.mapService.baseMaps).addTo(map);
    L.control.scale().addTo(map);

    this.mapService.map = map;
    /*
    this.geocoder.getCurrentLocation()
      .subscribe(
        location => map.panTo([location.latitude, location.longitude]),
        err => console.error(err)
      );*/

  }


  handleLocPanoUpdated(panoLocChanged) {
    // Handle the event
    console.log('kenininja:' + panoLocChanged);
    currentLocPano = panoLocChanged;
    console.log('evento:' + currentLocPano);

  }

  ngAfterViewInit() {
    this.markerComponent.Initialize();
  }


}

