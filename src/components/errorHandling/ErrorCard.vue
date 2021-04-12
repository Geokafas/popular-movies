<template>
  <div class="container-fluid">
    <div class="alert alert-danger" ref="alert">
      <strong>Oh snap!</strong> Something went wrong. Try reloading the page.
      <br />
      {{ exception }}
    </div>
    <i class="bi bi-emoji-dizzy"></i>
  </div>
</template>
<script>
export default {
  name: "error_card",
  props: ["exception"],
};
</script>
<style scoped>
div {
  margin-top: 5%;
}
i {
  margin-left: 40%;
  font-size: 340px !important;
  color: #c0c0ff;
}
</style>
