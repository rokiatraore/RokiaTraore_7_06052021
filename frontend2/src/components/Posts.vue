<template>
    <div class="container gedf-wrapper">
        <div class="row">
            <div class="col-md-1">
            </div>
            <div class="col-md-10 gedf-main">
                <!--- Submit Post-->
                <div class="card gedf-card">
                    <div class="card-header card-header-submit">
                        <ul class="nav nav-tabs card-header-tabs" id="myTab" role="tablist">
                            <li class="nav-item">
                                <a class="nav-link active" id="posts-tab" data-toggle="tab" href="#posts" role="tab" aria-controls="posts" aria-selected="true">Poster une publication</a>
                            </li>
                        </ul>
                    </div>
                    <div class="card-body">
                        <div class="tab-content" id="myTabContent">
                            <div class="tab-pane fade show active" id="posts" role="tabpanel" aria-labelledby="posts-tab">
                                <div class="form-group">
                                    <textarea class="form-control" id="message" rows="1" placeholder="Titre du Post" v-model="title"></textarea>
                                </div>
                                <div class="form-group">
                                    <textarea class="form-control" id="message" rows="3" placeholder="Contenu du Post" v-model="content" ></textarea>
                                </div>
                            </div>
                            <div class="upload-image">
                                <label>Télécharger une image</label>
                                <input type="file" id="file" ref="file" @change="fileSelected()">
                                <div class="preview">
                                    <img id="file-preview">
                                </div>
                            </div>
                        </div>
                        <div class="btn-toolbar justify-content-between">
                            <div class="btn-group">
                                <button type="submit" class="btn btn-poster" @click="submitPost()">Poster</button>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- Submit Post end-->

                <!--- Post-->
                <div class="card gedf-card" v-for="post in postInfos" :key="post.id">
                    <div class="card-header">
                        <div class="d-flex justify-content-between align-items-center">
                            <div class="d-flex justify-content-between align-items-center">
                                <div class="mr-2">
                                    <img class="rounded-circle" width="45" src="@/assets/user.png" alt="">
                                </div>
                                <div class="ml-2">
                                    <div class="h7 text-muted"> Nom d'utilisateur</div>
                                </div>
                            </div>
                        </div>

                    </div>
                    <div class="card-body">
                        <div class="text-muted h7 mb-2"> <i class="fa fa-clock-o"></i> {{ post.createdAt }} </div>
                            <h5 class="card-title">{{ post.title }}</h5>
                            <img v-bind:src="post.attachment" alt="image du post" class="img-fluid"/>
                            <p class="card-text">{{ post.content }}</p>
                    </div>
                    <div class="card-footer text-center">
                        <router-link :to="`/post/${post.id}`" class="getPost"><i class="far fa-eye"></i> Voir le post</router-link>
                    </div>
                </div>
                <!-- Post End-->
            </div>
            <div class="col-md-1">
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
                //this.$router.push('/posts');
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
.gedf-wrapper {
    margin-top: 0.97rem;
}
.gedf-main {
    padding-left: 4rem;
    padding-right: 4rem;
}
.gedf-card {
    margin-bottom: 2.77rem;
}
.card-header-submit{
    background-color: #fff !important;
}
.card-header{
    background-color:#f0b27a54 ;
}

.form-group  {
    padding: 10px;
}

.upload-image{
    padding: 10px;
}

.getPost {
    text-decoration: none;
    color: black;
}
</style>