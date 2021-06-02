<template>
  <div class="homePosts">
    <Posts />
  </div>
</template>

<script>
// @ is an alias to /src
import Posts from '@/components/Posts.vue'

export default {
  name: 'HomePosts',
  components: {
    Posts,
  }
}
</script>