const API_DOUBAN_KEY = '?apikey=0df993c66c0c636e29ecbb5344252a4a';
const API = 'https://what-i-watched.herokuapp.com/api/';
const API_STATS = API + 'stats';
const API_RANDOM = API + 'random_visual/';
const API_LIST = API + 'visuals/';
const API_DETAIL = API + 'visual/';
const API_INCREASE_EPISODE = API_DETAIL +'increase_episode?id=';
const API_SEARCH = API + 'search?keyword=';
const API_GET_IMDB_ID = API + 'visuals/get_imdb_id?douban_id='
const API_IMDB_RATING = API+'visuals/get_imdb_rating?imdb_id='
const API_UPSERT = API+'visual/submit';

// const API_DOUBAN = 'https://api.douban.com/v2/movie/';
// const API_DOUBAN_DETAIL = API_DOUBAN+'subject/{id}'+API_DOUBAN_KEY;
// const API_DOUBAN_DETAIL_PHOTO = API_DOUBAN+'subject/{id}/photos'+API_DOUBAN_KEY;
// const API_DOUBAN_DETAIL_REVIEWS = API_DOUBAN+'subject/{id}/reviews'+API_DOUBAN_KEY;
const API_DOUBAN = 'https://samliweisen.herokuapp.com/api/visuals/';
const API_DOUBAN_DETAIL = API_DOUBAN + 'summary'

const API_DOUBAN_USBO = API_DOUBAN+'us_box'+API_DOUBAN_KEY;
const API_DOUBAN_INTHEATRE = API_DOUBAN+'in_theaters'+API_DOUBAN_KEY;
const API_DOUBAN_TOP250 = API_DOUBAN+'top250'+API_DOUBAN_KEY;
const API_DOUBAN_UPCOMING = API_DOUBAN+'coming_soon?apikey=0b2bdeda43b5688921839c8ecb20399b'

const API_MAOYAN = 'https://piaofang.maoyan.com/second-box';
const API_MAOYAN_DETAIL = 'http://m.maoyan.com/ajax/detailmovie?movieId={id}'

function getImdbRatingAPI(id) {
  return API_IMDB_RATING + id;
}

export {
  API,
  API_STATS,
  API_LIST,
  API_RANDOM,
  API_DETAIL,
  API_SEARCH,
  API_INCREASE_EPISODE,
  API_DOUBAN_DETAIL,
  getImdbRatingAPI,
  // API_DOUBAN_DETAIL_PHOTO,
  // API_DOUBAN_DETAIL_REVIEWS,
  API_DOUBAN_USBO,
  API_DOUBAN_UPCOMING,
  API_DOUBAN_INTHEATRE,
  API_DOUBAN_TOP250,
  API_MAOYAN,
  API_MAOYAN_DETAIL,
  API_GET_IMDB_ID,
  API_UPSERT
}