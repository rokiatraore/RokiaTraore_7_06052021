<template>
  <div class="register">
      <input type="text" v-model="username" placeholder="Entrer votre username"/>
      <input type="text" v-model="email" placeholder="Entrer votre Email"/>
      <input type="password" v-model="password" placeholder="Entrer votre mot de passe"/>
      <button v-on:click="signUp">S'enregistrer</button>>

  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'SignUp',
  data(){
    return{
      username: '',
      email: '',
      password:''
    }

  },
  methods: {
      async signUp(){
          let result = await axios.post('http://localhost:3000/api/signup',{
              email:this.email,
              username:this.username,
              password:this.password
          });

          console.log(result);
          if(result.status == 201){
              alert("Utilisateur enregistré")
              localStorage.setItem('user-info', JSON.stringify(result.data))
          }
      }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

</style>