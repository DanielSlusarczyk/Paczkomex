import {backendApi} from "./backendApi";

const packagesClient = backendApi('/package')

export const packagesApi = {
  getAll() {
    console.log('Fetching packages')
    return packagesClient.get('')
  },

  getById(id) {
    console.log('Get package', id)
    return packagesClient.get(`/${id}`)
  },

  create(parcel) {
    console.log('Create package', parcel)
    return packagesClient.post('', parcel)
  },

  update(id, parcel) {
    console.log('Update package', id, parcel)
    return packagesClient.put(`/${id}`, parcel)
  },

  delete(id) {
    console.log('Delete package', id)
    return packagesClient.delete(`/${id}`)
  },

  setDestination(id, lockerId) {
    console.log('Set destination', id, lockerId)
    return packagesClient.put(`/${id}/to/${lockerId}`)
  },

  setSource(id, lockerId) {
    console.log('Set source', id, lockerId)
    return packagesClient.put(`/${id}/from/${lockerId}`)
  }
}
