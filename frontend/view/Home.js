import userTheatre from "../components/userTheatre.js"
import Fetchdata from "../Fetch.js"
import ApiUrl from '../config.js'

export default {
    template: `<div>
        <div class="container" style="min-height: 79vh;">
            <div class="row row-cols-1 row-cols-md-3 g-4">
                    <!-- Theatre -->
                <userTheatre v-for="theatre in theatres" :key="theatre.theatre_id" v-bind:theatre='theatre'/>
                <div class="col">
                </div>
            </div>
        </div>
    </div>`,

    components: {
        userTheatre
    },

    data() {
        return {
            theatres: null,
            error: null
        }
    },
    
    methods: {},

    mounted() {
        if (this.$store.state.loggedin === false) {
            this.$router.push({ name: 'login' })
        } else {
            Fetchdata({  url: `${ApiUrl}/theatre`, authRequired: true })
            .then((data) => {
                this.theatres = data
                console.log( this.theatres)
            })
            .catch((err) => {
                this.error = err.message
            })
        }
    }
}