<template>
  <div class="setup">
    {{ instructions }} <br />
    <boardSelect />
    <br />
    <configOptions :submissions="submissions" />
  </div>
</template>

<script>
// TODO add Submissions to localStorage so that configOptions persists
import boardSelect from "@/components/boardSelect.vue";
import configOptions from "@/components/configOptions.vue";
import { eventBus } from "@/main.js";
export default {
  components: {
    boardSelect,
    configOptions
    // TODO delayElement
  },
  data() {
    return {
      instructions: "Please select a board type",
      submissions: []
    };
  },
  methods: {
  },
  mounted() {
    eventBus.$on("submitted", board => {
      if (this.submissions.length <= 4) {
        this.submissions.length === 0
          ? this.submissions.push(board)
          : this.submissions.unshift(board);
      } else {
        this.submissions.pop();
        this.submission.unshift(board);
      }
      const parsed = JSON.stringify(this.submissions)
      localStorage.setItem('submissions', parsed)
    });
    eventBus.$on("delete-submission", item => {
      this.submissions.splice(item.index, 1)
      const parsed = JSON.stringify(this.submissions)
      localStorage.setItem('submissions', parsed)
    })
    // NOTE Using localStorage to provide data on Reload
    //  Also to provide data to Visualization
    //  Client-Side Storage: https://vuejs.org/v2/cookbook/client-side-storage.html
    if (localStorage.getItem('submissions')) {
      try {
        this.submissions = JSON.parse(localStorage.getItem('submissions'))
      } catch(e) {
        // NOTE Destroy data if invalid
        localStorage.removeItem('submissions')
      }
    }
  }
};
</script>

<style scoped>
input {
  break-after: auto;
}
</style>
