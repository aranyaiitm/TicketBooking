import Fetchdata from "../Fetch.js"
import ApiUrl from '../config.js'

export default {
    template: `<div>
        <nav class="navbar navbar-expand-lg bg-body-tertiary mb-3">
            <div class="container-fluid">
                <router-link class="navbar-brand" aria-current="page" :to="{name:'home'}">Ticket Booking</router-link>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
                    <div class="navbar-nav me-auto mb-2 mb-lg-0">
                        <router-link v-if='isAdmin' class="nav-link active" aria-current="page" :to="{name:'admin_home'}">
                            Dashboard
                        </router-link>
                        <router-link v-if='isAdmin' class="nav-link" :to="{name:'summary'}">
                            Summary
                        </router-link>
                        <router-link class="nav-link" :to="{name:'bookings'}">
                            Bookings
                        </router-link>
                        <!-------- <a class="nav-link" href="#">Export</a> ----->
                    </div>
                    <div class="navbar-nav" v-if='loggedin'>
                        <span class="navbar-text me-2">
                            {{ user.email }}
                        </span>
                        <button class="nav-link btn" @click='userlogout'>Logout</button>
                    </div>
                </div>
            </div>
        </nav>
    </div>`,

    data() {
        return {
            user: {
                email: null,
                name: null,
                bookings: null,
                roles: null
            },
            error: null,
        }
    },

    methods: {
        ...Vuex.mapActions(['userlogout'])
    },

    computed: {
        ...Vuex.mapState(['useremail']),
        ...Vuex.mapState(['loggedin']),
        
        // compute_user() {
        //     if (this.$store.state.loggedin) {
        //         Fetchdata({  url: `${ApiUrl}/user`, authRequired: true })
        //         .then((data) => {
        //             return data
        //         })
        //         .catch((err) => {
        //             return err
        //         })
        //     }
        //     return null
        // },

        isAdmin() {
            if (this.user.roles != null) {
                for (let i =0; i < this.user.roles.length; i++) {
                    if (this.user.roles[i].name === 'admin') {
                        return true
                    }
                }
            }
            return false
        }
    },

    mounted() {
        if (this.$store.state.loggedin) {
            Fetchdata({  url: `${ApiUrl}/user`, authRequired: true })
            .then((data) => {
                this.user = data
                console.log( this.user)
            })
            .catch((err) => {
                this.error = err.message
            })
        }
    }
}