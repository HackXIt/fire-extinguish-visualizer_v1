<template>
  <div>
    <form class="board-select" @submit.prevent="generate">
      <!-- TODO Use vue-multiselect plugin for a better selection 
      https://vue-multiselect.js.org/
      -->
      <label class="error-msg" for="boardSelect" v-if="error.sel.val" v-text="error.sel.msg" />
      <select id="boardSelect" v-model="variantSelection">
        <option
          v-for="variant in variants"
          :key="variant.id"
          :value="variant"
        >{{ variant.placeholder }}</option>
      </select>
      <p v-if="selected">
        UPLOAD OF IMAGES GOES HERE (DEBUG)
        <img :src="variantSelection.imgActive" />
        <img :src="variantSelection.imgPassive" />
        <img v-if="variantSelection.imgPreActive" :src="variantSelection.imgPreActive" />
      </p>
      <label class="error-msg" for="boardAmount" v-if="error.num.val" v-text="error.num.msg" />
      <select id="portSelect" v-model="portSelection">
        <option
          v-for="port in ports"
          :key="port.id"
          :value="port"
          :disabled="!port.available"
        >{{ port.name }}</option>
      </select>
      <input type="number" id="boardAmount" v-model.number="amount" min="1" max="8" />
      <input type="submit" value="generate" />
    </form>
  </div>
</template>

<script>
import { eventBus } from "@/main.js";
// import middleFinger from "@/assets/middle_finger.png"
export default {
  props: {},
  data() {
    return {
      variantSelection: null,
      amount: null,
      portSelection: null,
      error: {
        sel: {
          val: false,
          msg: "You must select a board type and Port."
        },
        num: {
          val: false,
          msg: "Amount missing!"
        }
      },
      // NOTE https://www.flaticon.com/packs/hand-gestures-6
      variants: [
        {
          id: 1,
          placeholder: "Standard IM8 Inputs",
          rpiType: "output",
          boardType: "im8",
          imgActive: require("@/assets/middle_finger.png"),
          imgPassive: require("@/assets/fist.png"),
          gpio: ["SERIN", "SRCK", "RCK", "G", "CLR"]
        },
        {
          id: 2,
          placeholder: "Standard OM8 Outputs",
          rpiType: "input",
          boardType: "om8",
          imgActive: require("@/assets/ok.png"),
          imgPassive: require("@/assets/hand.png"),
          gpio: ["MODE", "INT", "SEROUT", "CLK", "CLKSTOP"]
        },
        {
          id: 3,
          placeholder: "VDS IM8 Inputs",
          rpiType: "output",
          boardType: "vds",
          imgActive: require("@/assets/middle_finger.png"),
          imgPreActive: require("@/assets/victory.png"),
          imgPassive: require("@/assets/fist.png"),
          gpio: ["SERIN", "SRCK", "RCK", "G", "CLR"]
        }
      ],
      ports: [
        {
          id: 1,
          available: true,
          name: "SER1",
          gpio: {
            1: 3,
            2: 5,
            3: 7,
            4: 11,
            5: 13
          }
        },
        {
          id: 2,
          available: true,
          name: "SER2",
          gpio: {
            1: 8,
            2: 10,
            3: 12,
            4: 16,
            5: 18
          }
        },
        {
          id: 3,
          available: true,
          name: "SER3",
          gpio: {
            1: 29,
            2: 31,
            3: 33,
            4: 35,
            5: 37
          }
        },
        {
          id: 4,
          available: true,
          name: "SER4",
          gpio: {
            1: 22,
            2: 24,
            3: 26,
            4: 32,
            5: 36
          }
        }
      ]
    };
  },
  methods: {
    generate() {
      if (!this.variantSelection || !this.portSelection) {
        this.error.sel.val = true;
      } else if (typeof this.amount === "object") {
        this.error.num.val = true;
      } else {
        let boardSelection = {
          description: `${this.variantSelection.boardType.toUpperCase()}`,
          amount: this.amount,
          board: {
            rpiType: this.variantSelection.rpiType,
            boardType: this.variantSelection.boardType
          },
          port: {
            id: this.portSelection.id,
            name: this.portSelection.name,
            gpio: Object.create(this.portSelection.gpio)
          },
          IO: []
        };
        for (var i = 1; i <= this.amount; i++) {
          boardSelection.IO.push(i);
        }
        for (var i = 1; i <= this.variantSelection.gpio.length; i++) {
          boardSelection.port.gpio[this.variantSelection.gpio[i - 1]] =
            boardSelection.port.gpio[i];
          delete boardSelection.port.gpio[i];
        }
        this.ports[this.portSelection.id - 1].available = false;
        eventBus.$emit("new-submission", boardSelection);
        this.variantSelection = null;
        this.amount = null;
        this.portSelection = null;
      }
    }
  },
  computed: {
    selected() {
      return this.variantSelection ? true : false;
    }
  },
  mounted() {
    eventBus.$on("delete-submission", item => {
      this.ports[item.portId - 1].available = true;
    });
    eventBus.$on("disable-port", port => {
      console.debug(`Port ${port} disabled`);
      this.ports[port - 1].available = false;
    });
  }
};
</script>

<style lang="scss" scoped>
.board-select {
  display: contents;
}
</style>
