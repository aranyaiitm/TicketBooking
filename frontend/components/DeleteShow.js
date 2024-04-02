import Fetchdata from "../Fetch.js"
import ApiUrl from '../config.js'

export default {
    template: `<div class="container" style="min-height: 75vh;">
        <div class="row justify-content-md-center">
            <div class="col col-md-6" >
                <div class="card model-content">
                    <div class="card-header p-4 text-center">
                        <h4>Delete a Show</h4>
                    </div>
                    <div class="card-body px-5">
                        <form>
                            <div class="mb-3">
                            <label for="sid" class="form-label">Show Id</label>
                            <select class="form-select" aria-label="Default select example" id="sid" v-model='show_id'>
                                <option selected>Open this select menu</option>
                                <option v-for="show in shows" :key="show.show_id" :value="show.show_id">{{ show.show_id }} : {{ show.title }}</option>
                            </select>
                            </div>
                            <div class="text-center">
                            <button type="button" class="btn btn-primary" v-on:click='delshow()'>Delete</button>
                            <button type="button" class="btn btn-primary" @click="$emit('closeForm')"> Close </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>`,

    data() {
        return {
            show_id: null,
            shows: null,
            error: null
        }
    },

    computed: {
        
    },

    methods: {
        delshow() {
            Fetchdata({
                url: `${ApiUrl}/show/${this.show_id}`,
                obj: {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    method: 'DELETE'
                },
                authRequired: true
            })
            .then((data) => {
                console.log( data)
            })
            .catch((err) => {
                this.error = err.message
            })
            this.$emit('closeForm');
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