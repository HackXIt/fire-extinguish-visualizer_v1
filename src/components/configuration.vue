<template>
    <div class="setup">
    {{ instructions }} <br/>
    <boardSelect :variants="variants"/>
    <br />
    <configOptions v-for="variant in variants" :key="variant.id" :variant="variant"/>
  </div>
</template>

<script>
import boardSelect from './boardSelect.vue'
import configOptions from './configOptions.vue'
import { eventBus } from '@/main.js'
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
                    variantPlaceholder: 'Standard IM8 Inputs',
                    rpiType: 'output',
                    boardType: 'im8',
                    amount: 0
                },
                {
                    id: 222,
                    variantPlaceholder: 'Standard OM8 Outputs',
                    rpiType: 'input',
                    boardType: 'om8',
                    amount: 0
                },
                {
                    id: 333,
                    variantPlaceholder: 'VDS IM8 Inputs',
                    rpiType: 'output',
                    boardType: 'vds',
                    amount: 0
                }
            ],
        };
    },
    methods: {
        addVariantArray(selection) {
            console.log(variants[selection])
        }
    },
    mounted() {
        eventBus.$on('board-submitted', board => {
            this.variants[board.selection].amount = board.amount
        })
    }
}
</script>

<style scoped>

</style>