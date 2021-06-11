<template>
    <div class="container bootstrap snippets bootdey">
        <div class="row">
            <div class="col-md-3">
                <div class="panel rounded shadow">
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
                                        <a href="" class="btn btn-default"><i class="fa fa-cog pull-right"></i> Modifier mon compte</a>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-md-9">
                <div class="panel cover rounded shadow no-overflow" style="height:200px;">
                    <h2 class="text-center">Vos publications</h2>
                    <div class="panel-body"  v-for="post in postInfos" :key="post.id" >
                        <div v-if="post.UserId == user.id" class="card-text">
                            <!--- Post-->
                                <div class="card-header">
                                    <div class="d-flex justify-content-between align-items-center">
                                        <div class="d-flex justify-content-between align-items-center">
                                            <div class="mr-2">
                                                <img class="rounded-circle" width="45" src="@/assets/user.png" alt="">
                                            </div>
                                            <div class="ml-2">
                                                <div class="h7 text-muted"> {{post.UserId}}</div>
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
                                <button class="btn btn-large btn-block btn-danger" type="button" @click="deletePost(post.id)">
                                    <span>Supprimer le Post</span>
                                </button>
                            
                            <!-- Post End-->
                        </div>
            <div class="col-md-1">
                        </div>
                    
                    </div>
                </div>
            </div>
    </div>
    </div>
</template>

<script>
import { mapState } from "vuex"
import axios from "axios"


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
        this.$store.dispatch('getPosts')
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
            this.$router.push('/login');
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
</style>