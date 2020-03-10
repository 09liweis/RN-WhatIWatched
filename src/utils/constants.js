const API_DOUBAN_KEY = '?apikey=0df993c66c0c636e29ecbb5344252a4a';
const API = 'https://what-i-watched.herokuapp.com/api/';
const API_RANDOM = 'API' + 'visual_random/';
const API_LIST = API + 'visuals/';
const API_DETAIL = API + 'visual/';
const API_INCREASE_EPISODE = API_DETAIL +'increase_episode?id=';
const API_SEARCH = API + 'search?keyword=';
const API_GET_IMDB_ID = API + 'visuals/get_imdb_id?douban_id='
const API_DOUBAN_DETAIL = 'https://api.douban.com/v2/movie/subject/{id}'+API_DOUBAN_KEY;
const API_DOUBAN_DETAIL_PHOTO = 'https://api.douban.com/v2/movie/subject/{id}/photos'+API_DOUBAN_KEY;
const API_DOUBAN_USBO = 'https://api.douban.com/v2/movie/us_box'+API_DOUBAN_KEY;
const API_MAOYAN = 'https://piaofang.maoyan.com/second-box';
const API_MAOYAN_DETAIL = 'http://m.maoyan.com/ajax/detailmovie?movieId={id}'
export {
  API,
  API_LIST,
  API_RANDOM,
  API_DETAIL,
  API_SEARCH,
  API_INCREASE_EPISODE,
  API_DOUBAN_DETAIL,
  API_DOUBAN_DETAIL_PHOTO,
  API_DOUBAN_USBO,
  API_MAOYAN,
  API_MAOYAN_DETAIL,
  API_GET_IMDB_ID
}