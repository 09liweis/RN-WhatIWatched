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
    return cb(null, res.data);
  });
}
export function updateVisual(visual, cb) {
  get(getDoubanDetailAPI(visual.douban_id), (err, d) => {
    if (!d || err) return cb(err,null);
    if (rating = d.douban_rating) {
      visual.douban_rating = rating;
    }
    if (website = d.website) {
      visual.website = website;
    }
    if (episodes = d.episodes) {
      visual.episodes = episodes;
    }
    if (imdb_rating = d.imdb_rating) {
      visual.imdb_rating = imdb_rating;
    }
    if (imdb_id = d.imdb_id) {
      visual.imdb_id = imdb_id;
    }
    post(API_UPSERT, visual, (err, ret) => {
      return cb(err, d);
    });
  });
};