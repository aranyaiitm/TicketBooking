import Fetchdata from "../Fetch.js"
import ApiUrl from '../config.js'

export default {
    template: `<div class="container" style="min-height: 75vh;">
        <div class="row justify-content-md-center">
            <div class="col col-md-6" >
                <div class="card model-content">
                    <div class="card-header p-4 text-center">
                        <h4>Add a Show</h4>
                    </div>
                    <div class="card-body px-5">
                        <form>
                            <div class="mb-3">
                                <label for="title" class="form-label">Title</label>
                                <input type="text" class="form-control" id="title" v-model='show.title'>
                            </div>
                            <div class="row">
                                <div class="col mb-3">
                                    <label for="rating" class="form-label">Rating</label>
                                    <input type="number" class="form-control" id="rating" max="5" min="1" v-model='show.rating'>
                                </div>
                                <div class="col mb-3">
                                    <label for="price" class="form-label">Price</label>
                                    <input type="number" class="form-control" id="price" min="40" max="2000" v-model='show.price'>
                                </div>
                            </div>
                            <div class="mb-3">
                                <label for="tags" class="form-label">Tags</label>
                                <input type="text" class="form-control" id="tags" v-model='show.tags'>
                            </div>
                            <div class="mb-3">
                                <label for="file" class="form-label">Image</label>
                                <input type="file" class="form-control" id="file" @change='saveFile' >
                            </div>
                            <div class="text-center">
                                <button type="button" class="btn btn-primary" v-on:click='addshow()'>Add</button>
                                <button type="button" class="btn btn-primary" @click="$emit('closeForm')"> Close </button>
                            </div>
                            <p class="text-center text-muted mt-4 mb-0"><a @click="$emit('switchEditshow')" class="fw-bold" style="text-decoration: none; cursor: pointer;">Click here</a> to edit a existing show.</p>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>`,

    data() {
        return {
            show: {
                title: '',
                rating: 5,
                tags: '',
                price: 0,
                img: null
            },
            error: null
        }
    },
    methods: {
        addshow() {
            var data =  new FormData()
            data.append('title', this.show.title)
            data.append('rating', this.show.rating)
            data.append('tags', this.show.tags)
            data.append('price', this.show.price)
            data.append('img', this.show.img)
            Fetchdata({
                url: `${ApiUrl}/show`,
                obj: {
                    method: 'POST',
                    body: data
                },
                authRequired: true
            })
            .then((data) => {
                console.log( data)
                this.$emit('closeForm');
            })
            .catch((err) => {
                this.error = err.message
            })
        },
        saveFile(event) {
            this.show.img = event.target.files[0]
        }
    }
}