<template>
  <div id="content">
    <div v-for="visual in visuals" :key="visual.port.name" class="port">
      <b>{{ visual.description }}</b>
      <br />
      {{ `BoardType: ${visual.board.boardType}` }}
      <br />
      {{ `PortID: ${visual.port.id}` }}
      <br />
      {{ `PortName: ${visual.port.name}` }}
      <br />
      <div v-if="isIM8orVDS(visual.board.boardType)">
        <button
          v-for="(io, index) in visual.IO"
          :key="index"
          @click="sendByte(io, visual.port.name)"
        >
          {{ `${index}: ${visual.board.boardType.toUpperCase()}-${io}` }}
        </button>
      </div>
      <div v-else>
        <div v-for="(io, index) in visual.IO" :key="index">
          {{ `OM8-${io}` }}
          <!-- active|positive|intermediary|negative -->
          <status-indicator status="active" />
        </div>
      </div>
    </div>
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
        <span slot="process" slot-scope="{ timeObj }">
          {{ timeObj.ceil.s }}
        </span>
        <span slot="finish">Done!</span>
      </vac>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { firePi } from "@/variables.js";
export default {
  name: "Visualization",
  data() {
    return {
      visuals: [],
      counters: [],
      paths: {
        // FIXME Network-Error
        // THIS NEEDS TO HAVE THE IP OF THE RASPBERRY PI
        // THE BROWSER REFERENCES THIS ADDRESS AND LOCALHOST POINTS TO THE CLIENT
        // Need to get some sort of static IP going or hostname
        cleanup: `http://${firePi}/cleanup`,
        shift: `http://${firePi}/shift`
      }
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
  beforeDestroy() {
    axios.post(this.paths.cleanup).catch(error => {
      console.error(error);
    });
  },
  methods: {
    isIM8orVDS(typeText) {
      if (typeText === "im8" || typeText === "vds") {
        return true;
      } else {
        return false;
      }
    },
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
