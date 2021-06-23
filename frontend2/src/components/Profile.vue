<template>
    <div class="container bootstrap snippets bootdey">
    <div class="row">
        <!--- Information Profile-->
        <div class="col-md-3">
            <div class="panel rounded shadow profile-card">
                <div class="panel-body">
                    <div class="inner-all">
                        <ul class="list-unstyled">
                            <li class="text-center">
                                <img class="img-fluid" src="@/assets/user.png" alt="Marint month">
                            </li>
                            <li class="text-center">
                                <h4 class="text-capitalize">{{ user.username }}</h4>
                                <p class="text-muted text-capitalize"><i class="far fa-envelope"></i> {{ user.email }}</p>

                            </li>
                            <li><br></li>
                            <li>
                                <div class="btn-group-vertical btn-block">
                                    <router-link to="/updateprofile/" class="btn btn-default">
                                        <i class="fa fa-cog pull-right"></i> Modifier mon compte
                                    </router-link>
                                    <button class="btn btn-default btn-danger" type="button" @click="deleteProfile(user.id)">
                                        <span>Supprimer mon profil</span>
                                    </button>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
            <!--- \\\\\\\Post-->
            <div class="col-md-9 gedf-main post" >
                <h2 class="text-center" >Mes publications</h2>
                <div class="post" v-for="post in posts" :key="post.id" >
                    <div class="card gedf-card" v-if="post.UserId === user.id" >
                        <div class="card-header">
                            <div class="d-flex justify-content-between align-items-center">
                                <div class="d-flex justify-content-between align-items-center">
                                    <div class="mr-2">
                                        <img class="rounded-circle" width="45" src="@/assets/user.png" alt="">
                                    </div>
                                    <div class="ml-2">
                                        <div class="h5 m-0">{{ post.UserId}}</div>
                                    </div>
                                </div>
                                <div>
                                    <div >
                                        <!-- <span class="container my-5">
                                            <router-link :to="`/updatepost/${post.id}`" class="btn btn-success" > Modifier</router-link>
                                        </span> -->
                                        <button class="btn btn-link " type="button"  @click="deletePost(post.id)">
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
                        <div class="box-footer box-comments" style="display: block;" v-for="comment in post.comments" :key="comment.id" >
                            <h4 class="title-comment">Commentaires</h4>
                            <div class="box-comment">
                                <img class="img-circle img-sm" src="@/assets/user.png" alt="User Image">
                                <div class="comment-text">
                                    <span class="username">
                                    {{comment.name }}
                                    <span class="text-muted pull-right">{{ comment.createdAt}}</span>
                                    </span>
                                    <div class="boxMessage"> 
                                        {{ comment.message}} 
                                        <button type="button" class="btn btn-link" v-if="user.id == comment.userId || user.isAdmin === true" @click="deleteComment(comment.id)">
                                            <i class="far fa-trash-alt delete-post"></i>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- <h2 class="text-center" v-else>Vous n'avez aucune publications</h2> -->
                </div>
            </div>
            <!-- Post /////-->
    </div>
    </div>
</template>

<script>
import { mapState } from "vuex"
import axios from "axios"

export default {
    name: 'Profile',
    data(){
        return {
            posts: {}

        }
    },
    created () {
            let objUser= localStorage.getItem("user");
            let objJson = JSON.parse(objUser);

            axios.get('http://localhost:3000/api/messages/', {
                 headers: {
                    "Authorization": "Bearer " + objJson.token
                }
            }) 
                .then(response => {
                   this.posts = response.data;
                   console.log(this.posts)
                })
                .catch(error => {
                    console.log(error)
                });
    },
    mounted: function() {
        console.log(this.$store.state.user);
        //Retourner sur la page de connexion si le user n'est pas authentifié
        if (this.$store.state.user.userId == ""){
            this.$router.push('/');
            return;
        }
        //Récupérer les infos du user
        this.$store.dispatch('getUserProfile'); 
        //this.$store.dispatch('getPosts')
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
        logout: function () {
            this.$store.commit('logout');
            this.$router.push('/');
        },

        deletePost(id){ 
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

         deleteProfile(id){ 
            //Récupérer le Token
            let objUser= localStorage.getItem("user");
            let objJson = JSON.parse(objUser);
            
             axios.delete('http://localhost:3000/api/profile/'+id, {
                headers: {
                    "Authorization": "Bearer " + objJson.token
                }
            })
             .then(() => {
        //Renvoyer vers la pagposts
                confirm('Êtes-vous sûre de vouloir supprimer votre profile ?')
                    this.$store.commit('logout');
                    this.$router.push('/');
            })
            .catch(error => {
                console.log(error)
                alert("Vous n'avez pas les droits requis pour la suppression")
            })

        },
        deleteComment(id){ 
            //Récupérer le Token
            let objUser= localStorage.getItem("user");
            let objJson = JSON.parse(objUser);
            //let admin = objJson.isAdmin;
            
             axios.delete('http://localhost:3000/api/comment/'+id, {
                headers: {
                    "Authorization": "Bearer " + objJson.token
                }
            })
             .then(() => {
        //Renvoyer vers la pagposts
                confirm('Êtes-vous sûre de vouloir supprimer votre commentaire ?')
                window.location.reload()
            })
            .catch(error => {
                console.log(error)
                alert("Vous n'avez pas les droits requis pour la suppression")
            })

        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.container{
    padding-top: 10px;
}

.title-comment{
    padding: 10px;
    color: #495057;
    font-weight: 500;
    font-size: 20px;
}

.profile-card{
    background-color: white;
    overflow-wrap: anywhere;
}

.post {
    padding-bottom: 33px;
}

.box-footer {
    border-top-left-radius: 0;
    border-top-right-radius: 0;
    border-bottom-right-radius: 3px;
    border-bottom-left-radius: 3px;
    border-top: 1px solid #f4f4f4;
    padding: 10px;
    background-color: #fff;
}
.box-comments .box-comment:first-of-type {
    padding-top: 0;
}
.box-comments .box-comment {
    padding: 8px 0;
    border-bottom: 1px solid #eee;
}
.img-sm, 
.box-comments .box-comment img, 
.user-block.user-block-sm img {
    width: 30px !important;
    height: 30px !important;
}
.img-sm, .img-md, 
.img-lg, .box-comments .box-comment img, 
.user-block.user-block-sm img {
    float: left;
}
.box-comments .comment-text {
    margin-left: 40px;
    color: #555;
}
.box-comments .username {
    color: #444;
    display: block;
    font-weight: 600;
}
.box-comments .text-muted {
    font-weight: 400;
    font-size: 12px;
}
.boxMessage {
    display: flex;
    justify-content: space-between;
}
.img-sm+.img-push {
    margin-left: 40px;
}

</style>