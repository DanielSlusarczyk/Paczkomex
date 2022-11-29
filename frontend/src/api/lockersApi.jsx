import {backendApi} from "./backendApi";

const lockersClient = backendApi('/locker')

export const lockersApi = {
    getAll() {
        console.log('Fetching lockers')
        return lockersClient.get('')
    },

    getLoad(id) {
        console.log('Fetching locker load')
        return lockersClient.get(`/load/${id}`)
    }
}