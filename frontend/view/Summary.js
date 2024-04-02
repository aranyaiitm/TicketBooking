import Fetchdata from "../Fetch.js"
import ApiUrl from '../config.js'
import showSummary from "../components/showSummary.js"

export default {
    template: `<div class="container text-center">
        <div class="row justify-content-start row-cols-1 row-cols-lg-3">
            <showSummary v-for='show in shows' :key="show.show_id" v-bind:show='show'/>
        </div>
    </div>`,

    components: {
        showSummary
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
            shows: null
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
                Fetchdata({  url: `${ApiUrl}/show`, authRequired: true })
                .then((data) => {
                    this.shows = data
                    console.log( this.shows)
                })
            })
            .catch((err) => {
                this.error = err.message
                console.log( this.error)
                this.$router.push({ name: 'home' })
            })
        }
    }
}