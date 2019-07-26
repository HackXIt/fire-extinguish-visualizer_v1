<template>
  <div id="content">
    <p v-for="submission in visuals" :key="submission.port.name">
      {{ `BoardType: ${submission.board.boardType}` }}
      {{ `PortID: ${submission.port.id}` }}
      {{ `PortName: ${submission.port.name}` }}
      <button
        v-for="(io, index) in submission.IO"
        :key="index"
        @click="sendByte(io)"
      >
        {{ `${index}: ${submission.description}-${io}` }}
      </button>
    </p>
    <div
      v-for="counter in counters"
      :key="counter.id"
    >
      <circular-count-down-timer
        :seconds-stroke-color="'#f00'"
        :seconds-fill-color="'#00ffff66'"
        :size="200"
        :padding="4"
        :initial-value="counter.seconds"
        :show-second="true"
        :show-minute="false"
        :show-hour="false"
        :show-negatives="false"
        :second-label="counter.name"
        :steps="1"
        :paused="counter.pause"
      />
      <button 
        @click="pause(counter.id)"
        v-text="`Toggle ${counter.name} - ${counter.pause}`"
      />
    </div>
  </div>
</template>

<script>

export default {
  name: "Visualization",
  components: {
  },
  data() {
    return {
      visuals: [],
      counters: []
    };
  },
  mounted() {
    if (localStorage.getItem("submissions")) {
      try {
        this.visuals = JSON.parse(localStorage.getItem("submissions"));
      } catch (e) {
        // NOTE Destroy data if invalid
        console.debug(e);
        localStorage.removeItem("submissions");
      }
    }
    if (localStorage.getItem("delays")) {
      try {
        this.counters = JSON.parse(localStorage.getItem("delays"));
      } catch (e) {
        console.debug(e);
        localStorage.removeItem("delays");
      }
    }
  },
  methods: {
    sendByte(dec) {
      const bin = parseInt(dec, 10).toString(2);
      const rev = bin
        .split("")
        .reduce((revString, char) => char + revString, "");
      const zeros = "00000000";
      for (var i = zeros.length; i > dec; i--) {
        zeros.split("0").splice();
      }
      console.debug(`Bin-${bin} - Reversed-${rev} - Parsed-${parseInt(bin, 2)}`)
    },
    pause(id) {
      this.counters[id - 1].pause = !this.counters[id - 1].pause
    }
  }
};
</script>

<style lang="scss" scoped>
/*** EXAMPLE ***/
#content {
  width: 100%;
}
</style>
