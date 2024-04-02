import Home from '../view/Home.js'
import AdminHome from '../view/AdminHome.js'
import Summary from '../view/Summary.js'
import LogIn from '../view/LogIn.js'
import AdminLogIn from '../view/AdminLogIn.js'
import Register from '../view/Register.js'
import Add_Theatre from '../view/Add_Theatre.js'
import Edit_Theatre from '../view/Edit_Theatre.js'
import Add_Theatre_Show from '../view/Add_Theatre_Show.js'
import Add_Show from '../view/Add_Show.js'
import Booking from '../view/Booking.js'
import Bookings from '../view/Bookings.js'
import Edit_Show from '../view/Edit_Show.js'
import Delete_Show from '../view/Delete_Show.js'

const routes = [
    { path: '/', name: 'home', component: Home},
    { path: '/admin', name: 'admin_home', component: AdminHome},
    { path: '/summary', name: 'summary', component: Summary},
    { path: '/login', name: 'login', component: LogIn},
    { path: '/adminlogin', name: 'adminlogin', component: AdminLogIn},
    { path: '/register', name: 'register', component: Register},
    { path: '/addtheatre', name: 'addtheatre', component: Add_Theatre},
    { path: '/edittheatre', name: 'edittheatre', component: Edit_Theatre},
    { path: '/addtheatre_show', name: 'addtheatre_show', component: Add_Theatre_Show},
    { path: '/addshow', name: 'addshow', component: Add_Show},
    { path: '/booking', name: 'booking', component: Booking},
    { path: '/bookings', name: 'bookings', component: Bookings},
    { path: '/editshow', name: 'editshow', component: Edit_Show},
    { path: '/deleteshow', name: 'deleteshow', component: Delete_Show}
]

const router = new VueRouter({
    routes
})

export default router