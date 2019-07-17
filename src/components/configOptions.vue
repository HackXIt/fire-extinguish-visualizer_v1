<template>
  <div id="configOptions" v-if="notEmpty">
    <div v-for="(submission, index) in submissions" :key="index">
      <button @click="removeSubmission(index)"
        class="deleteButton"
      ><img :src="require('@/assets/delete.png')">Delete</button>
      <click-to-edit v-model="submission.description" />
      <label v-if="duplicateValue(submission.IO)" v-text="warning" />
      <click-to-edit
        v-for="n in submission.amount"
        :key="n"
        v-model.number="submission.IO[n - 1]"
        :valueIsNumber="true"
        :preText="submission.board.boardType.toUpperCase() + '-'"
      />
    </div>
  </div>
</template>

<script>
import { eventBus } from "@/main.js";
import clickToEdit from "./clickToEdit.vue";
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
      // NOTE https://www.w3resource.com/javascript-exercises/javascript-array-exercise-20.php
      let object = {};
      arr.forEach(item => {
        if (!object[item]) object[item] = 0;
        object[item] += 1;
      });
      for (const prop in object) {
        if (object[prop] >= 2) {
          this.warning =
            "The IO-Pin Declarations cannot contain duplicates within the same board.";
          return true;
        }
      }
      this.warning = "";
      return false;
    },
    removeSubmission(n) {
      let item = {
        portId: this.submissions[n].id,
        index: n
      }
      eventBus.$emit('delete-submission', item)
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

<style scoped>
.deleteButton {
  background-color: red; /* Green */
  border: none;
  color: black;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 14px;
}
</style>
