import userTheatre from "../components/userTheatre.js"
import Show from "../components/Show.js"
import Fetchdata from "../Fetch.js"
import ApiUrl from '../config.js'
import notification from "../notification.js"

export default {
    template: `<div>
        <div class="container text-center">
            <div class="row justify-content-end">
                <div class="col col-lg-3">
                    <notification/>
                </div>
                <div class="col col-lg-3">
                    <div class="input-group input-group-sm mb-2">
                        <input type="text" class="form-control" id='main-search' aria-label="Small" v-model='query.search_query'>
                        <button class="btn btn-outline-success btn-sm" type="button" @click='search'>Search</button>
                    </div>
                </div>
            </div>
            <div class="row justify-content-start row-cols-2 row-cols-lg-4">
            <Show v-for="show in shows" :key="show.show_id" v-bind:show='show'/>
            </div>
        </div>
        <div class="container" style="min-height: 74vh;">
            <div class="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
                    <!-- Theatre -->
                <userTheatre v-for="theatre in theatres" :key="theatre.theatre_id" v-bind:theatre='theatre'/>
            </div>
        </div>
    </div>`,

    components: {
        userTheatre,
        Show,
        notification
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
                this.shows = this.sortByTime(data.shows_res)
                console.log(this.theatres)
            })
            .catch((err) => {
                this.error = err.message
            })
        },
        recentShowTime(show) {
            const theatreShows = show.theatre_shows.map(theatreShow => new Date(theatreShow.time));
            return new Date(Math.max(...theatreShows));
        },
        sortByTime(array) {
            array.sort((a,b) => {
                const A = this.recentShowTime(a);
                const B = this.recentShowTime(b);
                return B - A

            })
            return array.slice(0,8);
        }
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
            Fetchdata({  url: `${ApiUrl}/show`, authRequired: true })
            .then((data) => {
                this.shows = this.sortByTime(data)
                console.log(data)
            })
            .catch((err) => {
                this.error = err.message
            })
        }
    }
}