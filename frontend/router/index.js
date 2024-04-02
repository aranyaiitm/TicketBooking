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
import UserHeader from '../components/UserHeader.js'
import InitHeader from '../components/InitHeader.js'
import AdminHeader from '../components/AdminHeader.js'
import Exports from '../view/Exports.js'

const routes = [
    { path: '/', name: 'home', components:{main: Home, header:UserHeader}},
    { path: '/booking', name: 'booking', components:{main: Booking, header:UserHeader}},
    { path: '/bookings', name: 'bookings', components:{main: Bookings, header:UserHeader}},
    { path: '/login', name: 'login', components:{main: LogIn, header:InitHeader}},
    { path: '/adminlogin', name: 'adminlogin', components:{main: AdminLogIn, header:InitHeader}},
    { path: '/register', name: 'register', components:{main: Register}, header:InitHeader},
    { path: '/admin', name: 'admin_home', components:{main: AdminHome, header:AdminHeader}},
    { path: '/summary', name: 'summary', components:{main: Summary, header:AdminHeader}},
    { path: '/exports', name: 'exports', components:{main: Exports, header:AdminHeader}},
    { path: '/addtheatre', name: 'addtheatre', components:{main: Add_Theatre, header:AdminHeader}},
    { path: '/edittheatre', name: 'edittheatre', components:{main: Edit_Theatre, header:AdminHeader}},
    { path: '/addtheatre_show', name: 'addtheatre_show', components:{main: Add_Theatre_Show, header:AdminHeader}},
    { path: '/addshow', name: 'addshow', components:{main: Add_Show, header:AdminHeader}},
    { path: '/editshow', name: 'editshow', components:{main: Edit_Show, header:AdminHeader}},
    { path: '/deleteshow', name: 'deleteshow', components:{main: Delete_Show, header:AdminHeader}}
]

const router = new VueRouter({
    routes
})

export default router