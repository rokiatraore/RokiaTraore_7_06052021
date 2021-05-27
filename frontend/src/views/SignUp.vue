<template>
  <div class="homeSignUp">
    <SignUp />
  </div>
</template>

<script>
// @ is an alias to /src
import SignUp from '@/components/SignUp.vue'

export default {
  name: 'HomeSignUp',
  components: {
    SignUp,
  }
}
</script>