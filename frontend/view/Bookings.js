import Fetchdata from "../Fetch.js"
import ApiUrl from '../config.js'

export default {
    template: `<div>
        <div class="container" style="min-height: 79vh;">
            <!-- Bookings -->
                <div class="row row-cols-md-4 border py-2" v-for="booking in user.bookings" :key="booking.booking_id" v-bind:booking="booking">
                    <div class="col-3 py-2">
                        Time: {{ booking.time }}
                    </div>
                    <div class="col-3 py-2">
                        Venue: {{ booking.theatre.theatre_name }}
                    </div>
                    <div class="col-3 py-2">
                        Show: {{ booking.show.title }}
                    </div>
                    <div class="col-3 dropdown">
                        <button type="button" aria-expanded="false" data-bs-toggle="dropdown" class="btn mx-2 float-end dropdown-toggle">
                            Rate
                        </button>
                        <form class="dropdown-menu p-2" style="min-width: 5rem;">
                            <div class="mb-1">
                                <input type="number" id="rating5" min="1" max="5" v-model="show.rating">
                            </div>
                            <button type="button" class="btn btn-primary" @click='rate(booking.show.show_id)'>Rate</button>
                        </form>
                    </div>
                </div>
            <!-- Bookings -->
        </div>
    </div>`,

    data() {
        return {
            user: {
                email: null,
                name: null,
                bookings: null,
            },
            error: null,
            show: {
                rating: 5
            }
        }
    },

    methods: {
        rate(id) {
            Fetchdata({
                url: `${ApiUrl}/show/${id}`,
                obj: {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    method: 'PUT',
                    body: JSON.stringify(this.show)
                },
                authRequired: true
            })
            .then((data) => {
                console.log(data)
            })
            .catch((err) => {
                this.error = err.message
            })
        }
    },

    mounted() {
        if (this.$store.state.loggedin === false) {
            this.$router.push({ name: 'login' })
        } else {
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