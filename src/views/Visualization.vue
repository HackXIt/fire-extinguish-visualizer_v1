<template>
  <div class="visuals">
    <!-- <p id="error">
      {{ error }}
    </p>
    <p id="post">
      {{ post }}
    </p> -->
    <p v-for="(submission, index) in submissions" :key="index">
      {{ submission.board.boardType }}
      {{ submission.port.name }}
      {{ submission.amount }}
    </p>
  </div>
</template>

<script>
// NOTE KEPT FOR LATER
// import { getPost } from "@/api.js";
// export default {
//   name: "visualization",
//   data() {
//     return {
//       post: null,
//       error: null
//     };
//   },
//   beforeRouteEnter(to, from, next) {
//     getPost(to.params.id, (err, post) => {
//       next(vm => vm.setData(err, post));
//     });
//   },
//   methods: {
//     setData(err, post) {
//       if (err) {
//         this.error = err.toString();
//       } else {
//         this.post = post;
//       }
//     }
//   }
// };
export default {
  name: "Visualization",
  data() {
    return {
      submissions: []
    };
  },
  mounted() {
    if (localStorage.getItem("submissions")) {
      try {
        this.submissions = JSON.parse(localStorage.getItem("submissions"));
      } catch (e) {
        // NOTE Destroy data if invalid
        localStorage.removeItem("submissions");
      }
    }
  }
};
</script>

<style lang="scss" scoped></style>
