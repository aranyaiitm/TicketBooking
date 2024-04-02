import Fetchdata from "../Fetch.js"
import ApiUrl from '../config.js'

export default {
    template: `<div class="container" style="min-height: 75vh;">
        <div class="row justify-content-md-center">
            <div class="col col-md-6" >
                <div class="card model-content">
                    <div class="card-header p-4 text-center">
                        <h4>Edit a Show</h4>
                    </div>
                    <div class="card-body px-5">
                        <form>
                            <div class="mb-3 row">
                                <label for="sid" class="col-3 col-form-label">Show Id</label>
                                <div class="col-9">
                                    <select class="form-select" aria-label="Default select example" id="sid" @change='selectShow'>
                                        <option selected>Open this select menu</option>
                                        <option v-for="(show,index) in shows" :key="show.show_id" :value="index">{{ show.show_id }}</option>
                                    </select>
                                </div>
                            </div>
                            <div class="mb-3">
                            <label for="title" class="form-label">Title</label>
                            <input type="text" class="form-control" id="title" v-model='show.title'>
                            </div>
                            <div class="mb-3">
                            <label for="tags" class="form-label">Tags</label>
                            <input type="text" class="form-control" id="tags" v-model='show.tags'>
                            </div>
                            <div class="mb-3 row">
                                <label for="price" class="col-2 col-form-label">Price</label>
                                <div class="col-10">
                                    <input type="number" class="form-control" id="price" min="40" max="2000" v-model='show.price'>
                                </div>
                            </div>
                            <div class="mb-3">
                            <label for="file" class="form-label">Image</label>
                            <input type="file" class="form-control" id="file" @change='saveFile' >
                            </div>
                            <div class="text-center">
                            <button type="button" class="btn btn-primary" v-on:click='addshow()'>Submit</button>
                            <button type="button" class="btn btn-primary" @click="$emit('closeForm')"> Close </button>
                            </div>
                            <p class="text-center text-muted mt-4 mb-0"><a @click="$emit('switchDeleteshow')" class="fw-bold" style="text-decoration: none; cursor: pointer;">Click here</a> to delete a show.</p>
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
                tags: '',
                price: 0,
                show_id: null
            },
            img: null,
            shows: null,
            error: null
        }
    },

    computed: {
        
    },

    methods: {
        addshow() {
            var data =  new FormData()
            data.append('title', this.show.title)
            data.append('tags', this.show.tags)
            data.append('price', this.show.price)
            data.append('img', this.img)
            Fetchdata({
                url: `${ApiUrl}/show/${this.show.show_id}`,
                obj: {
                    method: 'PUT',
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
            this.img = event.target.files[0]
        },
        selectShow(event) {
            this.show = this.shows[event.target.value]
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