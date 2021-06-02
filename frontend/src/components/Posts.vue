<template>
<div >
    <div v-for="post in postInfos" :key="post.id">
        <h1 >{{ post.title }}</h1>
        <img v-bind:src="post.attachment" alt=""/>
        <p>{{ post.content }}</p>
        <p>{{ post.comments }}</p>
    </div>
</div>
</template>

<script>
import { mapState } from "vuex"
export default {
    name: 'Posts',
    mounted: function () {
        console.log(this.$store.state.postInfos)
         //Retourner sur la page de connexion si le user n'est pas authentifié
        if (this.$store.state.user.userId == ""){
            this.$router.push('/login');
            return;
        }
        this.$store.dispatch('getPosts')
    },
    computed: {
        ...mapState([
           'postInfos'
        ])
    },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
img {
    width: 90px;
}
</style>