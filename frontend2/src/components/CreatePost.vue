<template>
<div>
    <div>
      <input type="text" v-model="title" placeholder="Entrer votre Email"/>
    </div>
    <div>
        <input type="file" id="file" ref="file" v-on:change="handleFileUpload()"/>

    </div>
    <div>
      <input type="text" v-model="content" placeholder="Entrer votre mot de passe"/>
    </div>
     <button  @click="createPost">
        <span>Poster !</span>
      </button>
</div>

</template>

<script>

export default {
    name: 'CreateOnePost',
    data (){
        return{
            title: '',
            file: '',
            content:''
        }
    },
    methods: {
        handleFileUpload(){
            this.file = this.$refs.file.files[0];
        },
        createPost() {
            this.$store.dispatch('createPost', {
                title: this.title,
                attachment: this.file,
                content: this.content
            })
            .then(() => {
                console.log('ok')
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