import Vuex from 'vuex'
import Vue from 'vue'
import axios from 'axios'
Vue.use(Vuex)

//Configuration URL API
const instance = axios.create({
    baseURL: 'http://localhost:3000/api/'
})

let user = localStorage.getItem('user');
if (!user) {
    user = {
        userId : '',
        token : '',
    };
} else {
    try {
        user = JSON.parse(user)
        instance.defaults.headers.common['Authorization'] = `Bearer ${user.token}`;
    } catch (ex) {
        user = {
            userId : '',
            token : '',
        };
    }
}
const store = new Vuex.Store ({
    state: {
        status: '',
        user: user,
        userInfos: {
            username: '',
            email: '',
            id: ''
        },
        postInfos: {
            title: '',
            content:'',
            attachment: '',
            comments:[]
        },
        createPost: {
            title: '',
            attachment: '',
            content: '',
        },
    },
    mutations: {
        setStatus: (state, status) => {
            state.status = status;
        },
        logUser: (state, user) => {
            instance.defaults.headers.common['Authorization'] = `Bearer ${user.token}`;
            localStorage.setItem('user', JSON.stringify(user));
            state.user = user;
        },
        userInfos: (state, userInfos) => {
            state.userInfos = userInfos;
        },
        logout: (state) => {
            state.user = {
                userId : '',
                token : '',
            }
            localStorage.removeItem('user');
        },
        postInfos: (state, postInfos) => {
            instance.defaults.headers.common['Authorization'] = `Bearer ${user.token}`;
            state.postInfos = postInfos
        },
        createPost: (state, createPost) => {
            instance.defaults.headers.common['Authorization'] = `Bearer ${user.token}`;
            state.createPost = createPost;
        }
    },
    //Création des méthodes
    actions: {
        //User
        login: ({ commit }, userInfos) => {
            return new Promise ((resolve, reject) =>{
                commit('setStatus', 'loading');
                instance.post('/login', userInfos)
                .then(response => {
                    commit('setStatus', '');
                    commit('logUser', response.data);
                    resolve(response)
                })
                .catch(error => {
                    commit('setStatus', 'errorLogin');
                    reject(error)
                });
            })    
        },
        createAccount: ({ commit }, userInfos) => {
            return new Promise ((resolve, reject) =>{
                commit('setStatus', 'loading');
                instance.post('/signup', userInfos)
                .then(response => {
                    commit('setStatus', 'created');
                    resolve(response)
                })
                .catch(error => {
                    commit('setStatus', 'errorCreate');
                    reject(error)
                });
            })  
        },
        getUserProfile: ({commit}) => {
            instance.get('/profile')
                .then(response => {
                    commit('userInfos', response.data);
                })
                .catch(error => {
                    console.log(error)
                });
        },

        //Posts
        getPosts : ({commit}) => {
            instance.get('/messages')
            .then(response => {
                commit('postInfos', response.data)
            })
            .catch(error => {
                console.log(error)
            });
        },

        createPost : ({commit}) => {
            instance.post('/messages/new')
            .then(response => {
                commit('createPost', response.data)
            })
            .catch(error => {
                console.log(error)
            });
        },
        
    },
})

export default store;