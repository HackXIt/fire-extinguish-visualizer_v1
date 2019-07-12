<template>
  <div>
    <form class="board-select" @submit.prevent="generate">
      <label
        class="error-msg"
        for="boardSelect"
        v-if="error.sel.val"
        v-text="error.sel.msg"
      />
      <select id="boardSelect" v-model.number="selection">
        <option
          v-for="(variant, index) in variants"
          :key="variant.id"
          :value="index"
          >{{ variant.variantPlaceholder }}</option>
      </select>
      <p v-if="selected">VARIANT-IMAGE-PLACEHOLDER (DEBUG)</p>
      <label
        class="error-msg"
        for="boardAmount"
        v-if="error.num.val"
        v-text="error.num.msg"
      />
      <select id="portSelect" v-model.number="pinSelection">
        <option 
          v-for="(port, index) in ports"
          :key="port.id"
          :value="index"
          :disabled="!port.available"
          >{{ port.name }}</option>
      </select>
      <input type="number" id="boardAmount" v-model.number="amount" min='0' max='8' />
      <input type="submit" value="generate" />
    </form>
  </div>
</template>

<script>
import { eventBus } from "@/main.js";
export default {
  props: {
    variants: {
      type: Array,
      required: true
    },
    ports: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      selection: null,
      pinSelection: null,
      amount: null,
      error: {
        sel: {
          val: false,
          msg: "You must select a board type and Port."
        },
        num: {
          val: false,
          msg: "Amount missing!"
        }
      }
    };
  },
  methods: {
    generate() {
        if (typeof(this.selection) === 'object' || typeof(this.pinSelection) === 'object') {
            this.error.sel.val = true;
        } else if (typeof(this.amount) === 'object') {
            this.error.num.val = true;
        } else {
            let boardSelection = {
                selection: this.selection,
                amount: this.amount
            };
            let pinSelection = this.pinSelection
            eventBus.$emit("board-submitted", boardSelection);
            eventBus.$emit("port-used", pinSelection)
            this.selection = null
            this.amount = null
            this.pinSelection = null
        }
    }
  },
  computed: {
      selected() {
          // if (typeof(this.selection) === 'number') {
          //     return true
          // } else {
          //     return false
          // }
          return typeof(this.selection) === 'number' ? true : false
      }
  }
};
</script>

<style lang="scss" scoped></style>
