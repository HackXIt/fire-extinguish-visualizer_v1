<template>
    <div id="configOptions" v-if="notEmpty">
        <ul>
            <li v-for="n in variant.amount" :key="n"> </li>
        </ul>
    </div>
</template>

<script>
export default {
    props: {
        variant: {
            type: Object,
            required: true
        }
    },
    computed: {
        notEmpty() {
            if(this.variant.amount > 0) return true
            else return false
        }
    },
    data() {
        return {
            im8: {
                options: {}
            },
            om8: {
                options: {}
            },
            vds: {
                options: {}
            }
        }
    }
}
</script>

<style lang="scss" scoped>

</style>