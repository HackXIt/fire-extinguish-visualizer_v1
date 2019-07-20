<template>
  <div>
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
  </div>
</template>

<script>
export default {
  props: ["value"],
  methods: {
    updateDelay() {
      if (this.$refs.timeInput.value < 1) this.$refs.timeInput.value = 1;
      console.debug(this.$refs.timeInput.value, this.$refs.nameInput.value);
      this.$emit("input", {
        seconds: this.$refs.timeInput.value,
        name: this.$refs.nameInput.value
      });
    }
  }
};
</script>

<style lang="scss" scoped></style>
