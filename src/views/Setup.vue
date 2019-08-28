<template>
  <div class="setup">
    <p class="instructions">{{ instructions }}</p>
    <boardSelect class="boardSelect" />
    <configOptions class="boardOptions" :submissions="submissions" />
    <button class="addDelay" @click="addDelay">Add delayElement</button>
    <delayElement
      class="delayOptions"
      v-for="n in delays.length"
      :key="n"
      v-model="delays[n - 1]"
    />
  </div>
</template>

<script>
import axios from "axios";
import boardSelect from "@/components/boardSelect.vue";
import configOptions from "@/components/configOptions.vue";
import delayElement from "@/components/delayElement.vue";
import { eventBus } from "@/main.js";
import { firePi } from "@/variables.js";
export default {
  components: {
    boardSelect,
    configOptions,
    delayElement
    // TODO delayElement
  },
  data() {
    return {
      instructions: "Please select a board type",
      submissions: [],
      delays: []
    };
  },
  watch: {
    submissions: {
      handler(newSubmissions) {
        console.debug(
          "Watch-Handler for submissions fired (localStorage updated)"
        );
        const parsed = JSON.stringify(newSubmissions);
        localStorage.setItem("submissions", parsed);
        eventBus.$emit("submissions-changed", newSubmissions);
      },
      deep: true
    },
    delays: {
      handler(newDelay) {
        console.debug("Delay added/modified");
        const parsed = JSON.stringify(newDelay);
        localStorage.setItem("delays", parsed);
      }
    }
  },
  mounted() {
    eventBus.$on("new-submission", board => {
      console.debug("new-submission event fired");
      if (this.submissions.length <= 4) {
        this.submissions.length === 0
          ? this.submissions.push(board)
          : this.submissions.unshift(board);
      } else {
        this.submissions.pop();
        this.submission.unshift(board);
      }
    });
    eventBus.$on("delete-submission", item => {
      console.debug("delete-submission event fired");
      this.submissions.splice(item.index, 1);
    });
    eventBus.$on("delete-delay", elem => {
      console.debug("delete-delay event fired");
      // FIXME Poor implementation of delete
      //  possible to delete wrong delay when two equal objects are available
      this.delays.splice(this.delays.findIndex(x => x === elem), 1);
    });
    // NOTE Using localStorage to provide data on Reload
    //  Also to provide data to Visualization
    //  Client-Side Storage: https://vuejs.org/v2/cookbook/client-side-storage.html
    if (localStorage.getItem("submissions")) {
      try {
        this.submissions = JSON.parse(localStorage.getItem("submissions"));
        this.submissions.forEach(item => {
          // console.debug(item);
          eventBus.$emit("disable-port", item.port.id);
        });
      } catch (e) {
        // NOTE Destroy data if invalid
        localStorage.removeItem("submissions");
      }
    }
    if (localStorage.getItem("delays")) {
      try {
        this.delays = JSON.parse(localStorage.getItem("delays"));
      } catch (e) {
        localStorage.removeItem("delays");
      }
    }
  },
  beforeDestroy() {
    console.debug("Setup: beforeDestroy() triggered.");
    console.debug("Sending setup-data to FireFlask");
    const path = `https://${firePi}/setup`;
    axios.post(path, this.submissions).catch(error => {
      console.error(error);
    });
  },
  methods: {
    addDelay() {
      const newDelay = {
        id: this.delays.length + 1,
        seconds: null,
        name: ""
      };
      this.delays.push(newDelay);
    }
  }
};
</script>

<style lang="scss" scoped>
.setup {
  display: grid;
  grid-template:
    [row1-start] "instructions instructions" min-content [row1-end]
    [row2-start] "boardSelect boardOptions" 1fr [row2-end]
    [row3-start] "boardSelect boardOptions" 1fr [row3-end]
    [row4-start] "addDelay delayOptions" 2fr [row4-end]
    / 1fr 2fr;
}
.instructions {
  grid-area: instructions;
}
.boardSelect {
  grid-area: boardSelect;
}
.boardOptions {
  grid-area: boardOptions;
}
.addDelay {
  grid-area: addDelay;
}
.delayOptions {
  grid-area: delayOptions;
}
</style>
