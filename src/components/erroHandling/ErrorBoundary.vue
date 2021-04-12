<template>
  <div>
    <slot
      v-if="err"
      name="error"
      v-bind:err="err"
      v-bind:vm="vm"
      v-bind:info="info"
      ><app_error_card :exception="exception"></app_error_card
    ></slot>
    <slot v-else></slot>
  </div>
</template>

<script>
import error_card from "./ErrorCard";
export default {
  name: "error-boundary",
  components: { app_error_card: error_card },
  props: ["stopPropagation", "exception"],
  data() {
    return {
      err: false,
      vm: null,
      info: null,
    };
  },
  errorCaptured(err, vm, info) {
    this.err = err;
    this.vm = vm;
    this.info = info;
    return !this.stopPropagation;
  },
};
</script>

<style scoped></style>
