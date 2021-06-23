<template>
  <div class="container">
    <div class="row content">
      <b-row class="justify-content-md-center">
      <b-col md="4">
        <img :src="require(`@/assets/icon-left-font.png`) " class="img-fluid" alt="logo"/>
      </b-col>
    </b-row>
      <div class="col-md-6 md-3 signin" >
        <h3 class="signin-text mb-3" v-if="mode =='login'">Se connecter</h3>
        <h3 class="signin-text mb-3" v-else>Inscription</h3>
        <p v-if="mode =='login'">Pas encore de compte ? <span class="switch" @click="switchToCreateAccount()">Créer un compte</span></p>
        <p v-else>J'ai un compte ? <span class="switch" @click="switchToLogin()">Se connecter</span></p>
        <form>
          <div class="form-group">
            <label for="email">Email</label>
            <input type="text" v-model="email" required />
          </div>
          <div class="form-group" v-if="mode =='create'">
            <label for="username">Nom d'utilisateur</label>
            <input type="text" v-model="username" required  />
          </div>
          <div class="form-group">
            <label for="password">Mot de passe</label>
            <input type="password"  v-model="password" required />
          </div>
          <div v-if="mode == 'login' && status == 'errorLogin'">
            <span>Adresse mail et/ou mot de passe invalide</span>
          </div>
          <div v-if="mode == 'create' && status == 'errorCreate'">
            <span>Adresse mail et/ou nom d'utilisateur déja utilisé</span>
          </div>
          <button class="btn btn-class" v-if="mode =='login'" @click="login">
            <span v-if="status == 'loading'">Connexion en cours</span>
            <span v-else>Se connecter</span>
          </button>
          <button class="btn btn-class"  v-else  @click="createAccount">
            <span v-if="status == 'loading'">Création en cours</span>
            <span v-else>Créer mon compte</span>
          </button>
        </form>
      </div>
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
      username: null,
      email: null,
      password: null,
    }
  },
  mounted: function () {
    //Rediriger l'utilisateur sur la page posts s'il est authentifié
    if (this.$store.state.user.userId != ""){
      this.$router.push('/posts');
      return;
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
    login(e) {
      e.preventDefault();
      //Appel API dans le store
      this.$store.dispatch('login', {
        email: this.email,
        password: this.password
      })
      .then(() => {
        //Renvoyer vers la page posts
        this.$router.push('/posts')
      })
      .catch(error => {
        console.log(error)
      })
    },
    createAccount(e) {
      e.preventDefault();
      //Appel API dans le store
      this.$store.dispatch('createAccount', {
        email: this.email,
        username: this.username,
        password: this.password
      })
      .then(() => {
       this.$router.push('/posts')
      })
      .catch(error => {
        console.log(error)
      })
    },

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style  lang="scss" scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins&display=swap');
.container{
  font-family: 'Poppins', sans-serif;
}
.signin{
  margin: auto;
}
.switch{
  text-decoration: underline;
  cursor: pointer;
}
.content{
  margin: 8%;
  background-color: #fff;
  padding:4rem 1rem 4rem 1rem;
  box-shadow: 0 0 5px 5px rgba(0,0,0, .05);
}

.signin-text{
  font-style: normal;
  font-weight: 600 !important;
}

.form-group{
  display: block;
  width: 100%;
  font-size: 1rem;
  outline-style: none;
  font-weight: 400;
  line-height: 2.5;
  border-color: #c2c2c2 !important ;
  border-style: solid !important;
  border-width: 0 0 1px 0 !important;
  padding: 0px !important;
  color:#495057;
  height: auto;
  border-radius: 0;
  background-color: #fff;
  background-clip: padding-box;
}

.form-group:focus{
  color:#495057;
  background-color: #fff;
  border-color: #fff;
  outline: 0;
  box-shadow: none;
}
label {
  margin-right: 20px;
}
input{
  border: none;
}
input:focus{
  border:none
}

.btn-class{
  border-color: #f3cfb1;
  color: #f3cfb1;
  margin-top: 20px;
}

.btn-class:hover{
  background-color: #f3cfb1;
  color: #fff;
}
</style>