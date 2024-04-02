export default {
    template: `<div class="col">
        <div class="card text-start mb-3">
            <img v-bind:src="'http://localhost:8080/static/imgs/'+ hshow.img" class="card-img-top" alt="img">
            <div class="card-body">
                <div class="d-flex w-100 justify-content-between">
                    <h5 class="card-title my-auto">{{ hshow.title }}</h5>
                    <div class="p-2" v-if='hshow.rating > 3'><span class="badge bg-success">Rating: {{ hshow.rating }}</span></div>
                    <div class="p-2" v-else ><span class="badge bg-danger">Rating: {{ hshow.rating }}</span></div>
                </div>
                <p class="card-text">{{ hshow.tags }}</p>
                <form>
                    <select class="form-select" aria-label="Default select example" id="sid" @change='selectVenue'>
                        <option selected>Select Venue & Time</option>
                        <option v-for="(theatreshow,index) in show.theatre_shows" :key="theatreshow.theatre_show_id" :value="index">{{ theatreshow.venue.theatre_name}}, {{theatreshow.time }}</option>
                    </select>
                </form>
                <div class='mt-2 text-center'v-if='theatreshow'>
                    <router-link class="btn btn-primary" v-if='theatreshow.avs != 0' :to="{
                        name:'booking',
                        params: {
                            theatre_id: this.theatreshow.theatre_id,
                            show_id: this.hshow.show_id,
                            time: this.theatreshow.time
                        }
                    }">Book
                    </router-link>
                    <a class="btn btn-primary" v-if='theatreshow.avs == 0'>Housefull</a>
                </div>
            </div>
        </div>
    </div>`,

    props: ['show'],

    data() {
        return {
            hshow: this.show,
            theatreshow: null
        }
    },

    methods: {
        selectVenue(event) {
            this.theatreshow = this.hshow.theatre_shows[event.target.value]
        }
    }
}