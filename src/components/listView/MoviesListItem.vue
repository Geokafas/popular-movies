<template>
  <div>
    <li
      id="list-item"
      class="list-group-item list-group-item-action"
      :class="active"
      @click="setSelectedId(id)"
    >
      {{ title }}
    </li>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "movies_list_item",
  props: ["title", "id", "selectedId"],
  methods: {
    ...mapActions(["setSelectedId"]),
  },
  computed: {
    active() {
      //compare the id of this object WITH the globaly
      //selected id of the object that the user clicked
      if (this.$props.selectedId !== this.$props.id) {
        return "";
      }
      return "active";
    },
  },
};
</script>

<style>
#list-item {
  background-color: #2c3541d5;
  color: aliceblue;
}
.active {
  background-color: #006effd5 !important;
}
</style>
