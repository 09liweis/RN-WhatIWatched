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