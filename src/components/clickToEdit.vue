<template>
  <div class="gridContent">
    <div v-if="valueIsNumber">
      <label v-if="preText" v-text="preText" />
      <input
        type="number"
        v-if="edit"
        v-model="valueLocal"
        @blur="changeValue()"
        @keyup.enter="changeValue()"
        min="1"
        max="8"
        v-focus
      />
      <b v-else @click="edit = true">{{ valueLocal }}</b>
    </div>
    <div v-else>
      <input
        type="text"
        v-if="edit"
        v-model="valueLocal"
        @blur="changeValue()"
        @keyup.enter="changeValue()"
        v-focus
      />
      <p v-else @click="edit = true">{{ valueLocal }}</p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    value: null,
    valueIsNumber: {
      type: Boolean,
      required: false
    },
    preText: {
      type: String,
      required: false
    }
  },
  model: {
    prop: "value",
    event: "change"
  },
  data() {
    return {
      edit: false,
      valueLocal: this.value
    };
  },
  watch: {
    // NOTE This must be "function()" and not an arrow function "() =>"
    /*
     Arrow functions have some important differences. 
     For example, they do not bind their own values of this
     https://stackoverflow.com/questions/24900875/whats-the-meaning-of-an-arrow-formed-from-equals-greater-than-in-javas
    */
    value: function() {
      this.valueLocal = this.value;
    }
  },
  computed: {
    inputType() {
      if (this.valueIsNumber) {
        return "number";
      } else {
        return "text";
      }
    }
  },
  methods: {
    changeValue() {
      this.edit = false;
      console.debug(`changeValue: ${event.target.value}`);
      this.$emit("change", event.target.value);
    }
  },
  directives: {
    focus: {
      inserted(el) {
        el.focus();
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.gridContent {
  display: contents;
}
</style>
