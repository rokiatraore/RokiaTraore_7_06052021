<template>
    <div class="container bootstrap snippets bootdey">
        <div class="col-md-1"></div>
    <div class="col-md-12" v-if="post" >
    <div class="box box-widget">
        <div class="box-header with-border">
        <div class="user-block">
            <img class="img-circle" src="@/assets/user.png" alt="User Image">
            <span class="username">{{user.username}}</span>
            <span class="description">{{post.createdAt}}</span>
        </div>
        </div>

        <div class="box-body" style="display: block;">
            <img v-if="post.attachment != null" v-bind:src="post.attachment" alt="image du post" class="img-fluid"/>
            <h2>{{ post.title }}</h2>
            <p>{{ post.content }} </p>
        </div>
        
        <div class="box-footer text-center" style="display: block;">
        <form>
            <img class="img-responsive img-circle img-sm" src="@/assets/user.png" alt="Alt Text">
            <div class="img-push">
            <input type="text" class="form-control input-sm" placeholder="Ajouter un message" v-model="commentaire">
            </div>
            <button class="btn btn-large btn-block btn-primary btn-comment" type="button" @click="submitComment()">
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
                <span class="text-muted pull-right">{{ comment.createdAt}} {{user.isAdmin}}</span>
                </span>
                <div class="boxMessage"> 
                    {{ comment.message}} 
                    <button v-if="user.id == comment.userId || user.isAdmin === true" @click="deleteComment(comment.id)">X</button>
                </div>
            </div>
        </div>
        </div>
        <div class="col-md-1"></div>
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
            let admin = objJson.isAdmin;
            
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

body{
    margin-top:20px;
    background-color: #ecf0f5;
}
.box-widget {
    border: none;
    position: relative;
}
.box {
    position: relative;
    border-radius: 3px;
    background: #ffffff;
    border-top: 3px solid #d2d6de;
    margin-bottom: 20px;
    width: 100%;
    box-shadow: 0 1px 1px rgba(0,0,0,0.1);
}
.box-header.with-border {
    border-bottom: 1px solid #f4f4f4;
}
.box-header {
    color: #444;
    display: block;
    padding: 10px;
    position: relative;
}
.user-block img {
    width: 40px;
    height: 40px;
    float: left;
}
.user-block .username {
    font-size: 16px;
    font-weight: 600;
}
.user-block .description {
    color: #999;
    font-size: 13px;
}
.user-block .username, 
.user-block .description, 
.user-block .comment {
    display: block;
    margin-left: 50px;
}
.box-header>.box-tools {
    position: absolute;
    right: 10px;
    top: 5px;
}
.btn-box-tool {
    padding: 5px;
    font-size: 12px;
    background: transparent;
    color: #97a0b3;
}
.box-body {
    border-top-left-radius: 0;
    border-top-right-radius: 0;
    border-bottom-right-radius: 3px;
    border-bottom-left-radius: 3px;
    padding: 10px;
}
.pad {
    padding: 10px;
}
.box .btn-default {
    background-color: #f4f4f4;
    color: #444;
    border-color: #ddd;
}
.box-comments {
    background: #f7f7f7 !important;
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
.box .form-control {
    border-radius: 0;
    box-shadow: none;
    border-color: #d2d6de;
}

.btn-comment{
    margin-top: 15px;
}
</style>