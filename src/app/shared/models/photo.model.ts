/**
 * Created by --- on 1/17/2017.
 */
import {Profile} from './profile.model';

export class Photo{
  slug:string;
  title:string;
  description:string;
  pathPano:string ;
  lat: number;
  lng: number;
  body: string = '';
  hotspot: [{}];
  transition: string;
  createdAt:string;
  updatedAt:string;
  favorited:boolean;
  favoritesCount:number;
  author:Profile;
  image:string;



}
