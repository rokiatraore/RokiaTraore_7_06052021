<template>
  <div class="login">
    <h1 v-if="mode =='login'">Connexion</h1>
    <h1 v-else>Inscription</h1>
    <p v-if="mode =='login'">Pas encore de compte ?<span @click="switchToCreateAccount()">Créer un compte</span></p>
    <p v-else>J'ai un compte<span @click="switchToLogin()">Se connecter</span></p>

    <div>
      <input type="text" v-model="email" placeholder="Entrer votre Email"/>
    </div>
    <div v-if="mode =='create'">
    <input type="text" v-model="username" placeholder="Entrer votre username"/>
    </div>
    <div>
      <input type="password" v-model="password" placeholder="Entrer votre mot de passe"/>
    </div>
    <div v-if="mode == 'login' && status == 'errorLogin'">
      Adresse mail et/ou mot de passe invalide
    </div>
    <div v-if="mode == 'create' && status == 'errorCreate'">
      Adresse mail et/ou username déja utilisé
    </div>
    <div>
      <button v-if="mode =='login'" @click="login">
        <span v-if="status == 'loading'">Connexion en cours</span>
        <span v-else>Connexion</span>
      </button>
      <button v-else  @click="createAccount">
        <span v-if="status == 'loading'">Création en cours</span>
        <span v-else>Créer mon compte</span>
      </button>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'Login',
  data(){
    return{
      mode: 'login',
      username: '',
      email: '',
      password:'',
    }
  },
  computed: {
    ...mapState(['status'])
  },
  methods: {
    switchToCreateAccount() {
      this.mode = 'create';
    },
    switchToLogin() {
      this.mode = 'login';
    },
    login() {
      const self = this;
      //Appel API dans le store
      this.$store.dispatch('login', {
        email: this.email,
        password: this.password
      })
      .then(() => {
        //Renvoyer vers la page profile
        self.$router.push('/profile')
      })
      .catch(error => {
        console.log(error)
      })
    },
    createAccount() {
      const self = this;
      //Appel API dans le store
      this.$store.dispatch('createAccount', {
        email: this.email,
        username: this.username,
        password: this.password
      })
      .then(() => {
        self.login();
      })
      .catch(error => {
        console.log(error)
      })
    },

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
span {
  color: blue;
  text-decoration: underline;
  cursor: pointer;
}
</style>