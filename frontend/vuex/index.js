import router from "../router/index.js";
import Fetchdata from "../Fetch.js";

const store = new Vuex.Store({
    state: {
        loggedin: localStorage.getItem('token') ? true : false,
        useremail: '',
        exportedFiles: []
    },

    getters: {
        token(state) {
            if (state.loggedin === true) {
                return localStorage.getItem('token')
            } else {
                return null
            }
        },
    },
    mutations:{
        login(state, email) {
            state.loggedin = true
            state.useremail = email
        },
        logout(state) {
            state.loggedin = false
            state.useremail = ''
        },
        addExportedFiles(state, filename) {
            state.exportedFiles.push(filename);
        }
    },

    actions: {
        async userlogin({ commit }, user) {
            const result = Fetchdata({
                url: 'http://127.0.0.1:8080/login?include_auth_token',
                obj: {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    method: 'POST',
                    body: JSON.stringify(user),
                },
            })
      
            result
                .then((data) => {
                    const token = data.response.user.authentication_token
                    localStorage.setItem('token', token)
                    commit('login', user.email)
                    router.push({ name: 'home' })
                })
                .catch((err) => {
                    console.log(err)
                })
        },

        userlogout({ commit }) {
            localStorage.removeItem('token')
            commit('logout')
            router.push({ name: 'login' })
        },

        async adminlogin({ commit }, admin) {
            const result = Fetchdata({
                url: 'http://127.0.0.1:8080/login?include_auth_token',
                obj: {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    method: 'POST',
                    body: JSON.stringify(admin),
                },
            })
      
            result
                .then((data) => {
                    const token = data.response.user.authentication_token
                    localStorage.setItem('token', token)
                    commit('login')
                    router.push({ name: 'admin_home' })
                })
                .catch((err) => {
                    console.log(err)
                })
        },
    }
})

export default store