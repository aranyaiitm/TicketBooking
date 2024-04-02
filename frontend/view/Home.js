import userTheatre from "../components/userTheatre.js"
import Home_show from "../components/Home_show.js"
import Fetchdata from "../Fetch.js"
import ApiUrl from '../config.js'

export default {
    template: `<div>
        <div class="container text-center">
            <div class="row justify-content-end">
                <div class="col col-lg-3">
                    <div class="input-group input-group-sm mb-2">
                        <input type="text" class="form-control" aria-label="Small" v-model='query.search_query'>
                        <button class="btn btn-outline-success btn-sm" type="button" @click='search'>Search</button>
                    </div>
                </div>
            </div>
            <div class="row justify-content-start row-cols-2 row-cols-lg-4">
            <Home_show v-for="theatre_show in shows" :key="theatre_show.theatre_show_id" v-bind:theatre_show='theatre_show'/>
            </div>
        </div>
        <div class="container" style="min-height: 79vh;">
            <div class="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
                    <!-- Theatre -->
                <userTheatre v-for="theatre in theatres" :key="theatre.theatre_id" v-bind:theatre='theatre'/>
            </div>
        </div>
    </div>`,

    components: {
        userTheatre, Home_show
    },

    data() {
        return {
            theatres: null,
            shows: null,
            query: {search_query: null},
            error: null
        }
    },
    
    methods: {
        search() {
            Fetchdata({
                url: `${ApiUrl}/search`,
                obj: {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    method: 'POST',
                    body: JSON.stringify(this.query)
                },
                authRequired: true
            })
            .then((data) => {
                this.theatres = data.theatres_res
                this.shows = data.theatre_shows_res
                console.log(this.theatres)
            })
            .catch((err) => {
                this.error = err.message
            })
        },
        // sortByTime(array) {
        //     return array.slice().sort((a,b) => {
        //         const A = new Date(a[time])
        //         const B = new Date(b[time])
        //         return A - B
        //     })
        // }
    },

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
        //     Fetchdata({  url: `${ApiUrl}/theatreshow`, authRequired: true })
        //     .then((data) => {
        //         this.shows = this.sortByTime(data)
        //         console.log(data)
        //     })
        //     .catch((err) => {
        //         this.error = err.message
        //     })
        }
    }
}