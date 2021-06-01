<template>
  <div class="createMessage">
    <CreatePost />
  </div>
</template>

<script>
// @ is an alias to /src
import CreatePost from '@/components/CreatePost.vue'

export default {
  name: 'CreateMessage',
  components: {
    CreatePost,
  }
}
</script>