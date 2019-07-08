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
          >{{ variant.variantPlaceholder }}</option
        >
      </select>
      <p v-if="selected">DEBUG</p>
      <label
        class="error-msg"
        for="boardAmount"
        v-if="error.num.val"
        v-text="error.num.msg"
      />
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
      required: false
    }
  },
  data() {
    return {
      selection: null,
      amount: null,
      error: {
        sel: {
          val: false,
          msg: "You must select a board type."
        },
        num: {
          val: false,
          msg: "Amount missing or wrong. (Min 0 / Max 8)"
        }
      }
    };
  },
  methods: {
    generate() {
        if (typeof(this.selection) === 'object') {
            this.error.sel.val = true;
        } else if (typeof(this.amount) === 'object') {
            this.error.num.val = true;
        } else {
            let boardSelection = {
                selection: this.selection,
                amount: this.amount
            };
            eventBus.$emit("board-submitted", boardSelection);
            this.selection = null
            this.amount = null
        }
    }
  },
  computed: {
      selected() {
          if (typeof(this.selection) === 'number') {
              return true
          } else {
              return false
          }
      }
  }
};
</script>

<style lang="scss" scoped></style>
