<template>
    <div class="container bootstrap snippets bootdey">
        <div class="row">
            <div class="col-md-9 gedf-main" v-if="post">
                <div class="card-header-one">
                    <div class="d-flex justify-content-between align-items-center">
                        <div class="d-flex justify-content-between align-items-center">
                            <div class="mr-2">
                                <img class="rounded-circle" width="45" src="@/assets/user.png" alt="">
                            </div>
                            <div class="ml-2">
                                <div class="h5 m-0">{{ user.username}}</div>
                            </div>
                        </div>
                    </div>
                </div>
            <div class="card-body">
                <div class="text-muted h7 mb-2"> 
                    <i class="fa fa-clock-o"></i> {{ post.createdAt }}
                </div>
                <p class="card-text"> {{ post.content }}</p>
                <img v-if="post.attachment !== null" v-bind:src="post.attachment" alt="image du post" class="img-fluid"/>

            </div>
            <div class="box-footer text-center" style="display: block;">
                <form>
                    <img class="img-responsive img-circle img-sm" src="@/assets/user.png" alt="Alt Text">
                    <div class="img-push">
                    <input type="text" class="form-control input-sm" placeholder="Ajouter un message" v-model="commentaire">
                    </div>
                    <button class="btn btn-large btn-block  btn-comment" type="button" @click="submitComment()">
                        <span>Commenter !</span>
                    </button>
                </form>
            </div>
            <div class="box-footer box-comments" style="display: block;" v-for="comment in post.comments" :key="comment.id" >
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
                window.location.reload()
            })
            .catch(error => {
                console.log(error)
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
.container{
    margin-top: 20px;
}
.box-comments {
    background: #f7f7f7 !important;
}

.card-header-one{
    padding: 0.5rem 1rem;
    margin-bottom: 0;
    background-color: rgb(251 226 203);
    border-bottom: 1px solid rgba(0, 0, 0, 0.125);
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
.btn-comment{
    margin-top: 15px;
    background-color: #f19f554d;
    box-shadow: 8px 6px 15px #6c757d9c;

}
</style>