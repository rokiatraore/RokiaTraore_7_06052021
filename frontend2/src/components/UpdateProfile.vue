<template>
    <div>
        <div class="form-group">
            <label for=""> Titre : </label>
            <textarea class="form-control title" id="username" rows="1" :value="user.username"></textarea>
        </div>
        <div class="form-group">
            <label for=""> Titre : </label>
            <textarea class="form-control title" id="email" rows="1" :value="user.email"></textarea>
        </div>
        <button class="btn btn-large btn-block btn-success" type="button" @click="updateProfile">
            <span>Modifier mon profile</span>
        </button> 

    </div>
</template>

<script>
import { mapState } from "vuex"
import axios from "axios";

export default {
    name: 'UpdateProfile',
    mounted: function() {
        //Récupérer les infos du user
        this.$store.dispatch('getUserProfile'); 
    },
    computed: {
        ...mapState(
            {
                user: 'userInfos',
            },
        ),
    },
    methods: {
         updateProfile(){ 
            //Récupérer le Token
            let objUser= localStorage.getItem("user");
            let objJson = JSON.parse(objUser);

            let newEmail = document.getElementById('email').value;
            let newUsername = document.getElementById('username').value;
            
             axios.put('http://localhost:3000/api/profile/', 
                {
                    email: newEmail,
                    username: newUsername
                },
                {
                    headers: {
                        "Authorization": "Bearer " + objJson.token
                    }
                }
            )
             .then(() => {
        //Renvoyer vers la pagposts
                alert('Profile modifié')
                    this.$router.push('/profile');
            })
            .catch(error => {
                console.log(error)
                alert("Vous n'avez pas les droits requis pour la suppression")
            })

        },
    }
}
</script>
