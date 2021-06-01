<template>
<div>
    <div v-for="(post, index) in posts" :key=index>
        <h1>{{ post.title }}</h1>
        <img src="{{ post.attachment }}" alt="image Post" />
        <p>{{ post.content }}</p>
        <div>
            <p>{{ post.comments }}</p>
        </div>
    </div>
</div>
</template>

<script>
import axios from 'axios'

export default {
    name: 'Posts',
    data() {
      return {
          posts : null,
        }
    },
    mounted(){
        axios.get('http://localhost:3000/api/messages/',{
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token')
            }
        })
        .then(response => {
            this.posts = response.data
            console.log(this.posts)
        })
        .catch (error => console.log(error))
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

</style>