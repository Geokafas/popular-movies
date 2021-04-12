<template>
  <div>
    <movies_details_card
      :original_title="selectedMovieObject.movie_original_title"
      :title="selectedMovieObject.movie_translated_title"
      :language="selectedMovieObject.movie_language"
      :overview="selectedMovieObject.movie_overview"
      :poster_path="selectedMovieObject.movie_posterpath"
      :other_poster_path="selectedMovieObject.movie_backdroppath"
      :rating="selectedMovieObject.movie_vote_average"
      :releash_date="selectedMovieObject.movie_releash_date"
      :loading="loading"
    ></movies_details_card>
  </div>
</template>

<script>
import movies_details_card from "./MovieDetailsCard";
export default {
  name: "movie_details",
  components: { movies_details_card },
  props: ["movieDetailsList", "selectedId", "loading"],
  computed: {
    selectedMovieObject() {
      //id's are six-digit//default case
      if (this.$props.selectedId != 0) {
        var obj = this.$props.movieDetailsList.find(
          (el) => el.movie_id === this.$props.selectedId
        );
        return obj;
        //loading has finished, but nothing is selected, show placeholder
      } else if (this.$props.selectedId === 0 && !this.$props.loading) {
        return this.$props.movieDetailsList[0];
      } else {
        return [];
      }
    },
  },
};
</script>

<style></style>
