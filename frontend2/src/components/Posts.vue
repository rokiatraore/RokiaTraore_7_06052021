<template>
<div class="container">
    <div class="row main-row p-2" v-for="post in postInfos" :key="post.id">
        <div class="col-lg-4 col-md-12 col-sm-12">
            <div class="blog-img">
                <img v-bind:src="post.attachment" alt="image du post" class="img-fluid"/>
            </div>
        </div>
        <div class="col-lg-8 col-md-12 col-sm-12">
            <div class="post-title mb-3">
                <h2>{{ post.title }}</h2>
            </div>
            <div class="post-date mb-2">
                <span>3 Janvier</span>
            </div>
            <div class="post-content mb-2">
                <p>{{ post.content }}  </p>
            </div>
            <div>
                <router-link :to="`/post/${post.id}`">Voir le post</router-link>
            </div>
        </div>
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
        ...mapState(['postInfos']),
    },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Roboto&display=swap');
.container {
    font-family: 'Roboto', sans-serif;
}

.main-row {
    margin: 8%;
    background-color: white;
    box-shadow: 0 0 10px 10px rgba(0,0,0,0.5);
    border-radius: 0.5rem;
}

img {
    width: 70%;
    height: 100%;
    transform: translateY(-30px);
    object-fit: cover;
    border-radius: 0.5rem;
    box-shadow: 0 0 8px 3px rgba(0,0,0,.3) ;
}
span {
    color: #962c51;
}

.blog-title > h2{
    font-style: normal;
    font-weight: 400;
}
</style>