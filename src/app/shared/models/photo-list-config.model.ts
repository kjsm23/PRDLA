/**
 * Created by --- on 1/21/2017.
 */
export class PhotoListConfig {
  type: string = 'all';

  filters: {
    tag?: string,
    author?: string,
    image?: string,
    favorited?: string,
    limit?: number,
    offset?: number
  } = {};
}
