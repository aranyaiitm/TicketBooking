import Fetchdata from "../Fetch.js"
import ApiUrl from '../config.js'

export default {
    template: `<div class="container" style="min-height: 75vh;">
        <div class="row justify-content-md-center">
            <div class="col col-md-6" >
                <div class="card model-content">
                    <div class="card-header p-4 text-center">
                        <h4>Edit a Theatre</h4>
                    </div>
                    <div class="card-body px-5">
                        <form>
                            <div class="mb-3">
                            <label for="tid" class="form-label">Theatre Id</label>
                            <input type="number" class="form-control" id="tid" v-model='theatreId' readonly>
                            </div>
                            <div class="mb-3">
                            <label for="name1" class="form-label">Venue Name</label>
                            <input type="name" class="form-control" id="name1" v-model='theatre.theatre_name'>
                            </div>
                            <div class="mb-3">
                            <label for="name2" class="form-label">Place</label>
                            <input type="text" class="form-control" id="name2" v-model='theatre.place'>
                            </div>
                            <div class="mb-3">
                            <label for="name3" class="form-label">Capacity</label>
                            <input type="number" class="form-control" id="name3" v-model='theatre.capacity'>
                            </div>
                            <div class="text-center">
                            <button type="button" class="btn btn-primary" v-on:click='addshow()'>Submit</button>
                            <button type="button" class="btn btn-primary" @click="$emit('closeForm')"> Close </button>
                            </div>
                            <p class="text-center text-muted mt-4 mb-0"><router-link :to="{name:'deleteshow'}" class="fw-bold" style="text-decoration: none;">Click here</router-link> to delete a show.</p>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>`,

    props: ['theatre_id'],

    data() {
        return {
            theatre: {
                theatre_name: null,
                place: null,
                capacity: null
            },
            show: null,
            theatreId: this.theatre_id,
            error: null
        }
    },

    methods: {
        addshow() {
            Fetchdata({
                url: `${ApiUrl}/theatre/${this.theatreId}`,
                obj: {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    method: 'PUT',
                    body: JSON.stringify(this.theatre)
                },
                authRequired: true
            })
            .then((data) => {
                console.log( data)
                this.$emit('theatreEdited');
            })
            .catch((err) => {
                this.error = err.message
            })
        }
    },
}