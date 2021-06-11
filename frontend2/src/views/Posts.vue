<template>
<div class="homePosts">
  <div class="menu-bar">
    <nav class="navbar navbar-expand-lg navbar-light">
      <div class="container-fluid">
        <b-nav-item href="/profile"><img :src="require(`@/assets/icon-left-font-monochrome-white.png`) " class="img-fluid" alt="logo"/></b-nav-item>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <b-nav-item-dropdown class="d-flex">
                <template #button-content>
                  <em>User</em>
                </template>
                <b-nav-item href="/profile">Profile</b-nav-item>
                <b-dropdown-item @click="logout()" href="#">Déconnexion</b-dropdown-item>
              </b-nav-item-dropdown>
          </ul>
        </div>
      </div>
    </nav>
  </div>

    <Posts />
</div>
</template>

<script>
// @ is an alias to /src
import Posts from '@/components/Posts.vue'

export default {
  name: 'PostsBody',
  components: {
    Posts,
  },
  methods: {
        logout: function () {
            this.$store.commit('logout');
            this.$router.push('/');
        }
    }
}

</script>

<style lang="scss" scoped>
.img-fluid {
  width: 150px
}

.menu-bar {
  background-color: #F0B27A;
}
</style>
