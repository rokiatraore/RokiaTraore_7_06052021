import { createStore } from 'vuex'
import axios from 'axios'

//Configuration URL API
const instance = axios.create({
    baseURL: 'http://localhost:3000/api/'
})

const store = createStore ({
    state: {
        status: '',
        user: {
            userId : '',
            token : '',
        },
        userInfos: {
            username: '',
            email: '',
            id: ''
        }
    },
    mutations: {
        setStatus: (state, status) => {
            state.status = status;
        },
        logUser: (state, user) => {
            instance.defaults.headers.common['Authorization'] = user.token;
            state.user = user;
        },
        userInfos: (state, userInfos) => {
            state.userInfos = userInfos;
        },
    },
    //Création des méthodes
    actions: {
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
        }
    },
})

export default store;