<template>
  <div id="movies-list">
    <div class="container">
      <ul class="list-group">
        <movies_list_item
          v-for="title in listPages"
          :title="title.title"
          :id="title.id"
          :selected-id="selectedId"
          :key="title.id"
        ></movies_list_item>
      </ul>
      <div class="container">
        <button
          @click="modifier -= 10"
          class="previous-btn float-left"
          :disabled="hasPrevPage"
        >
          &laquo;
        </button>
        <button
          @click="modifier += 10"
          class="next-btn float-right"
          :disabled="hasNextpage"
        >
          &raquo;
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import movies_list_item from "./MoviesListItem";
export default {
  name: "movies_list",
  data() {
    return {
      title: "",
      id: "",
      modifier: 0,
    };
  },
  props: ["titlesList", "selectedTab", "selectedId"],
  components: { movies_list_item: movies_list_item },
  computed: {
    listPages() {
      if (this.$props.titlesList.length < 10) {
        return this.$props.titlesList;
      } else {
        var temp = this.$props.titlesList.slice(
          0 + this.modifier,
          10 + this.modifier
        );
        return temp;
      }
    },
    hasNextpage() {
      if (this.modifier > 0) {
        console.log(this.$props.titlesList.length / (this.modifier + 10));
        if (this.$props.titlesList.length / (this.modifier + 10) > 1) {
          return false;
        } else {
          return true;
        }
      } else {
        return false;
      }
    },
    hasPrevPage() {
      if (this.modifier === 0) {
        return true;
      } else {
        return false;
      }
    },
  },
  watch: {
    selectedTab() {
      this.modifier = 0;
    },
  },
};
</script>

<style>
#movies-list {
  margin: 10px;
}
ul :hover {
  background-color: #006effd5;
  border: #006effd5;
}
.previous-btn {
  background-color: #2c3541d5;
  color: whitesmoke;
  width: 50%;
}
.next-btn {
  background-color: #2c3541d5;
  color: whitesmoke;
  width: 50%;
}
</style>
