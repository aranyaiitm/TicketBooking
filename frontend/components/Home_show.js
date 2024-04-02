export default {
    template: `<div class="col">
        <div class="card text-center mb-3">
            <img v-bind:src="'http://localhost:8080/static/imgs/'+ theatreshow.show.img" class="card-img-top" alt="img">
            <div class="card-body">
                <h5 class="card-title">{{ theatreshow.show.title }}</h5>
                <p class="card-text">{{ theatreshow.show.tags }}</p>
                <p class="card-text">Venue: {{ theatreshow.venue.theatre_name }}</p>
                <p class="card-text">{{ theatreshow.time }}</p>
                <router-link class="btn btn-primary" v-if='theatreshow.avs != 0' :to="{
                    name:'booking',
                    params: {
                        theatre_id: this.theatreshow.theatre_id,
                        show_id: this.theatreshow.show_id,
                        time: this.theatreshow.time
                    }
                }">Book
                </router-link>
                <a class="btn btn-primary" v-if='theatreshow.avs == 0'>Housefull</a>
            </div>
        </div>
    </div>`,

    props: ['theatre_show'],

    data() {
        return {
            theatreshow: this.theatre_show
        }
    },
}