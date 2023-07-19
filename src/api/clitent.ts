import axios from 'axios';

const getData = async (keyword: string) => {
  if ('caches' in window) {
    const cacheStorage = await caches.open('sick');
    const cachedResponse = await cacheStorage.match(keyword);
    if (!cachedResponse) {
      try {
        const response = await axios.get(`http://localhost:4000/sick?q=${keyword}`);
        console.info('calling api');
        const store = response.data;
        cacheStorage.put(keyword, new Response(JSON.stringify(store)));
        return store;
      } catch (err) {
        return console.log(err);
      }
    }
    const cached = await cachedResponse?.json();

    return cached;
  }
  return [];
};
export default getData;
