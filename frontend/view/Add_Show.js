import Fetchdata from "../Fetch.js"
import ApiUrl from '../config.js'

export default {
    template: `<div class="container" style="min-height: 75vh;">
        <div class="row justify-content-md-center">
            <div class="col col-md-8" >
                <div class="card">
                    <div class="card-header p-4 text-center">
                        <h4>Add a Show</h4>
                    </div>
                    <div class="card-body px-5">
                        <form>
                            <div class="mb-3">
                            <label for="title" class="form-label">Title</label>
                            <input type="text" class="form-control" id="title" v-model='show.title'>
                            </div>
                            <div class="mb-3">
                            <label for="rating" class="form-label">Rating</label>
                            <input type="number" class="form-control" id="rating" max="5" min="1" v-model='show.rating'>
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
                            <button type="button" class="btn btn-primary" v-on:click='addshow()'>Add</button>
                            </div>
                            <p class="text-center text-muted mt-4 mb-0"><router-link :to="{name:'editshow'}" class="fw-bold" style="text-decoration: none;">Click here</router-link> to edit a existing show.</p>
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
                rating: 5,
                tags: null,
                price: 0
            },
            error: null
        }
    },
    methods: {
        addshow() {
            Fetchdata({
                url: `${ApiUrl}/show`,
                obj: {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    method: 'POST',
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
    }
}