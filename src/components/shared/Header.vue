<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <a class="navbar-brand">{{ activeTag }}</a>
    <button
      class="navbar-toggler"
      type="button"
      data-toggle="collapse"
      data-target="#navbarText"
      aria-controls="navbarText"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse container" id="navbarText">
      <ul class="navbar-nav mr-auto float-right">
        <li class="nav-item">
          <a class="nav-link " @click="setSelectedTab('top10')" :class="top10"
            >TOP10s
          </a>
        </li>
        <li class="nav-item">
          <a
            class="nav-link"
            @click="setSelectedTab('trending')"
            :class="trending"
            >Trending</a
          >
        </li>
        <li class="nav-item">
          <a class="nav-link" @click="setSelectedTab('news')" :class="newest"
            >NEW!</a
          >
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "nav_bar",

  props: ["activeTag"],
  data() {
    return {
      top10: "",
      trending: "",
      newest: "",
    };
  },
  methods: {
    ...mapActions(["setSelectedTab"]),
  },
  watch: {
    activeTag(value) {
      if (value === "top10") {
        this.top10 = "active";
        this.trending = "";
        this.newest = "";
        return;
      } else if (value === "trending") {
        this.top10 = "";
        this.trending = "active";
        this.newest = "";
        return;
      } else {
        this.top10 = "";
        this.trending = "";
        this.newest = "active";
        return;
      }
    },
  },
};
</script>

<style>
.navbar-brand {
  margin-left: 5%;
}
.nav-item {
  margin-right: 10%;
}
</style>
