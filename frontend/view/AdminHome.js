import Theatre from "../components/Theatre.js"
import Fetchdata from "../Fetch.js"
import ApiUrl from '../config.js'

export default {
    template: `<div>
        <div class="container" style="min-height: 79vh;">
            <div class="row row-cols-1 row-cols-md-3 g-4">
                    <!-- Theatre -->
                <Theatre v-for="(theatre, index) in user.theatres" :key="theatre.theatre_id" v-bind:theatre='theatre' @remove="deltheatre(index)"/>
                <div class="col">
                    <router-link class="card btn btn-light h-100 text-center" style="min-height: 50vh;" :to="{name:'addtheatre'}">
                        <h1 class="my-auto"><i class="bi bi-file-earmark-plus-fill"></i></h1>
                    </router-link>
                </div>
            </div>
        </div>
    </div>`,

    components: {
        Theatre
    },

    data() {
        return {
            user: {
                email: null,
                name: null,
                roles: null,
                theatres: null
            },
            error: null,
        }
    },
    
    methods: {
        deltheatre(index) {
            Fetchdata({
                url: `${ApiUrl}/theatre/${this.user.theatres[index].theatre_id}`,
                obj: {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    method: 'DELETE'
                },
                authRequired: true
            })
            .then((data) => {
                console.log( data)
            })
            .catch((err) => {
                this.error = err.message
            })
            this.user.theatres.splice(index, 1)
        }
    },

    computed: {
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
        if (this.$store.state.loggedin === false) {
            this.$router.push({ name: 'adminlogin' })
        } else {
            Fetchdata({  url: `${ApiUrl}/admin`, authRequired: true })
            .then((data) => {
                this.user = data
                console.log( this.user)
            })
            .catch((err) => {
                this.error = err.message
                console.log( this.error)
                this.$router.push({ name: 'home' })
            })
        }
    }
}