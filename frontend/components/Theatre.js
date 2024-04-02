import Theatre_Show from "./Theatre_Show.js"
import Fetchdata from "../Fetch.js"
import ApiUrl from '../config.js'

export default {
    template: `
    <div class="col">
        <div class="card h-100">
            <div class="card-header text-center" aria-current="true">
                <div class="dropdown">
                    <button class="btn btn-light dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                    {{ showvenue.theatre_name }}
                    </button>
                    <ul class="dropdown-menu">
                        <li><a class="dropdown-item" href="#" @click="editTheatre">Edit</a></li>
                        <li><a class="dropdown-item" href="#" @click="$emit('remove')" >Delete</a></li>
                    </ul>
                </div>
            </div>

            <ul class="list-group list-group-flush" style="overflow-y: auto; max-height: 58vh;">
                <!-- Theatre_Shows -->
                <Theatre_Show v-for="(theatre_show, index) in showvenue.theatre_shows" :key="theatre_show.theatre_show_id" v-bind:theatre_show = 'theatre_show' @removeshow="deltheatreshow(index)"/>
            </ul>
            
            <div class="card-body text-center">
                <button @click="addTheatreShow" type="button" class="btn btn-outline-primary px-2 py-0" style="font-size: 2rem; color: cornflowerblue;"><i class="bi bi-plus-square-fill"></i></button>
            </div>
            <div class="card-footer text-center">
                <button type="button" class="btn btn-light" @click='exporttheatre'>Export</button>
            </div>
        </div>
    </div>`,

    props: ['theatre'],

    components: {
        Theatre_Show
    },

    data: function() {
            return {
                showvenue: this.theatre,
                error: null,
                exportth: null
            }
        },

    methods: {
        addTheatreShow() {
            this.$router.push({ name: 'addtheatre_show', params: { theatre_id: this.showvenue.theatre_id,avs: this.showvenue.capacity} })
        },
        editTheatre() {
            this.$router.push({ name: 'edittheatre', params: { theatre_id: this.showvenue.theatre_id} })
        },
        deltheatreshow(index) {
            Fetchdata({
                url: `${ApiUrl}/theatreshow/${this.showvenue.theatre_shows[index].theatre_show_id}`,
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
            this.showvenue.theatre_shows.splice(index, 1)
        },
        exporttheatre() {
            Fetchdata({
                url: `${ApiUrl}/export/${this.showvenue.theatre_id}`,authRequired: true })
            .then((data) => {
                this.exportth = data
                alert("Data exported: "+data)
            })
            .catch((err) => {
                this.error = err.message
            })
        }
    }
}