import Fetchdata from "../Fetch.js"
import ApiUrl from '../config.js'

export default {
    template: `<div class="container">
        <div class="row justify-content-md-center">
            <div class="col col-md-5" >
                <div class="card">
                    <div class="card-header p-4 text-center">
                        <h4>Create an acount</h4>
                    </div>
                    <div class="card-body px-5">
                        <form>
                            <div class="mb-3">
                            <label for="name1" class="form-label">Name</label>
                            <input type="name" class="form-control" id="name1" v-model='user.name'>
                            </div>
                            <div class="mb-3">
                            <label for="exampleInputEmail1" class="form-label">Email address</label>
                            <input type="email" class="form-control" id="exampleInputEmail1" v-model='user.email' aria-describedby="emailHelp">
                            <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div>
                            </div>
                            <div class="mb-3">
                            <label for="exampleInputPassword1" class="form-label">Password</label>
                            <input type="password" class="form-control" id="exampleInputPassword1" v-model='user.password'>
                            </div>
                            <div class="mb-3">
                            <label for="exampleInputPassword2" class="form-label">Confirm Password</label>
                            <input type="password" class="form-control" id="exampleInputPassword2" v-model='password2'>
                            </div>
                            <!-- <div class="mb-3 form-check d-flex justify-content-center">
                            <input type="checkbox" class="form-check-input me-2" id="exampleCheck1">
                            <label class="form-check-label" for="exampleCheck1">Keep me logged in</label>
                            </div> -->
                            <div class="text-center">
                            <button type="button" class="btn btn-primary" @click='userregister'>Register</button>
                            </div>
                            <p class="text-center text-muted mt-4 mb-0">Have already an account? <router-link :to="{name:'login'}" class="fw-bold" style="text-decoration: none;">Login here</router-link></p>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>`,

    data() {
        return {
            user: {
                name: null,
                email: null,
                password: null
            },
            password2 : null
        }
    },
    methods: {
        userregister() {
            if (this.user.password != this.password2) {
                alert('Please make sure your passwords match')
            } else {
                Fetchdata({
                    url: `${ApiUrl}/user`,
                    obj: {
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        method: 'POST',
                        body: JSON.stringify(this.user)
                    },
                })
                .then((data) => {
                    console.log( data)
                    this.$router.push({ name: 'login' })
                })
                .catch((err) => {
                    this.error = err.message
                })
            }
        }
    }
}