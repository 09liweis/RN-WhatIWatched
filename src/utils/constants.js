const API = 'https://what-i-watched.herokuapp.com/api/';
const API_LIST = API + 'visuals/';
const API_DETAIL = API + 'visual/';
const API_INCREASE_EPISODE = API_DETAIL +'increase_episode?id=';
const API_SEARCH = API + 'search?keyword=';
const API_DOUBAN_DETAIL = 'https://api.douban.com/v2/movie/subject/{id}?apikey=0df993c66c0c636e29ecbb5344252a4a';
export {
  API,
  API_LIST,
  API_DETAIL,
  API_SEARCH,
  API_INCREASE_EPISODE,
  API_DOUBAN_DETAIL
}