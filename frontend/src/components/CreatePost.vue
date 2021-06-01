<template>
<form @submit.prevent="sendPost">
    <div class="newMessage">
        <input 
            type="text" 
            v-model="title" 
            placeholder="Titre"
        />
        <input 
            type="text" 
            v-model="content" 
            placeholder="Message"
        />
        <input 
            type="file" 
            ref="file" 
            v-on:change="fileUpload"
        />
        <button>Poster</button>
    </div>
</form>
</template>

<script>
import axios from 'axios'

export default {
    name: 'CreatePost',
    data() {
      return {
          title: '',
          content: '',
          file: ''
        }
    },
    methods: {
        fileUpload() {
            this.file = this.$refs.file.files[0];
        },
        async sendPost() {
            await axios.post('http://localhost:3000/api/messages/new',
                {
                    headers: {
                        Authorization: 'Bearer ' + localStorage.getItem('token')
                    }
                },
                {
                    title: this.title,
                    attachment: this.file,
                    content: this.content
                }
            )
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

</style>