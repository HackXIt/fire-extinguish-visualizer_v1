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
      <b v-text="'Board'" />
      <br />
      <select id="boardSelect" v-model="variantSelection">
        <option
          v-for="variant in variants"
          :key="variant.id"
          :value="variant"
          >{{ variant.placeholder }}</option
        >
      </select>
      <!-- TODO Add some sort of picture preview here maybe? -->
      <label
        class="error-msg"
        for="boardAmount"
        v-if="error.num.val"
        v-text="error.num.msg"
      />
      <br />
      <b v-text="'Port'" />
      <br />
      <select id="portSelect" v-model="portSelection">
        <option
          v-for="port in ports"
          :key="port.id"
          :value="port"
          :disabled="!port.available"
          >{{ port.name }}</option
        >
      </select>
      <br />
      <b v-text="'IO-Amount'" />
      <br />
      <input
        type="number"
        id="boardAmount"
        v-model.number="amount"
        min="1"
        max="8"
      />
      <br />
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
      // TODO The pictures are actually not used currently
      variants: [
        {
          id: 1,
          placeholder: "Standard IM8 Inputs",
          rpiType: "output",
          boardType: "im8",
          gpio: ["SERIN", "SRCK", "RCK", "G", "CLR"]
        },
        {
          id: 2,
          placeholder: "Standard OM8 Outputs",
          rpiType: "input",
          boardType: "om8",
          gpio: ["MODE", "INT", "SEROUT", "CLK", "CLKSTOP"]
        },
        {
          id: 3,
          placeholder: "VDS IM8 Inputs",
          rpiType: "output",
          boardType: "vds",
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
          IO: [],
          pinStates: {}
        };
        for (var i = 1; i <= this.amount; i++) {
          boardSelection.IO.push(i);
        }
        for (var j = 1; j <= this.variantSelection.gpio.length; j++) {
          boardSelection.port.gpio[this.variantSelection.gpio[j - 1]] =
            boardSelection.port.gpio[j];
          delete boardSelection.port.gpio[j];
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
    eventBus.$on("disable-port", id => {
      console.debug(`Port-Selection for Port ${id} disabled`);
      // TODO ??? forgot the idea behind this
      // const index = (this.ports.find(obj => obj.id === id).available = false);
      this.ports[id - 1].available = false;
    });
  }
};
</script>

<style lang="scss" scoped>
.board-select {
  text-align: left;
  margin: auto;
  position: relative;
  left: 100px;
}
</style>
