/**
 * Created by --- on 1/25/2017.
 */
import {Component,Output,EventEmitter,AfterViewInit,Input} from "@angular/core";
import {MapService} from "../../services/map.service";
import {Map, MouseEvent, Marker} from "leaflet";
import featureGroup = L.featureGroup;


@Component({
  selector: "marker",
  template: require<any>("./marker.component.html"),
  styles: [
    require<any>("./marker.component.less")
  ],
  providers: []
})
export class MarkerComponent implements AfterViewInit{

  @Output() locpano = new EventEmitter();
  editing: boolean;
  removing: boolean;
  markerCount: number;
  marker:any;
  pos = new Object();

  constructor(private mapService: MapService) {
    this.editing = false;
    this.removing = false;
    this.markerCount = 0;
    this.marker;

  }

  ngAfterViewInit() {
    this.mapService.disableMouseEvent("add-marker");
   // this.mapService.disableMouseEvent("remove-marker");

  }


  Initialize() {

    this.mapService.map.on("click", (e: MouseEvent) =>
    {

      //if (this.editing) {
        if(typeof(this.marker)=== 'undefined' ){
         this.marker = L.marker(e.latlng,  {

          icon: L.icon({
            iconUrl: require<any>("../../../../../node_modules/leaflet/dist/images/marker-icon.png"),
            shadowUrl: require<any>("../../../../../node_modules/leaflet/dist/images/marker-shadow.png")
          }),
          draggable: true,

        })
          .bindPopup("Marker #" + (this.markerCount + 1).toString(), {
            offset: L.point(12, 6)
          })
          .addTo(this.mapService.map)
          .openPopup();

        this.markerCount += 1;

        this.marker.on("click", (event: MouseEvent) => {
          if (this.removing) {
            this.mapService.map.removeLayer(this.marker);
            this.markerCount -= 1;
          }
        });

      }else{
          this.marker.setLatLng(e.latlng);
        }
        this.pos = {lat: e.latlng.lat, lng: e.latlng.lng };
        console.log(this.pos);
        this.locpano.emit(e.latlng);

    });

  }

  toggleEditing() {
    this.editing = !this.editing;

    if (this.editing && this.removing) {
      this.removing = false;
    }
  }

/*
  toggleRemoving() {
    this.removing = !this.removing;

    if (this.editing && this.removing) {
      this.editing = false;
    }
  }*/
}
