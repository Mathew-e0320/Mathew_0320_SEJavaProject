import Axios from 'axios';
import {apiKey, placeType} from '../res/constants';

export async function nearBy(text) {
  let data = {data: {results: []}};
  const res = await Axios.get(
    'https://maps.googleapis.com/maps/api/place/findplacefromtext/json?key=' +
      apiKey +
      '&input=' +
      text +
      '&inputtype=textquery&fields=geometry',
  ).catch((e) => {});
  if (res)
    if (res.data) {
      const lat = res.data.candidates[0].geometry.location.lat;
      const lng = res.data.candidates[0].geometry.location.lng;
      data = await Axios.get(
        'https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=' +
          lat +
          ',' +
          lng +
          '&radius=' +
          5000 +
          '&type=' +
          placeType +
          '&key=' +
          apiKey,
      ).catch((e) => {});
    }
  return data.data.results;
}
