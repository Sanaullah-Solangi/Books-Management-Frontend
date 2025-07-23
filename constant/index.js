const DEV_URL = import.meta.env.VITE_DEV_URL;
const PROD_URL = import.meta.env.VITE_PROD_URL;

export const BASE_URL = DEV_URL;

export const ApiRoutes = {
  user: {
    login: BASE_URL + "auth/login",
    register: BASE_URL + "auth/register",
    myInfo: BASE_URL + "user/my-info",
  },
  books: {
    getBooks: BASE_URL + "books",
  },
};
