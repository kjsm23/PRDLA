/**
 * Created by --- on 1/17/2017.
 */
import {Profile} from './profile.model';

export class Photo{
  slug:string;
  title:string = '';
  description:string = '';
  body: string = '';
  createdAt:string;
  updatedAt:string;
  favorited:boolean;
  favoritesCount:number;
  author:Profile;
  image:string;
  lat: number;
  lng:number;

}
