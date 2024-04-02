import userTheatreShow from "./userTheatreShow.js"

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
                        <li><a class="dropdown-item" href="#">Place: {{ showvenue.place }}</a></li>
                    </ul>
                </div>
            </div>
            <ul class="list-group list-group-flush" style="overflow-y: auto; max-height: 58vh;">
                <!-- Theatre_Shows -->
                <userTheatreShow v-for="theatre_show in showvenue.theatre_shows" :key="theatre_show.theatre_show_id" v-bind:theatre_show = 'theatre_show'/>
            </ul>
        </div>
    </div>`,

    props: ['theatre'],

    components: {
        userTheatreShow
    },

    data: function() {
            return {
                showvenue: this.theatre
            }
        }
}