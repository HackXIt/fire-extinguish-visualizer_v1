<template>
  <div id="content">
    <div v-for="visual in visuals" :key="visual.port.name" class="port">
      <vue-draggable-resizable :parent="true">
        <p>
          <b>{{ visual.description }}</b>
          <br />
          {{ `BoardType: ${visual.board.boardType}` }}
          <br />
          {{ `PortID: ${visual.port.id}` }}
          <br />
          {{ `PortName: ${visual.port.name}` }}
          <br />
        </p>
      </vue-draggable-resizable>
      <vue-draggable-resizable
        v-for="(io, index) in visual.IO"
        :key="index"
        :parent="true"
        :resizable="false"
        :w="100"
        :h="50"
        class="pin"
      >
        <div v-if="isIM8orVDS(visual.board.boardType)">
          <button
            @click="sendByte(io, visual.port.name)"
          >{{ `${index}: ${visual.board.boardType.toUpperCase()}-${io}` }}</button>
        </div>
        <div v-else>
          {{ `OM8-${io}` }}
          <!-- active|positive|intermediary|negative -->
          <status-indicator status="active" />
        </div>
      </vue-draggable-resizable>
    </div>
    <div class="counters" v-for="counter in counters" :key="counter.id">
      <button
        @click="switchCountdown(`vac${counter.id}`, counter.id)"
        v-text="`Toggle ${counter.name} -> ${counter.state}`"
      />
      <vac :ref="`vac${counter.id}`" :leftTime="counter.seconds * 1000" :autoStart="false">
        <span slot="process" slot-scope="{ timeObj }">{{ timeObj.ceil.s }}</span>
        <span slot="finish">Done!</span>
      </vac>
    </div>
  </div>
</template>

<script>
// import VueDraggableResizable from "vue-draggable-resizable";
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
      },
      polling: null
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
    console.debug("Clearing Polling");
    clearInterval(this.polling);
    console.debug("Sending cleanup request to FireFlask");
    axios.post(this.paths.cleanup).catch(error => {
      console.error(error);
    });
  },
  methods: {
    pollData() {
      this.polling = setInterval(() => {
        console.debug("Polling-Test");
      }, 5000);
    },
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

<style lang="scss">
/*** EXAMPLE ***/
#content {
  width: 100%;
}
.port {
  box-sizing: border-box;
  box-align: center;
  background-image: url("../assets/visuals_bg.png");
  background-repeat: no-repeat;
  background-size: contain;
  height: 500px;
  width: 1000px;
  position: relative;
  border: 1px solid red;
}
.boxless {
  margin: 0;
  padding: 0;
}
.pin {
  width: 50px;
  height: 50px;
  border: 1px solid green;
}

// This is the css for vue-draggable-resizable
// DON'T EDIT unless customization is needed
.vdr {
  touch-action: none;
  position: absolute;
  box-sizing: border-box;
  border: 1px dashed black;
}
.handle {
  box-sizing: border-box;
  position: absolute;
  width: 10px;
  height: 10px;
  background: #eee;
  border: 1px solid #333;
}
.handle-tl {
  top: -10px;
  left: -10px;
  cursor: nw-resize;
}
.handle-tm {
  top: -10px;
  left: 50%;
  margin-left: -5px;
  cursor: n-resize;
}
.handle-tr {
  top: -10px;
  right: -10px;
  cursor: ne-resize;
}
.handle-ml {
  top: 50%;
  margin-top: -5px;
  left: -10px;
  cursor: w-resize;
}
.handle-mr {
  top: 50%;
  margin-top: -5px;
  right: -10px;
  cursor: e-resize;
}
.handle-bl {
  bottom: -10px;
  left: -10px;
  cursor: sw-resize;
}
.handle-bm {
  bottom: -10px;
  left: 50%;
  margin-left: -5px;
  cursor: s-resize;
}
.handle-br {
  bottom: -10px;
  right: -10px;
  cursor: se-resize;
}
@media only screen and (max-width: 768px) {
  [class*="handle-"]:before {
    content: "";
    left: -10px;
    right: -10px;
    bottom: -10px;
    top: -10px;
    position: absolute;
  }
}
</style>
