<template>
  <div class="delayGrid">
    Time (in seconds):
    <input
      type="number"
      placeholder="Enter time in seconds"
      ref="timeInput"
      :value="value.seconds"
      @keyup.enter="updateDelay()"
      @blur="updateDelay()"
      min="1"
    />
    Name:
    <input
      type="text"
      placeholder="Enter a delay name (optional)"
      ref="nameInput"
      :value="value.name"
      @keyup.enter="updateDelay()"
      @blur="updateDelay()"
    />
    <button @click="removeDelay()" class="deleteButton">
      <img :src="require('@/assets/delete.png')" />
    </button>
  </div>
</template>

<script>
import { eventBus } from "@/main.js";
export default {
  props: ["value"],
  methods: {
    updateDelay() {
      if (this.$refs.timeInput.value < 1) this.$refs.timeInput.value = 1;
      console.debug(this.$refs.timeInput.value, this.$refs.nameInput.value);
      this.$emit("input", {
        id: this.value.id,
        seconds: this.$refs.timeInput.value,
        name: this.$refs.nameInput.value
      });
    },
    removeDelay() {
      eventBus.$emit("delete-delay", this.value);
    }
  }
};
</script>

<style lang="scss" scoped>
// FIXME Not adding content dynamically to the grid-area
.delayGrid {
  display: grid;
  grid-auto-columns: 1fr;
  grid-auto-rows: 1fr;
  // grid-auto-flow: row;
}
</style>
