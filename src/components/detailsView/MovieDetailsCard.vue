<template>
  <div class="row card">
    <!--spinner-->
    <div v-if="loading === true" class="spinner-border" role="status">
      <span class="sr-only">Loading...</span>
    </div>
    <!-- end spinner-->
    <div class="horizontal">
      <div class="col-sm-5">
        <img class="d-block w-100" :src="poster" alt="" />
      </div>
      <div class="col-md-7">
        <div class="card-block">
          <h4 class="card-title">{{ cardTitle }}</h4>
          <hr />
          <p class="subtitle">Releash date: {{ releash_date }}</p>
          <p class="card-text">{{ overview }}</p>
          <div class="container">
            <div class="rating float-right">
              <i :class="star1"></i>
              <i :class="star2"></i>
              <i :class="star3"></i>
              <i :class="star4"></i>
              <i :class="star5"></i>
            </div>
          </div>
          <br />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "movies_details_card",
  props: [
    "original_title",
    "title",
    "language",
    "overview",
    "poster_path",
    "other_poster_path",
    "rating",
    "releash_date",
    "loading",
  ],
  computed: {
    //calculate the poster path of each item
    poster() {
      console.log(this.$props.loading);
      if (!this.$props.loading) {
        var src = `https://image.tmdb.org/t/p/w500${this.$props.poster_path}`;
        return src;
      } else {
        return "";
      }
    },
    //if the card title has a second title not in english
    //then show both
    cardTitle() {
      if (
        this.$props.language === "en" ||
        this.$props.original_title === this.$props.title
      ) {
        return this.$props.original_title;
      } else if (
        this.$props.language !== "en" &&
        this.$props.original_title !== this.$props.title
      ) {
        var str = "(" + this.$props.title + ")  " + this.$props.original_title;
        return str;
      } else {
        return "";
      }
    },
    //calculate star rating
    star1() {
      if (this.$props.rating / 2 >= 1) {
        return "bi bi-star-fill";
      } else if (this.$props.rating / 2 >= 0.5 && this.$props.rating / 2 < 1) {
        return "bi bi-star-half";
      } else {
        return "bi bi-star";
      }
    },
    star2() {
      if (this.$props.rating / 2 >= 2) {
        return "bi bi-star-fill";
      } else if (this.$props.rating / 2 >= 1.5 && this.$props.rating / 2 < 2) {
        return "bi bi-star-half";
      } else {
        return "bi bi-star";
      }
    },
    star3() {
      if (this.$props.rating / 2 >= 3) {
        return "bi bi-star-fill";
      } else if (this.$props.rating / 2 >= 2.5 && this.$props.rating / 2 < 3) {
        return "bi bi-star-half";
      } else {
        return "bi bi-star";
      }
    },
    star4() {
      if (this.$props.rating / 2 >= 4) {
        return "bi bi-star-fill";
      } else if (this.$props.rating / 2 >= 3.5 && this.$props.rating / 2 < 4) {
        return "bi bi-star-half";
      } else {
        return "bi bi-star";
      }
    },
    star5() {
      if (this.$props.rating / 2 >= 5) {
        return "bi bi-star-fill";
      } else if (this.$props.rating / 2 >= 4.5 && this.$props.rating / 2 < 5) {
        return "bi bi-star-half";
      } else {
        return "bi bi-star";
      }
    },
  },
};
</script>

<style>
.card-title {
  margin-bottom: 50px;
  text-transform: uppercase;
  text-align: center;
}

.card-block {
  font-size: 1em;
  position: relative;
  margin: 0;
  padding-top: 5em;
  border: none;
  border-top: 1px solid rgba(34, 36, 38, 0.1);
  box-shadow: none;
}
.horizontal {
  display: flex;
  flex: 1 1 auto;
}
.card {
  font-size: 1em;
  overflow: hidden;
  border: none;
  border-radius: 0.28571429rem;
  box-shadow: 0 1px 3px 0 #2c3541d5, 0 0 0 1px #2c3541d5;
  margin-top: 5%;
  background: #2c3541d5 !important;
  color: aliceblue;
  max-width: 90%;
}
hr {
  background: aliceblue;
}
.subtitle {
  font-size: 0.9em;
  font-style: italic;
}
.rating {
  padding: 10px;
}
</style>
