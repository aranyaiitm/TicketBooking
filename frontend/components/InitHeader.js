export default {
    template: `<div>
        <nav class="navbar navbar-expand-lg bg-body-tertiary mb-3">
            <div class="container-fluid">
                <router-link class="navbar-brand" aria-current="page" :to="{name:'home'}">Ticket Booking</router-link>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
                    <div class="navbar-nav me-auto mb-2 mb-lg-0">
                        <router-link class="nav-link" :to="{name:'adminlogin'}">
                            Admin Login
                        </router-link>
                        <router-link class="nav-link" :to="{name:'login'}">
                            User Login
                        </router-link>
                    </div>
                </div>
            </div>
        </nav>
    </div>`,
}