import wretch           from 'wretch'
import QueryStringAddon from 'wretch/addons/queryString';





const DEV_API        = import.meta.env.VITE_DEV_API_URL ?? 'http://localhost:3000';
const PRODUCTION_API = import.meta.env.VITE_PRODUCTION_API_URL

export const wretchInstance = wretch(import.meta.env.DEV ? DEV_API : PRODUCTION_API, {
    cache      : 'no-cache',
    credentials: 'include',
    priority   : 'high',
    mode       : 'cors',
}).addon(QueryStringAddon)
  .catcher(404, (error) => {
      console.error('Resource not found:', error.message);
      throw error;
  })
  .catcher(500, (error) => {
      console.error('Server error:', error.message);
      throw error;
  })
  .catcher(401, (error) => {
      console.error('Unauthorized - redirecting to login');
      window.location.replace('/auth');
      throw error;
  });
