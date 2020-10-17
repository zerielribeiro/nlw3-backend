import Orphanege from '../models/Orphanege';
import imageView from './images_View';

export default{
    render( orphanages: Orphanege){
      return {
  id: orphanages.id,
  name: orphanages.name,
  latitude: orphanages.latitude,
  longitude: orphanages.longitude,
  about: orphanages.about,
  instructions: orphanages.instructions,
  opening_hours: orphanages.opening_hours,
  open_on_weekends: orphanages.open_on_weekends,

  images: imageView.renderMany(orphanages.images)
    };
  },

    renderMany( orphanages: Orphanege[]) {
        return orphanages.map(Orphanege => this.render(Orphanege))
    }


};