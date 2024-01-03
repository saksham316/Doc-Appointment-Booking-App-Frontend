// -------------------------------------------------------------------Imports-----------------------------------------------------------
import axios from "axios"
// -------------------------------------------------------------------------------------------------------------------------------------

// -------------------------------------------------------------------States------------------------------------------------------------
let store;
// -------------------------------------------------------------------------------------------------------------------------------------
// -------------------------------------------------------------------Functions---------------------------------------------------------

// injectStore -- function to inject the redux store to the non react file after the store initialization
export const injectStore = (store) => {
    store = _store
}

// -------------------------------------------------------------------------------------------------------------------------------------

// instance -- instance of the axios in order to do the api call
export const instance = axios.create({
    baseURL: `${process.env.REACT_APP_WORKING_ENVIRONMENT === "development" ? process.env.REACT_APP_API_DEVELOPMENT_URL : process.env.REACT_APP_API_PRODUCTION_URL}`
})


// request config
instance.interceptors.request.use((request) => { return request }, (error) => { return Promise.reject(error) })

// response config
instance.interceptors.response.use((response) => {
    return response
}, (error) => {
    let errorMessage = "";
    let originalRequest = error.config;

    if (error.response.status == 401 || (error.response.status == 403 && !originalRequest._retry)) {
        try {
            // setting retry to true to stop the infinite api call
            originalRequest._retry = true;
            // refresh token logic
        } catch (error) {
            return Promise.reject(error)
        }
    }
    return Promise.reject(error)
})