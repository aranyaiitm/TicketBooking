import Fetchdata from "../Fetch.js"
import ApiUrl from '../config.js'

export default {
    template: `<div class="container" style="min-height: 75vh;">
        <div class="row justify-content-md-center">
            <div class="col col-md-8" >
                <div class="card">
                    <div class="card-header p-4 text-center">
                        <h4>Edit a Show</h4>
                    </div>
                    <div class="card-body px-5">
                        <form>
                            <div class="mb-3">
                            <label for="sid" class="form-label">Show Id</label>
                            <select class="form-select" aria-label="Default select example" id="sid" v-model='show_id'>
                                <option selected>Open this select menu</option>
                                <option v-for="show in shows" :key="show.show_id" :value="show.show_id">{{ show.show_id }}</option>
                            </select>
                            </div>
                            <div class="mb-3">
                            <label for="title" class="form-label">Title</label>
                            <input type="text" class="form-control" id="title" v-model='show.title'>
                            </div>
                            <div class="mb-3">
                            <label for="tags" class="form-label">Tags</label>
                            <input type="text" class="form-control" id="tags" v-model='show.tags'>
                            </div>
                            <div class="mb-3">
                            <label for="price" class="form-label">Price</label>
                            <input type="number" class="form-control" id="price" min="40" max="2000" v-model='show.price'>
                            </div>
                            <div class="text-center">
                            <button type="button" class="btn btn-primary" v-on:click='addshow()'>Submit</button>
                            </div>
                            <p class="text-center text-muted mt-4 mb-0"><router-link :to="{name:'deleteshow'}" class="fw-bold" style="text-decoration: none;">Click here</router-link> to delete a show.</p>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>`,

    data() {
        return {
            show: {
                title: null,
                tags: null,
                price: 0
            },
            show_id: null,
            shows: null,
            error: null
        }
    },

    computed: {
        
    },

    methods: {
        addshow() {
            Fetchdata({
                url: `${ApiUrl}/show/${this.show_id}`,
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
                console.log( data)
                this.$router.push({ name: 'admin_home' })
            })
            .catch((err) => {
                this.error = err.message
            })
        }
    },

    mounted() {
        Fetchdata({  url: `${ApiUrl}/show`, authRequired: true })
        .then((data) => {
            this.shows = data
            console.log( this.shows)
        })
        .catch((err) => {
            this.error = err.message
        })
    }
}