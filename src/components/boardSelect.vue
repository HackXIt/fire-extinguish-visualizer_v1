<template>
  <div>
    <form class="board-select" @submit.prevent="generate">
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
      <p v-if="selected">UPLOAD OF IMAGES GOES HERE (DEBUG)</p>
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
        min="0"
        max="8"
      />
      <input type="submit" value="generate" />
    </form>
  </div>
</template>

<script>
import { eventBus } from "@/main.js";
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
      variants: [
        {
          id: 1,
          placeholder: "Standard IM8 Inputs",
          rpiType: "output",
          boardType: "im8",
          imgActive: "",
          imgPassive: ""
        },
        {
          id: 2,
          placeholder: "Standard OM8 Outputs",
          rpiType: "input",
          boardType: "om8",
          imgActive: "",
          imgPassive: ""
        },
        {
          id: 3,
          placeholder: "VDS IM8 Inputs",
          rpiType: "output",
          boardType: "vds",
          imgActive: "",
          imgPreActive: "",
          imgPassive: ""
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
          board: {
            rpiType: this.variantSelection.rpiType,
            boardType: this.variantSelection.boardType
          },
          amount: this.amount,
          port: {
            name: this.portSelection.name,
            gpio: this.portSelection.gpio
          },
          IO: []
        };
        for (var i = 1; i <= this.amount; i++) {
          boardSelection.IO.push(i)
        }
        this.ports[this.portSelection.id - 1].available = false;
        eventBus.$emit("submitted", boardSelection);
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
  }
};
</script>

<style lang="scss" scoped></style>
