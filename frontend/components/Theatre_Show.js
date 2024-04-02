export default {
    template: `<li class="list-group-item">
        <div class="card">
            <div class="card-body">
                <div class="d-flex w-100 justify-content-between">
                    <h5 class="mb-1">
                        <div class="dropdown">
                            <button class="btn btn-light dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                {{ theatre_show.show.title }}
                            </button>
                            <ul class="dropdown-menu">
                            <li><a class="dropdown-item" href="#">Edit</a></li>
                            <li><a class="dropdown-item" @click="$emit('removeshow')" href="#">Delete</a></li>
                            </ul>
                        </div>
                    </h5>
                    <div class="p-2" v-if='theatre_show.show.rating > 3'><span class="badge bg-success">Rating: {{ theatre_show.show.rating }}</span></div>
                    <div class="p-2" v-else ><span class="badge bg-danger">Rating: {{ theatre_show.show.rating }}</span></div>
                </div>
            <p class="card-text mb-1">
                {{ theatre_show.show.tags }}
            </p>
            <small class="text-primary float-end">Time: {{ theatre_show.time }}</small>
            </div>
        </div>
    </li>`,

    props: ['theatre_show'],
}