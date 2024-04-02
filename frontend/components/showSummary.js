export default {
    template: `<div class="col">
        <div class="card text-center mb-3">
            <div class="card-body">
                <h5 class="card-title">{{ sshow.title }}</h5>
                <div v-for='(theatre_show, index) in sshow.theatre_shows'>
                    <span>{{ theatre_show.venue.theatre_name }},{{ theatre_show.time }}</span>
                    <div class="progress" role="progressbar" aria-label="Example with label" v-bind:aria-valuenow='booking_count(theatre_show.theatre_id)' aria-valuemin="0" aria-valuemax="100">
                        <div class="progress-bar" v-bind:style="'width: '+ barPercent(theatre_show.theatre_id,index) + '%'">{{ booking_count(theatre_show.theatre_id) }}</div>
                    </div>
                </div>
            </div>
        </div>
    </div>`,

    props: ['show'],

    data: function() {
        return {
            sshow: this.show
        }
    },

    methods: {
        booking_count(theatre_id) {
            let total_booking =0;
            for (const booking of this.sshow.bookings) {
                if (booking.theatre_id == theatre_id){
                    total_booking += booking.quantity;
                }
            }
            return total_booking
        },
        barPercent(theatre_id,index) {
            let p = 0
            p = this.booking_count(theatre_id)/this.sshow.theatre_shows[index].venue.capacity*100
            return p
        }
    },
}