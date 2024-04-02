import Fetchdata from "../Fetch.js"
import ApiUrl from '../config.js'

export default {
    template: `<div class="container">
        <div class="row justify-content-md-center">
            <div class="col col-md-6" >
                <div class="card model-content">
                    <div class="card-header p-4 text-center">
                        <h4>Add a Show</h4>
                    </div>
                    <div class="card-body px-5">
                        <form>
                            <div class="mb-3">
                            <label for="tid" class="form-label">Theatre Id</label>
                            <input type="number" class="form-control" id="tid" v-model='theatre_show.theatre_id' readonly>
                            </div>
                            <div class="mb-3">
                            <label for="sid" class="form-label">Show</label>
                            <select class="form-select" aria-label="Default select example" id="sid" v-model='theatre_show.show_id'>
                                <option v-for="show in shows" :key="show.show_id" :value="show.show_id">{{ show.title }}</option>
                            </select>
                            </div>
                            <div class="mb-3">
                                <label for="time" class="form-label">Time</label>
                                <input type="datetime-local" class="form-control" id="time" v-model='theatre_show.time'>
                            </div>
                            <div class="text-center">
                            <button type="button" class="btn btn-primary" @click="addtheatreshow()">Add</button>
                            <button type="button" class="btn btn-primary" @click="$emit('closeForm')"> Close </button>
                            </div>
                            <p class="text-center text-muted mt-4 mb-0"><a @click="$emit('switchAddnewshow')" class="fw-bold" style="text-decoration: none; cursor: pointer;">Click here</a> to add a new show to this portal.</p>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>`,

    props: ['theatre_id',
        'avs'
        ],

    data() {
        return {
            theatre_show: {
                theatre_id: this.theatre_id,
                show_id: null,
                time: null,
                avs: this.avs
            },
            shows: null,
            error: null
        }
    },

    methods: {
        addtheatreshow() {
            Fetchdata({
                url: `${ApiUrl}/theatreshow`,
                obj: {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    method: 'POST',
                    body: JSON.stringify(this.theatre_show)
                },
                authRequired: true
            })
            .then((data) => {
                console.log( data)
                this.$emit('showAdded');
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