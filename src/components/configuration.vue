<template>
  <div class="setup">
    {{ instructions }} <br />
    <boardSelect :variants="variants" :ports="ports" />
    <br />
    <configOptions
      v-for="variant in variants"
      :key="variant.id"
      :variant="variant"
    />
  </div>
</template>

<script>
import boardSelect from "./boardSelect.vue";
import configOptions from "./configOptions.vue";
import { eventBus } from "@/main.js";
export default {
  components: {
    boardSelect,
    configOptions
  },
  data() {
    return {
      instructions: "Please select a board type",
      variants: [
        {
          id: 111,
          variantPlaceholder: "Standard IM8 Inputs",
          rpiType: "output",
          boardType: "im8",
          amount: 0
        },
        {
          id: 222,
          variantPlaceholder: "Standard OM8 Outputs",
          rpiType: "input",
          boardType: "om8",
          amount: 0
        },
        {
          id: 333,
          variantPlaceholder: "VDS IM8 Inputs",
          rpiType: "output",
          boardType: "vds",
          amount: 0
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
        }
      ]
    };
  },
  methods: {
    //     addVariant(selection) {
    //       window.console.log(variants[selection]);
    //     }
    //   },
  },
  mounted() {
    eventBus.$on("board-submitted", board => {
      this.variants[board.selection].amount = board.amount;
    });
    eventBus.$on("port-used", port => {
      this.ports[port].available = false
      console.log(`${this.ports[port].name} - Available - ${this.ports[port].available}`)
    })
  }
};
</script>

<style scoped></style>
