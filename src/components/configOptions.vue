<template>
  <div id="configOptions" v-if="notEmpty">
    <div v-for="(submission, index) in submissions" :key="index">

    </div>
  </div>
</template>

<script>
export default {
  props: {
    submissions: {
      type: Array,
      required: true
    }
  },
  components: {
    /*
    IM8,
    OM8,
    VDS
    */
  },
  computed: {
    notEmpty() {
      return this.submissions.length > 0 ? true : false;
    },
    element(type) {
      return false;
    }
  },
  data() {
    return {
    };
  }
};
</script>

<style lang="scss" scoped></style>
