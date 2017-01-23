/**
 * Created by --- on 1/17/2017.
 */
import {Profile} from './profile.model';

export class Photo{
  slug:string;
  image:string;
  title:string = '';
  body: string = '';
  createdAt:string;
  updatedAt:string;
  favorited:boolean;
  favoritesCount:number;
  description:string = '';
  author:Profile;

}
