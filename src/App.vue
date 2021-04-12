<template>
  <div id="app">
    <app_error_boundary :exception="exception">
      <app_nav_bar :active-tag="getSelectedTab"></app_nav_bar>
      <div class="container-fluid">
        <div class="row">
          <div class="col-3">
            <app_movies_list
              :titles-list="titlesList"
              :selected-tab="getSelectedTab"
              :selected-id="getSelectedId"
            ></app_movies_list>
          </div>
          <div class="col-9">
            <app_movie_details
              :movie-details-list="movieDetailsList"
              :selected-id="getSelectedId"
              :loading="loading"
            ></app_movie_details>
          </div>
        </div>
      </div>
    </app_error_boundary>
  </div>
</template>

<script>
import nav_bar from "./components/shared/Header";
import movies_list from "./components/listView/MoviesList";
import movie_details from "./components/detailsView/MovieDetails";
import error_boundary from "./components/erroHandling/ErrorBoundary";
import { mapActions, mapGetters } from "vuex";

export default {
  name: "App",
  components: {
    app_nav_bar: nav_bar,
    app_movies_list: movies_list,
    app_movie_details: movie_details,
    app_error_boundary: error_boundary,
  },
  data() {
    return {
      titlesList: [],
      movieDetailsList: [],
      loading: true,
      exception: "",
    };
  },
  computed: {
    ...mapGetters(["getSelectedId", "getSelectedTab", "getResponseMovies"]),
  },
  watch: {
    getSelectedTab(value) {
      switch (value) {
        case "news":
          this.callApi("news");
          break;
        case "trending":
          this.callApi("trending");
          break;
        default:
          this.callApi("top10");
      }
    },
  },
  methods: {
    ...mapActions([
      "fetchMovieData",
      "setSelectedTab",
      "setApiKey",
      "setSelectedId",
    ]),
    //popuates the list property of the MOvieList component
    populateTitlesList(results) {
      this.titlesList = results.map((x) => {
        var obj = { title: x.title, id: x.id };
        return obj;
      });
    },
    //popuates the list property of the MovieDetails component
    populateMovieDetailsList(results) {
      this.movieDetailsList = results.map((x) => {
        var movieDetailsObject = {
          movie_original_title: x.original_title,
          movie_translated_title: x.title,
          movie_id: x.id,
          movie_language: x.original_language,
          movie_overview: x.overview,
          movie_releash_date: x.release_date,
          movie_posterpath: x.poster_path,
          movie_backdroppath: x.backdrop_path,
          movie_vote_average: x.vote_average,
        };
        return movieDetailsObject;
      });
    },
    async callApi(selectedTab) {
      var localtype = "";
      switch (selectedTab) {
        case "news":
          localtype =
            "primary_release_date.gte=2021-04-15&primary_release_date.lte=2021-05-22";
          break;
        case "trending":
          localtype =
            "certification_country=US&certification=R&sort_by=vote_average.desc";
          break;
        default:
          localtype =
            "language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1";
      }
      try {
        this.loading = true;
        await this.fetchMovieData({
          key: process.env.VUE_APP_API_KEY,
          type: localtype,
        });
      } catch (ex) {
        this.loading = false;
        this.exception = ex;
        console.log(ex);
      } finally {
        this.loading = false;
        this.setSelectedId(0);
        this.populateTitlesList(this.getResponseMovies);
        this.populateMovieDetailsList(this.getResponseMovies);
      }
    },
  },
  mounted: function() {
    this.$nextTick(function() {
      // Code that will run only after the
      // entire view has been rendered
      this.setSelectedTab("top10");
      return;
    });
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
body {
  background-image: url("./assets/postersBackground.jpg");
}
</style>
