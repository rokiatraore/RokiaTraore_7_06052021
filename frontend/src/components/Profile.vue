<template>
<div>
    <h1>Espace Personnel</h1>
    <p> Username : {{ user.username }}</p>
    <p>Adresse mail : {{ user.email }}</p>
    <button @click="logout()">Déconnexion</button>
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
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

</style>