<template>

<div class="container">
    <div class="containerCreatePost">
        <div>
        <input type="text" v-model="title" placeholder="Titre"/>
        </div>
        <div>
            <label>Télécharger une image</label>
            <input type="file" id="file" ref="file" @change="fileSelected()">
            <div class="preview">
                <img id="file-preview">
            </div>
        </div>
        <div>
        <input type="text" v-model="content" placeholder="message"/>
        </div>
        <button  @click="submitPost()">
            <span>Poster !</span>
        </button>
    </div>
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
import axios from 'axios'

export default {
    name: 'Posts',
     data (){
        return{
            title: '',
            file: '',
            content:'',
            userId:''
        }
    },
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
    methods: {
        fileSelected(){
            this.file = this.$refs.file.files[0];
            let src = URL.createObjectURL(this.file);
            let preview = document.getElementById('file-preview');
            preview.src = src;
            preview.style.display = "block";
            console.log(this.file)
        },
        submitPost() {
            //Récupérer les informations du message
            const formData = new FormData();
            formData.append('image', this.file)
            formData.append('content', this.content)
            formData.append('title', this.title)

            //Récupérer le Token
            let objUser= localStorage.getItem("user");
            let objJson = JSON.parse(objUser);
            
            axios.post('http://localhost:3000/api/messages/new', formData, {
                headers: {
                    "Authorization": "Bearer " + objJson.token
            }
            })
             .then(() => {
                alert('Votre Message a été posté !')
                this.$router.push('/posts');
            })
            .catch(error => {
                console.log(error)
            })
        }
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