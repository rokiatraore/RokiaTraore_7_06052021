<template>
  <div class="homeProfile">
    <Posts />
  </div>
</template>

<script>
// @ is an alias to /src
import Posts from '@/components/Posts.vue'

export default {
  name: 'HomeProfile',
  components: {
    Posts,
  }
}
</script>