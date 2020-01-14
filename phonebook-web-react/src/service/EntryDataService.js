import axios from 'axios'

const ADDRBK_API_URL = 'http://localhost:8080/api/addrbk'

class EntryDataService {

    retrieveAllEntries() {
        return axios.get(`${ADDRBK_API_URL}/`);
    }

    searchEntry(data) {
        return axios.post(`${ADDRBK_API_URL}/search`, data);
    }

    retrieveEntry(data) {
        return axios.post(`${ADDRBK_API_URL}/find`, data);
    }

    deleteEntry(data) {
        return axios.post(`${ADDRBK_API_URL}/delete`, data);
    }

    updateEntry(data) {
        return axios.post(`${ADDRBK_API_URL}/update`, data);
    }

    createEntry(data) {
        return axios.post(`${ADDRBK_API_URL}/`, data);
    }
}

export default new EntryDataService()
