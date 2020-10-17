import SafeCity from '../models/SafeCity';
import imagesView from './images_view';

export default {
  render(city: SafeCity) {
    return {
      id: city.id,
      name: city.name,
      latitude: city.latitude,
      longitude: city.longitude,
      about: city.about,
      when_hours: city.when_hours,
      reported_crime: city.reported_crime,
      images: imagesView.renderMany(city.images)
    }
  },

  renderMany(cities: SafeCity[]) {
    return cities.map(city => this.render(city));
  }
};