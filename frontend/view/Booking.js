import Fetchdata from "../Fetch.js"
import ApiUrl from '../config.js'

export default {
    template: `<div class="container" style="min-height: 79vh;">
        <div class="row justify-content-md-center">
            <div class="col col-md-8" >
                <div class="card">
                    <div class="card-header p-4 text-center">
                        <h4>Book a Show</h4>
                    </div>
                    <div class="card-body px-5">
                        <form>
                            <div class="mb-3">
                                <label for="tid" class="form-label">Theatre Id</label>
                                <input type="number" class="form-control" id="tid" v-model='booking.theatre_id' readonly>
                            </div>
                            <div class="mb-3">
                                <label for="sname" class="form-label">Show</label>
                                <input type="text" class="form-control" id="sname" v-model='show.title' readonly>
                            </div>
                            <div class="mb-3">
                                <label for="time" class="form-label">Time</label>
                                <input type="datetime-local" class="form-control" id="time" v-model='booking.time' readonly>
                            </div>
                            <div class="mb-3">
                                <label for="quantity" class="form-label">Quantity</label>
                                <input type="number" class="form-control" min="1" max="10" id="quantity" v-model='booking.quantity'>
                            </div>
                            <div class="mb-3">
                                <label for="price" class="form-label">Total price</label>
                                <input type="number" class="form-control" id="price" v-model='calculatePrice' readonly>
                            </div>
                                <div class="text-center">
                                <button type="button" class="btn btn-primary" @click="bookshow()">Confirm Booking</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>`,

    data() {
        return {
            booking: {
                user_id: null,
                theatre_id: this.$route.params.theatre_id,
                show_id: this.$route.params.show_id,
                time: this.$route.params.time,
                quantity: 1,
                total_price: 0
            },
            show: {
                title: null,
                rating: null,
                tags: null,
                price:240
            },
            error: null
        }
    },

    methods: {
        bookshow() {
            this.booking.total_price = this.calculatePrice

            Fetchdata({
                url: `${ApiUrl}/booking`,
                obj: {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    method: 'POST',
                    body: JSON.stringify(this.booking)
                },
                authRequired: true
            })
            .then((data) => {
                console.log( data)
                this.$router.push({ name: 'admin_home' })
            })
            .catch((err) => {
                this.error = err.message
            })
        }
    },

    computed: {
        calculatePrice() {
            return this.booking.quantity * this.show.price
        }
    },

    mounted() {
        Fetchdata({  url: `${ApiUrl}/user`, authRequired: true })
        .then((data) => {
            this.booking.user_id = data.id
            console.log( this.booking)
        })
        .catch((err) => {
            this.error = err.message
        })
        Fetchdata({  url: `${ApiUrl}/show/${this.booking.show_id}`, authRequired: true })
        .then((data) => {
            this.show = data
            console.log( this.show)
        })
        .catch((err) => {
            this.error = err.message
        })
    }
}