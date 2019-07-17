<template>
  <div id="configOptions" v-if="notEmpty">
    <div v-for="(submission, index) in submissions" :key="index">
      <click-to-edit 
        v-model="submission.description"
      />
      <label v-if="duplicateValue(submission.IO)" v-text="warning"/>
      <click-to-edit
        v-for="n in submission.amount" :key="n"
        v-model.number="submission.IO[n-1]"
        :valueIsNumber="true"
        :preText="submission.board.boardType.toUpperCase() + '-'"
      />
    </div>
  </div>
</template>

<script>
import clickToEdit from "./clickToEdit.vue"
export default {
  props: {
    submissions: {
      type: Array,
      required: true
    }
  },
  components: {
    clickToEdit
    /*
    IM8,
    OM8,
    VDS
    */
  },
  methods: {
    duplicateValue(arr) {
      // https://www.w3resource.com/javascript-exercises/javascript-array-exercise-20.php
      let object = {}
      let result = []
      arr.forEach(item => {
        if(!object[item]) object[item] = 0
        object[item] += 1
      })
      for (const prop in object) {
        if(object[prop] >= 2) {
          this.warning = "The IO-Pins shouldn't contain duplicates within the same board."
          return true
        }
      }
      this.warning = ""
      return false
    }
  },
  computed: {
    notEmpty() {
      return this.submissions.length > 0 ? true : false;
    }
  },
  data() {
    return {
      warning: ""
    };
  }
};
</script>

<style lang="scss" scoped></style>
