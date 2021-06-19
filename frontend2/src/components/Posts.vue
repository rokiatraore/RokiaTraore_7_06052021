<template>
    <div class="container-fluid gedf-wrapper">
        <div class="row">
            <!--- \\\\\\\ Profile-->
            <div class="col-md-3">
                <div class="card">
                    <div class="card-body-profile">
                        <img class="img-profile" width="45" src="@/assets/user.png" alt="">
                        <div class="h5">{{user.username}}</div>
                        <div class="h7 text-muted">{{user.email}}</div>
                        <div class="h7">Chargé de clientèle </div>
                    </div>
                    <div class="my-profile">
                        <router-link :to="`/profile`" class="my-profile-link"><i class="far fa-id-badge"></i> Mon Profil</router-link>

                    </div>
                </div>
            </div>
            <!--- Profile /////-->
            <div class="col-md-6 gedf-main">
                <!--- \\\\\\ Add a Post-->
                <div class="card gedf-card" >
                    <div class="card-header">
                        <ul class="nav nav-tabs card-header-tabs" id="myTab" role="tablist">
                            <li class="nav-item">
                                <a class="nav-link active" id="posts-tab" data-toggle="tab" href="#posts" role="tab" aria-controls="posts" aria-selected="true">Ma Publication</a>
                            </li>
                        </ul>
                    </div>
                    <div class="card-body">
                        <div class="tab-content" id="myTabContent">
                            <div class="tab-pane fade show active" id="posts" role="tabpanel" aria-labelledby="posts-tab">
                                <div class="form-group">
                                    <label class="sr-only" for="message">post</label>
                                    <textarea class="form-control" id="message" rows="3" placeholder="Quoi de neuf ?" v-model="content" ></textarea>
                                </div>
                            <div class="upload-image">
                                <label>Télécharger une image</label>
                                <input type="file" id="file" ref="file" @change="fileSelected()">
                                <div class="preview">
                                    <img id="file-preview" class="img-fluid">
                                </div>
                            </div>
                            </div>
                        </div>
                        <div class="btn-toolbar justify-content-between">
                            <div class="btn-group">
                                <button type="submit" class="btn btn-primary" @click="submitPost()" >Poster</button>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- Add a Post /////-->

                <!--- \\\\\\\Post-->
                <div class="card gedf-card" v-for="post in postInfos" :key="post.id">
                    <div class="card-header">
                        <div class="d-flex justify-content-between align-items-center">
                            <div class="d-flex justify-content-between align-items-center">
                                <div class="mr-2">
                                    <img class="rounded-circle" width="45" src="@/assets/user.png" alt="">
                                </div>
                                <div class="ml-2">
                                    <div class="h5 m-0">{{ user.username}}</div>
                                </div>
                            </div>
                            <div>
                                <div >
                                    <button class="btn btn-link " type="button" v-if="user.isAdmin === true" @click="deletePostAdmin(post.id)">
                                        <i class="far fa-trash-alt delete-post"></i>
                                    </button>
                                </div>
                            </div>
                        </div>

                    </div>
                    <div class="card-body">
                        <div class="text-muted h7 mb-2"> <i class="fa fa-clock-o"></i> {{ post.createdAt }}</div>

                        <p class="card-text">
                            {{ post.content }}
                        </p>
                        <img v-if="post.attachment !== null" v-bind:src="post.attachment" alt="image du post" class="img-fluid"/>

                    </div>
                    <div class="card-footer">
                        <router-link :to="`/post/${post.id}`" class="card-link get-post"><i class="fas fa-eye"></i> Voir le post</router-link>
                    </div>
                </div>
                <!-- Post /////-->
            </div>

            <div class="col-md-3">
                <!-- ///// Favorite (fictif)-->
                <h5 class="card-title">Mes favoris</h5>
                <div class="card gedf-card">
                    <div class="card-body">
                        <img class="img-fluid" width="45" src="@/assets/user.png" alt="">
                        <p class="card-text">Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente ea quis repudiandae tenetur 
                            assumenda consectetur, voluptates rem consequuntur ullam ipsam similique iusto facere, tempora enim nulla quas nisi. Velit, tenetur..
                        </p>
                    </div>
                </div>
                <div class="card gedf-card">
                    <div class="card-body">
                        <img class="img-fluid" width="45" src="@/assets/user.png" alt="">
                        <p class="card-text">Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente ea quis repudiandae tenetur 
                            assumenda consectetur, voluptates rem consequuntur ullam ipsam similique iusto facere, tempora enim nulla quas nisi. Velit, tenetur..
                        </p>
                    </div>
                </div>
                <!-- Favorite /////-->
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
            file: '',
            content:'',
            userId:''
        }
    },
    mounted: function () {
        console.log(this.$store.state.postInfos)
         //Retourner sur la page de connexion si le user n'est pas authentifié
        if (this.$store.state.user.userId == ""){
            this.$router.push('/');
            return;
        }
        this.$store.dispatch('getPosts')
        this.$store.dispatch('getUserProfile');
    },
    computed: {
        ...mapState(
            {
                user: 'userInfos',
            },
        ),
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

            //Récupérer le Token
            let objUser= localStorage.getItem("user");
            let objJson = JSON.parse(objUser);
            
            axios.post('http://localhost:3000/api/messages/new', formData, {
                headers: {
                    "Authorization": "Bearer " + objJson.token
            }
            })
             .then(response => {
                 if(response.data.post.content === "" && response.data.post.attachment === null) {
                     alert('Le contenu de votre post est vide.')
                     console.log(response.data)
                 }
                else {
                    alert('Votre Message a été posté !')
                    console.log(response.data)
                   // window.location.reload()
                }
            })
            .catch(error => {
                console.log(error)
            })
        },
        deletePostAdmin(id){ 
            //Récupérer le Token
            let objUser= localStorage.getItem("user");
            let objJson = JSON.parse(objUser);
            
             axios.delete('http://localhost:3000/api/messages/'+id, {
                headers: {
                    "Authorization": "Bearer " + objJson.token
                }
            })
             .then(() => {
                //Renvoyer vers la pagposts
                confirm('Êtes-vous sûre de vouloir supprimer votre post ?')
                window.location.reload()
                })
            .catch(error => {
                console.log(error)
                alert("Vous n'avez pas les droits requis pour la suppression")
            })
        },
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Roboto&display=swap');
.container {
    font-family: 'Roboto', sans-serif;
}

.card-body-profile{
    text-align: center;
}

.img-profile {
    width: 100%;
    height: auto;
}
.my-profile{
    padding-top: 16px;
    text-align: center;
}
.my-profile-link, .get-post{
    text-decoration: none;
    color: #0a58ca;
}

.preview{
    display: flex;
    justify-content: center;
}
#file-preview{
    max-width: 100%;
    height: auto;
}
.delete-post{
    color: red;
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

.btn-group {
    padding-top: 10px;
}
</style>