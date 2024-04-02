export default {
    template: `<div class="container" style="min-height: 75vh;">
        <div class="row justify-content-md-center">
            <div class="col col-md-5" >
                <div class="card">
                    <div class="card-header p-4 text-center">
                        <h4>Login to your acount</h4>
                    </div>
                    <div class="card-body px-5">
                        <form>
                            <div class="mb-3">
                            <label for="exampleInputEmail1" class="form-label">Email address</label>
                            <input type="email" class="form-control" id="exampleInputEmail1" v-model='admin.email' aria-describedby="emailHelp">
                            </div>
                            <div class="mb-3">
                            <label for="exampleInputPassword1" class="form-label">Password</label>
                            <input type="password" class="form-control" id="exampleInputPassword1" v-model='admin.password'>
                            </div>
                            <!-- <div class="mb-3 form-check d-flex justify-content-center">
                            <input type="checkbox" class="form-check-input me-2" id="exampleCheck1">
                            <label class="form-check-label" for="exampleCheck1">Keep me logged in</label>
                            </div> -->
                            <div class="text-center">
                            <button type="button" class="btn btn-primary" @click='adminlogin(admin)'>Log in</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>`,

    data() {
        return {
            admin: {
                email: null,
                password: null,
            },
        }
    },
    methods: {
        ...Vuex.mapActions(['adminlogin']),
    }
}