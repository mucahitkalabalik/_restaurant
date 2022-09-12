import { createStore } from "vuex";
import createPersistedState from "vuex-persistedstate";
import SecureLS from "secure-ls";

var ls = new SecureLS({ isCompression: false });

const store = createStore({
  plugins: [
    createPersistedState({
      key: "user",
      storage: {
        getItem: (key) => ls.get(key),
        setItem: (key, value) => ls.set(key, value),
        removeItem: (key) => ls.remove(key),
      },
    }),
  ],
  state: {
    user: null,
    token: null,
    refreshToken: null,
    restaurantList:null,
    itemList:null
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
    },
    setToken(state, { token, refreshToken }) {
      state.token = token;
      state.refreshToken = refreshToken;
    },
  },
  getters: {
    _isAuthenticated: (state) => state.user !== null,
    _getCurrentUser(state) {
      const user = state.user;
      delete user?.password;
      return user;
    },
    refreshToken(state) {
      return state.refreshToken;
    },
    token(state) {
      return state.token;
    },
    restaurantList(state) {
      return state.restaurantList;
    },
    itemList(state) {
      return state.itemList;
    },
  },
});

export default store;
