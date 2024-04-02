import store from "./vuex/index.js"

async function Fetchdata({ url, obj, authRequired }) {
    if (url === undefined) {
        throw Error('Url required')
    }
    if (obj === undefined) {
        obj = {}
    }
    if (authRequired === undefined) {
        authRequired = false
    }
    if (authRequired = true) {
        if (obj.headers === undefined) {
            obj.headers = {
                'Authentication-token': store.getters.token,
            }
        }
        else {
            obj.headers['Authentication-token'] = store.getters.token
        }
    }
    const response = await fetch(url, obj).catch(() => {
        throw Error('Network Error')
    })
    if (response) {
        if (response.ok) {
            const data = await response.json().catch(() =>{
                throw Error('Unexpected Response')
            })
            if (data) {
                return data
            }
        }
        else {
            throw Error(response.statusText)
        }
    }
}

export default Fetchdata