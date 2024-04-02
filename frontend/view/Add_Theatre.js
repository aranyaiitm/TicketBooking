import Fetchdata from "../Fetch.js"
import ApiUrl from '../config.js'

export default {
    template: `<div class="container" style="min-height: 75vh;">
        <div class="row justify-content-md-center">
            <div class="col col-md-8" >
                <div class="card">
                    <div class="card-header p-4 text-center">
                        <h4>Add a Theatre</h4>
                    </div>
                    <div class="card-body px-5">
                        <form>
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
                            <button type="button" class="btn btn-primary" v-on:click='addtheatre()'>Add</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>`,

    data() {
        return {
            theatre: {
                theatre_name: null,
                place: null,
                capacity: null
            },
            error: null
        }
    },
    
    methods: {
        addtheatre() {
            Fetchdata({
                url: `${ApiUrl}/theatre`,
                obj: {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    method: 'POST',
                    body: JSON.stringify(this.theatre)
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