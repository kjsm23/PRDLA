/**
 * Created by --- on 1/25/2017.
 */
import {ILatLng} from "./latLng.interface";
import {LatLngBounds} from "leaflet";

export class Location implements ILatLng {
  latitude: number;
  longitude: number;
  address: string;
  viewBounds: LatLngBounds;
}
