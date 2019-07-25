<template>
  <div>
    <form class="board-select" @submit.prevent="generate">
      <!-- TODO Use vue-multiselect plugin for a better selection 
      https://vue-multiselect.js.org/
      -->
      <label
        class="error-msg"
        for="boardSelect"
        v-if="error.sel.val"
        v-text="error.sel.msg"
      />
      <select id="boardSelect" v-model="variantSelection">
        <option
          v-for="variant in variants"
          :key="variant.id"
          :value="variant"
          >{{ variant.placeholder }}</option
        >
      </select>
      <p v-if="selected">
        UPLOAD OF IMAGES GOES HERE (DEBUG)
        <img :src="variantSelection.imgActive" />
        <img :src="variantSelection.imgPassive" />
        <img
          v-if="variantSelection.imgPreActive"
          :src="variantSelection.imgPreActive"
        />
      </p>
      <label
        class="error-msg"
        for="boardAmount"
        v-if="error.num.val"
        v-text="error.num.msg"
      />
      <select id="portSelect" v-model="portSelection">
        <option
          v-for="port in ports"
          :key="port.id"
          :value="port"
          :disabled="!port.available"
          >{{ port.name }}</option
        >
      </select>
      <input
        type="number"
        id="boardAmount"
        v-model.number="amount"
        min="1"
        max="8"
      />
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
          imgPassive: require("@/assets/fist.png")
        },
        {
          id: 2,
          placeholder: "Standard OM8 Outputs",
          rpiType: "input",
          boardType: "om8",
          imgActive: require("@/assets/ok.png"),
          imgPassive: require("@/assets/hand.png")
        },
        {
          id: 3,
          placeholder: "VDS IM8 Inputs",
          rpiType: "output",
          boardType: "vds",
          imgActive: require("@/assets/middle_finger.png"),
          imgPreActive: require("@/assets/victory.png"),
          imgPassive: require("@/assets/fist.png")
        }
      ],
      ports: [
        {
          id: 1,
          available: true,
          name: "SER1",
          gpio: {
            SERIN: 3,
            SRCK: 5,
            RCK: 7,
            G: 11,
            CLR: 13
          }
        },
        {
          id: 2,
          available: true,
          name: "SER2",
          gpio: {
            SERIN: 8,
            SRCK: 10,
            RCK: 12,
            G: 16,
            CLR: 18
          }
        },
        {
          id: 3,
          available: true,
          name: "SER3",
          gpio: {
            SERIN: 29,
            SRCK: 31,
            RCK: 33,
            G: 35,
            CLR: 37
          }
        },
        {
          id: 4,
          available: true,
          name: "SER4",
          gpio: {
            SERIN: 22,
            SRCK: 24,
            RCK: 26,
            G: 32,
            CLR: 36
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
            gpio: this.portSelection.gpio
          },
          IO: []
        };
        for (var i = 1; i <= this.amount; i++) {
          boardSelection.IO.push(i);
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
