<template>
  <div class="visuals">
    <p id="error">
      {{error}}
    </p>
    <p id="post">
      {{post}}
    </p>
  </div>
</template>

<script>
import { getPost } from '@/api.js'
export default {
  name: "visualization",
  data() {
    return {
      post: null,
      error: null
    }
  },
  beforeRouteEnter (to, from, next) {
    getPost(to.params.id, (err, post) => {
      next(vm => vm.setData(err, post))
    })
  },
  methods: {
    setData (err, post) {
      if (err) {
        this.error = err.toString()
      } else {
        this.post = post
      }
    }
  }
};
</script>

<style lang="scss" scoped></style>
