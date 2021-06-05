<template>
  <div class="homeCreatePost">
    <CreatePost />
  </div>
</template>

<script>
// @ is an alias to /src
import CreatePost from '@/components/CreatePost.vue'

export default {
  name: 'CreatePostBody',
  components: {
    CreatePost,
  }
}
</script>