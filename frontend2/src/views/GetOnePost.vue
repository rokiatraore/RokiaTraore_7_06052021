<template>
  <div class="homeGetOnePost">
    <b-navbar toggleable="lg" type="light" variant="light">
      <b-navbar-brand href="/posts"><img :src="require(`@/assets/icon-left-font-monochrome-black.png`) " class="img-fluid" alt="logo"/>
    </b-navbar-brand>
      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav class="ml-auto">
          <b-nav-item-dropdown right>
            <template #button-content>
              <em>User</em>
            </template>
            <b-nav-item href="/profile">Profile</b-nav-item>
            <b-dropdown-item @click="logout()" href="#">Déconnexion</b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
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
  }
}
</script>
<style lang="scss" scoped>
.img-fluid {
  width: 150px
}
</style>