<template>
  <div class="setup">
    {{ instructions }} <br />
    <boardSelect />
    <br />
    <configOptions :submissions="submissions"/>
  </div>
</template>

<script>
import boardSelect from "./boardSelect.vue";
import configOptions from "./configOptions.vue";
import { eventBus } from "@/main.js";
export default {
  components: {
    boardSelect,
    configOptions,
    // delayElement
  },
  data() {
    return {
      instructions: "Please select a board type",
      submissions: []
    };
  },
  methods: {},
  mounted() {
    eventBus.$on("submitted", board => {
      if (this.submissions.length <= 4) {
        this.submissions.length = 0 ? this.submissions.push(board) : this.submissions.unshift(board);
      } else {
        this.submissions.pop();
        this.submission.unshift(board)
      }
    });
  }
};
</script>

<style scoped></style>
