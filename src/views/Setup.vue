<template>
  <div class="setup">
    <form class="io-setup-form" @submit.prevent="onSubmit">
      <p>
        <label for="im8Inputs">IM8-Inputs (RPi-Outputs) => </label>
        <input
          id="im8Inputs"
          v-model="im8Inputs"
          placeholder="Enter number of configured standard IM8 Inputs"
          type="number"
          min="0"
          max="8"
        />
        <label for="om8Outputs">OM8-Outputs (RPi-Inputs) => </label>
        <input
          id="om8Outputs"
          v-model="om8Inputs"
          placeholder="Enter number of configured standard IM8 Inputs"
          type="number"
          min="0"
          max="8"
        />
        <label for="vdsInputs">(VDS) IM8-Inputs (RPi-Outputs) => </label>
        <input
          id="vdsInputs"
          v-model="vdsInputs"
          placeholder="Enter number of configured standard IM8 Inputs"
          type="number"
          min="0"
          max="8"
        />
      </p>
    </form>
  </div>
</template>

<script>
export default {
  name: "setup",
  data() {
    return {
      im8Inputs: null,
      om8Outputs: null,
      vdsInputs: null
    };
  }
};
</script>

<style scoped>
input {
  break-after:auto;
}
</style>
