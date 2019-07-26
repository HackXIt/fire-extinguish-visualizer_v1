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
      class="counters"
      v-for="counter in counters"
      :key="counter.id"
    >
      <button
        @click="switchCountdown(`vac${counter.id}`, counter.id)"
        v-text="`Toggle ${counter.name} -> ${counter.state}`"
      />
      <vac
        :ref="`vac${counter.id}`"
        :leftTime="counter.seconds*1000"
        :autoStart="false"
      >
        <span
          slot="process"
          slot-scope="{ timeObj }"
        >
          {{ timeObj.ceil.s }}
        </span>
        <span
          slot="finish"
        >
          Done!
        </span>
      </vac>
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
    switchCountdown(ref, id) {
      // console.debug(this.$refs[ref][0])
      this.$refs[ref][0].switchCountdown()
      this.$nextTick(() => {
        this.counters[id - 1].state = this.$refs[ref][0].state === 'stoped' ? 'On' : 'Off'
      })
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
