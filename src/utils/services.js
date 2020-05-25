import {getDoubanDetailAPI, getImdbRatingAPI, API_UPSERT} from './constants';
import axios from 'axios';
import qs from 'qs'

export function get(url, cb) {
  fetch(url)
  .then(res => res.json())
  .then((res) => {
    return cb(null, res);
  })
  .catch((err) => {
    return cb(err, null);
  })
}
export function post(url, data, cb) {
  // const params = new URLSearchParams();
  // for (let k in data) {
  //   if (data[k]) {
  //     params.append(k,data[k]);
  //   }
  // }
  // // console.log(params.toString());
  // fetch(url, {method:'POST',body:params}).then((res) => {
  //   console.log(res);
  //   return cb(null, res);
  // }).catch((err) => {
  //   console.log(err);
  //   return cb(err, null);
  // });
  axios({
    method: 'post',
    headers:{
      'accept': 'application/json',
      'Content-Type':'application/x-www-form-urlencoded'
    },
    url,
    data: qs.stringify(data)//for django request post issue
  }).then(res => {
    return cb(null, res);
  });
}
export function updateVisual(visual, cb) {
  get(getDoubanDetailAPI(visual.douban_id), (err, d) => {
    if (rating = d.rating.average) {
      visual.douban_rating = rating;
    }
    if (release_date = d.pubdate) {
      visual.release_date = release_date;
    }
    if (imdb_id = visual.imdb_id) {
      get(getImdbRatingAPI(imdb_id), (err, imdb) => {
        if (imdb_rating = imdb.imdb_rating) {
          visual.imdb_rating = imdb_rating;
        }
        post(API_UPSERT, visual, (err, ret) => {
          return cb(err, ret);
        });
      });
    }
  });
};