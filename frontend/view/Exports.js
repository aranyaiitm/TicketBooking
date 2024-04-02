import ApiUrl from '../config.js'
import store from "../vuex/index.js";

export default {
    template: `<div>
        <div class="container" style="min-height: 79vh;">
            <!-- Expors -->
                <div class="row row-cols-md-4 border py-2" v-for="(file,index) in exportedFiles" :key="index">
                    <div class="col-3 py-2">
                        Time: {{ file }}
                    </div>
                    <button type="button" class="btn btn-primary" @click='downloadFile(file)'>Download</button>
                </div>
            <!-- Exports -->
        </div>
    </div>`,

    methods: {
        downloadFile(filename) {
            const obj = {};
            obj.headers = {
                'Authentication-token': store.getters.token,
            }
            const apiUrl = `${ApiUrl}/download/${filename}`
            fetch(apiUrl,obj)
                .then(response => {
                    if (response.ok) {
                        return response.blob();
                    }
                    else {
                        throw Error(response.statusText)
                    }
                })
                .then(blob => {
                    console.log('downloding')
                    const url = window.URL.createObjectURL(blob);
                    const a = document.createElement('a');
                    a.href = url;
                    a.download = filename
                    document.body.appendChild(a);
                    a.click();
                    window.URL.revokeObjectURL(url);
                })
                .catch((err) => {
                    this.error = err.message
                })
        }
    },

    computed: {
        ...Vuex.mapState(['exportedFiles']),
    }
}