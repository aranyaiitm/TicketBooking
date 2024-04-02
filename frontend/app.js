import Main from "./components/Main.js";
import Header from "./components/Header.js";
import Footer from "./components/Footer.js";
import router from "./router/index.js";
import store from "./vuex/index.js";

const vm = new Vue({
    el: '#app',
    template: `<div>
        <Header/>
            <Main/>
        <Footer/>
    </div>`,
    data: {},
    components: {
        Main,
        Header,
        Footer
    },
    router,
    store
})