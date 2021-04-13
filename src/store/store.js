import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);
export const store = new Vuex.Store({
  state: {
    //globally selected id of the movie
    selectedId: 0,
    //whitch tab is active
    selectedTab: "",
    //the api response is stored here
    apiResponseMovies: [],
  },
  getters: {
    getSelectedId: (state) => {
      return state.selectedId;
    },
    getSelectedTab: (state) => {
      return state.selectedTab;
    },
    getResponseMovies: (state) => {
      return state.apiResponseMovies;
    },
  },
  mutations: {
    fetchMovieData: (state, payload) => {
      state.apiResponseMovies = payload;
    },
    setSelectedId: (state, payload) => {
      state.selectedId = payload;
    },
    setSelectedTab: (state, payload) => {
      state.selectedTab = payload;
    },
  },
  actions: {
    async fetchMovieData({ commit }, payload) {
      await axios
        .get(
          `https://api.themoviedb.org/3/discover/movie?api_key=${payload.key}&${payload.type}`
        )
        .then((response) => {
          console.log(response.data);
          commit("fetchMovieData", response.data.results);
        });
    },
    setSelectedId({ commit }, payload) {
      commit("setSelectedId", payload);
    },
    setSelectedTab({ commit }, payload) {
      commit("setSelectedTab", payload);
    },
  },
});
