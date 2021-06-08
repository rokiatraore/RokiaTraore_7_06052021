<template>
<div class="container">
    <div>
        <router-link to="/posts/">Retour</router-link>
    </div>
    <div class="row main-row p-2" v-if="post">
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
        </div>
    </div>
    <div class="post-comment mb-2">
        <h1>Commentaires</h1>
        <div>
            <input type="text" v-model="commentaire" placeholder="Rédigez votre commentaire"/>
        </div>
        <p>{{ user.username }}</p>
        <button  @click="submitComment()">
        <span>Commenter !</span>
        </button>
        <p v-for="comment in post.comments" :key="comment.id">{{ comment.message }} </p>
    </div>
</div>
</template>

<script>
import axios from 'axios'
import { mapState } from "vuex"

export default {
    name: 'GetOnePost',
    data (){
        return{
            commentaire:'',
            nom:''
        }
    },
    methods: {
        submitComment() {

            //Récupérer le Token
            let objUser= localStorage.getItem("user");
            let objJson = JSON.parse(objUser);

            axios.post('http://localhost:3000/api/comment/'+this.$route.params.id,{message: this.commentaire}, {
                headers: {
                    "Authorization": "Bearer " + objJson.token
                }
            })
             .then(() => {
        //Renvoyer vers la pagposts
                alert('Votre commentaire a été posté !')
            })
            .catch(error => {
                console.log(error)
            })
        }
    },
    mounted: function() {
        //Récupérer les infos du user
        this.$store.dispatch('getUserProfile');  
    },
    computed: {
        post () {
            return this.$store.getters.post(parseInt(this.$route.params.id));
        },
        ...mapState({
            user: 'userInfos',
        })
    }
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