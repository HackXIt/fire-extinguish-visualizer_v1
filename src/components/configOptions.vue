<template>
  <div id="configOptions" v-if="notEmpty">
    <div v-for="(submission, index) in submissions" :key="index">
      <button @click="removeSubmission(index)" class="deleteButton">
        <img :src="require('@/assets/delete.png')" />Delete
      </button>
      <click-to-edit v-model="submissions[index].description" />
      <label v-if="duplicateValue(submission.IO)" v-text="warning" />
      <click-to-edit
        v-for="n in submission.amount"
        :key="n"
        v-model.number="submissions[index].IO[n - 1]"
        :valueIsNumber="true"
        :preText="submission.board.boardType.toUpperCase() + '-'"
      />
      <!-- TODO make Activation of IO-A dependant/reactive to IO-B
      <select>
        <optgroup v-for="(submission, index) in submissions" :key="index"
          :label="submission.description">
          <option v-for="(io, index) in submission.IO" :key="io"
            v-text="`${submission.board.boardType}-${io}`"
          />
        </optgroup>
      </select> -->
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
  },
  data() {
    return {
      warning: ""
    };
  },
  computed: {
    notEmpty() {
      return this.submissions.length > 0 ? true : false;
    }
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
        portId: this.submissions[n].port.id,
        index: n
      };
      eventBus.$emit("delete-submission", item);
    },
    createLink(ref, link) {
      const obj = {
        ref,
        link
      };
      console.debug(obj);
      return obj;
    }
  }
};
</script>

<style scoped>
.deleteButton {
  background-color: red;
  border: none;
  color: black;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 14px;
}
</style>
