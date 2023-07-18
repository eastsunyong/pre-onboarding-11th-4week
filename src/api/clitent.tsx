import axios from 'axios';

const getData = async (keyword: string) => {
  if ('caches' in window) {
    const cacheStorage = await caches.open('sick');
    const cachedResponse = await cacheStorage.match(keyword);
    if (!cachedResponse) {
      console.info('calling api');
      const response = await axios.get(`http://localhost:4000/sick?q=${keyword}`)
      const store = response.data;
      cacheStorage.put(keyword, new Response(JSON.stringify(store)));
      return store;
    }
    const cached = await cachedResponse?.json();
    return cached;
  }
  return [];
};
export default getData;
