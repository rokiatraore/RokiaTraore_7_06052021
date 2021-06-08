<template>
<div>
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

        <div class="container">
            <div class="row d-flex justify-content-center">
                <div class="col-md-10 mt-5 pt-5">
                    <div class="row z-depth-3">
                        <div class="col-sm-4 bg-info rounded-left">
                            <div class="card-block text-center text-white">
                                <i class="fas fa-user-tie fa-7x mt-5"></i>
                                <h2 class="font-weight-bold mt-4">{{ user.username }}</h2>
                                <i class="fas fa-edit fa-2x mb-4"></i>
                                <i class="far fa-trash-alt fa-2x mb-4"></i>
                            </div>
                        </div>
                        <div class="col-sm-8 bg-white rounded-right">
                            <h3 class="mt-3 text-center">Information</h3>
                            <hr class="badge-primary mt-0 w-25">
                            <div class="row">
                                <div class="col-sm-6">
                                    <p class="font-weight-bold">Email:</p>
                                    <h6 class="text-muted">{{ user.email }}</h6>
                                </div>
                                <div class="col-sm-6">
                                    <p class="font-weight-bold">Username:</p>
                                    <h6 class="text-muted">{{ user.username }}</h6>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
</div>
</template>

<script>
import { mapState } from "vuex"


export default {
    name: 'Profile',
    mounted: function() {
        console.log(this.$store.state.user);
        //Retourner sur la page de connexion si le user n'est pas authentifié
        if (this.$store.state.user.userId == ""){
            this.$router.push('/login');
            return;
        }
        //Récupérer les infos du user
        this.$store.dispatch('getUserProfile');  
    },
    computed: {
        ...mapState({
            user: 'userInfos',
        })
    },
    methods: {
        logout: function () {
            this.$store.commit('logout');
            this.$router.push('/login');
        },
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.img-fluid {
  width: 150px
}
.d-flex {
    margin: 8%;
    background-color: white;
    box-shadow: 0 0 10px 10px rgba(0,0,0,0.5);
    border-radius: 0.5rem;
}
</style>