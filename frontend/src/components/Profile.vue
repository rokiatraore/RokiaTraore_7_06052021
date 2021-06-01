<template>
<div>
    <h1>Bonjour</h1>
</div>
</template>

<script>

export default {
    name: 'Profile',
    mounted: function() {
        console.log(this.$store.state.user);
        //Retourner sur la page de conenexion si le user n'est pas authentifié
        if (this.$store.state.user.userId == ""){
            this.$router.push('/login')
            return;
        }
        //Récupérer les infos du user
        this.$store.dispatch('getUserProfile');
        
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

</style>