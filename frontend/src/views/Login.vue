<template>
  <div class="homeSignUp">
    <Login />
  </div>
</template>

<script>
// @ is an alias to /src
import Login from '@/components/Login.vue'

export default {
  name: 'HomeSignUp',
  components: {
    Login,
  }
}
</script>