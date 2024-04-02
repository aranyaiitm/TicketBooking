export default {
    template: `<li class="list-group-item">
        <div class="card">
            <div class="card-body">
                <div class="d-flex w-100 justify-content-between">
                    <h5 class="mb-1">
                        <div class="dropdown">
                            <button class="btn btn-light dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                {{ theatreshow.show.title }}
                            </button>
                            <ul class="dropdown-menu">
                            <li>
                            <router-link class="dropdown-item" v-if='theatreshow.avs != 0' :to="{
                                    name:'booking',
                                    params: {
                                        theatre_id: this.theatreshow.theatre_id,
                                        show_id: this.theatreshow.show_id,
                                        time: this.theatreshow.time
                                    }
                                }">
                                Book
                            </router-link></li>
                            <li><a class="dropdown-item" v-if='theatreshow.avs == 0'>Housefull</a></li>
                            </ul>
                        </div>
                    </h5>
                    <div class="p-2" v-if='theatreshow.show.rating > 3'><span class="badge bg-success">Rating: {{ theatreshow.show.rating }}</span></div>
                    <div class="p-2" v-else ><span class="badge bg-danger">Rating: {{ theatreshow.show.rating }}</span></div>
                </div>
            <p class="card-text mb-1">
                {{ theatreshow.show.tags }}
            </p>
            <small class="text-primary float-end">Time: {{ theatreshow.time }}</small>
            </div>
        </div>
    </li>`,

    props: ['theatre_show'],

    data() {
        return {
            theatreshow: this.theatre_show
        }
    },
}