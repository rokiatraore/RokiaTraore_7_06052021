<template>
<div>
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

</template>

<script>
import axios from 'axios'
export default {
    name: 'CreateOnePost',
    data (){
        return{
            title: '',
            file: '',
            content:'',
            userId:''
        }
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
<style >

</style>