<template>
  <div id="content">
    <p v-for="visual in visuals" :key="visual.port.name" class="port">
      <b>{{ visual.description }}</b>
      <br />
      {{ `BoardType: ${visual.board.boardType}` }}
      <br />
      {{ `PortID: ${visual.port.id}` }}
      <br />
      {{ `PortName: ${visual.port.name}` }}
      <br />
      <button
        v-for="(io, index) in visual.IO"
        :key="index"
        @click="sendByte(io, visual.port.name)"
      >
        {{ `${index}: ${visual.board.boardType.toUpperCase()}-${io}` }}
      </button>
    </p>
    <div class="counters" v-for="counter in counters" :key="counter.id">
      <button
        @click="switchCountdown(`vac${counter.id}`, counter.id)"
        v-text="`Toggle ${counter.name} -> ${counter.state}`"
      />
      <vac
        :ref="`vac${counter.id}`"
        :leftTime="counter.seconds * 1000"
        :autoStart="false"
      >
        <span slot="process" slot-scope="{ timeObj }">{{
          timeObj.ceil.s
        }}</span>
        <span slot="finish">Done!</span>
      </vac>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "Visualization",
  components: {},
  data() {
    return {
      visuals: [],
      counters: [],
      paths: {
        // FIXME Network-Error
        // THIS NEEDS TO HAVE THE IP OF THE RASPBERRY PI
        // THE BROWSER REFERENCES THIS ADDRESS AND LOCALHOST POINTS TO THE CLIENT
        // Need to get some sort of static IP going
        togglePort: "http://localhost:80/togglePort",
        shift: "http://localhost:80/shift"
      }
    };
  },
  mounted() {
    if (localStorage.getItem("submissions")) {
      try {
        this.visuals = JSON.parse(localStorage.getItem("submissions"));
        this.visuals.forEach(visual => {
          const payload = {
            port: visual.port.name,
            trigger: 0
          };
          axios.post(this.paths.togglePort, payload).catch(error => {
            console.error(error);
          });
        });
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
  beforeDestroy() {
    this.visuals.forEach(visual => {
      const payload = {
        port: visual.port.name,
        trigger: 1
      };
      axios.post(this.paths.togglePort, payload).catch(error => {
        console.error(error);
      });
    });
  },
  methods: {
    sendByte(pin, port) {
      console.debug(`Setting ${pin} on ${port}`);
      const payload = {
        pin,
        port
      };
      console.debug(payload);
      axios.post(this.paths.shift, payload).catch(error => {
        console.error(error);
      });
    },
    switchCountdown(ref, id) {
      // console.debug(this.$refs[ref][0])
      this.$refs[ref][0].switchCountdown();
      this.$nextTick(() => {
        this.counters[id - 1].state =
          this.$refs[ref][0].state === "stoped" ? "On" : "Off";
      });
    }
  }
};
</script>

<style lang="scss" scoped>
/*** EXAMPLE ***/
#content {
  width: 100%;
}
.port {
  box-sizing: border-box;
  width: fit-content;
  border: 1px dashed red;
  box-align: center;
}
</style>
