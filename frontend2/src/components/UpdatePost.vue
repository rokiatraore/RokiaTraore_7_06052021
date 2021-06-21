<template>
    <div class="container bootstrap snippets bootdey">
        <div class="row">
            <div ></div>
                <div class=" gedf-main" >
                    <!--- \\\\\\\Add a Post-->
                    <div class="card gedf-card" >
                        <div class="card-header">
                            <ul class="nav nav-tabs card-header-tabs" id="myTab" role="tablist">
                                <li class="nav-item">
                                    <p>Ma Publication</p>
                                </li>
                            </ul>
                        </div>
                        <div class="card-body">
                            <div class="tab-content" id="myTabContent">
                                <div class="tab-pane fade show active" id="posts" role="tabpanel" aria-labelledby="posts-tab">
                                    <div class="form-group">
                                        <label class="sr-only" for="content">Message : </label>
                                        <textarea class="form-control" id="content" rows="3" :value="post.content" ></textarea>
                                    </div>
                                <div class="upload-image">
                                    <label>Télécharger une nouvelle image</label>
                                    <input type="file" id="newFile" ref="file1" name="Choisir une image" @change="newFileSelected()">
                                    <div class="preview">
                                        <img id="newFile-preview"  :src="post.attachment" alt="image du post" class="img-fluid" >
                                    </div>
                                </div>
                                </div>
                            </div>
                            <div class="btn-toolbar justify-content-between">
                                <div class="btn-group">
                                    <button class="btn btn-large btn-block btn-success" type="button" @click="updatePost(post.id)">
                                        <span>Modifier le Post</span>
                                    </button>                             
                                </div>
                            </div>
                        </div>
                    </div>
        </div>
        
        </div>
    </div>
</template>

<script>
//import axios from 'axios'
import { mapState } from "vuex"
import axios from 'axios'


export default {
    name: 'updatePost',
    data (){
        return{
            file: null,
            post: {}
        }
    },
    created () {
          const id = (parseInt(this.$route.params.id));
            let objUser= localStorage.getItem("user");
            let objJson = JSON.parse(objUser);

            axios.get('http://localhost:3000/api/messages/' + id, {
                 headers: {
                    "Authorization": "Bearer " + objJson.token
                }
            }) 
                .then(response => {
                   this.post = response.data;
                   console.log(this.post)
                })
                .catch(error => {
                    console.log(error)
                });
    },
    methods: {
         newFileSelected(){
            this.file = this.$refs.file1.files[0];
            let src = URL.createObjectURL(this.file);
            let preview = document.getElementById('newFile-preview');
            preview.src = src;
            preview.style.display = "block";
            console.log(this.file)
        },
        updatePost(id) {
                    //Récupérer les informations du message
                    const newFile = new FormData();
                    newFile.append('image', this.file)

                    let newContent = document.getElementById('content').value;
    
                    //Récupérer le Token
                    let objUser= localStorage.getItem("user");
                    let objJson = JSON.parse(objUser);
                    
                    axios.put('http://localhost:3000/api/messages/'+ id ,
                        {
                            content: newContent,
                            image: newFile
                        },
                        {
                            headers: {
                                "Authorization": "Bearer " + objJson.token
                            }
                        }
                    )
                    .then(() => {
                        alert('Votre post a été modifié !' + JSON.stringify(newFile) + newContent)
                        //window.location.reload()
                    })
                    .catch(error => {
                        console.log(error)
                    })
                },

    },
    mounted: function() {
        //Récupérer les infos du user
        this.$store.dispatch('getUserProfile');  
    },
    computed: {
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