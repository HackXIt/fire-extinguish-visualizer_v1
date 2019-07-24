<template>
  <div class="visuals">
    <p v-for="(submission, index) in visuals" :key="index">
      {{ index }}
      {{ submission.board.boardType }}
      {{ submission.port.name }}
      {{ submission.amount }}
    </p>
  </div>
</template>

<script>
export default {
  name: "Visualization",
  data() {
    return {
      visuals: []
    };
  },
  mounted() {
    if (localStorage.getItem("submissions")) {
      try {
        this.visuals = JSON.parse(localStorage.getItem("submissions"));
      } catch (e) {
        // NOTE Destroy data if invalid
        localStorage.removeItem("submissions");
      }
    }
  }
};
</script>

<style lang="scss" scoped></style>
