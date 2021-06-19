<template>
  <div class="homePosts">
   <div class="menu-bar">
     <nav class="main-navigation">
        <div class="navbar-header animated fadeInUp">
            <img :src="require(`@/assets/icon-left-font-monochrome-white.png`) " class="img-fluid" alt="logo"/>
        </div>
        <ul class="nav-list">
          <li class="nav-list-item">
              <b-nav-item href="/posts"> Accueil</b-nav-item>
            </li>
            <li class="nav-list-item">
              <b-nav-item href="/profile"> Mon Profil</b-nav-item>
            </li>
            <li class="nav-list-item" >
              <b-nav-item @click="logout()" href="#"><i class="fas fa-sign-out-alt"></i> Déconnexion</b-nav-item>
            </li>
        </ul>
    </nav>
  </div>
  <GetOnePost />
</div>
</template>

<script>
// @ is an alias to /src
import GetOnePost from '@/components/GetOnePost.vue'

export default {
  name: 'GetOnePostBody',
  components: {
    GetOnePost,
  },
  methods: {
        logout: function () {
            this.$store.commit('logout');
            this.$router.push('/');
        },
  }
}
</script>
<style lang="scss" scoped>
.homePosts {
  background-color: #f1c7aa2b;
}
.img-fluid {
  width: 46%;
  height: 142px;
  object-fit: cover;
}

.menu-bar {
  background-color: #ef8526c4;
}
.navbar-header {
  display: flex;
  justify-content: center;
}
 

nav.main-navigation {
  position: relative;
}

nav.main-navigation ul.nav-list {
  margin: 0;
  padding: 0;
  list-style: none;
  position: relative;
  text-align: right;
}

.nav-list li.nav-list-item {
    display: inline-block;
    line-height: 40px;
    margin-left: 30px;
    margin-top: 15px;
}

a.nav-link {
    text-decoration: none;
    font-size: 18px;
    font-family: sans-serif;
    font-weight: 500;
    cursor: pointer;
    position: relative;
    color: #404040;
}

@keyframes FadeIn {
    0% {
        opacity: 0;
        -webkit-transition-duration: 0.8s;
        transition-duration: 0.8s;
        -webkit-transform: translateY(-10px);
        -ms-transform: translateY(-10px);
        transform: translateY(-10px);
    }


    100% {
        opacity: 1;
        -webkit-transform: translateY(0);
        -ms-transform: translateY(0);
        transform: translateY(0);
        pointer-events: auto;
        transition: cubic-bezier(0.4, 0, 0.2, 1);
    }
}

.nav-list li {
    animation: FadeIn 1s cubic-bezier(0.65, 0.05, 0.36, 1);
    animation-fill-mode: both;
}

.nav-list li:nth-child(1) {
    animation-delay: .3s;
}

.nav-list li:nth-child(2) {
    animation-delay: .6s;
}

.nav-list li:nth-child(3) {
    animation-delay: .9s;
}

.nav-list li:nth-child(4) {
    animation-delay: 1.2s;
}

.nav-list li:nth-child(5) {
    animation-delay: 1.5s;
}

/* Animation */

@keyframes fadeInUp {
    from {
        transform: translate3d(0, 40px, 0)
    }

    to {
        transform: translate3d(0, 0, 0);
        opacity: 1
    }
}

@-webkit-keyframes fadeInUp {
    from {
        transform: translate3d(0, 40px, 0)
    }

    to {
        transform: translate3d(0, 0, 0);
        opacity: 1
    }
}

.animated {
    animation-duration: 1s;
    animation-fill-mode: both;
    -webkit-animation-duration: 1s;
    -webkit-animation-fill-mode: both
}

.animatedFadeInUp {
    opacity: 0
}

.fadeInUp {
    opacity: 0;
    animation-name: fadeInUp;
    -webkit-animation-name: fadeInUp;
}
</style>