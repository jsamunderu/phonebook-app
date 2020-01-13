import axios from 'axios'

const ADDRBK_API_URL = 'http://localhost:8080/api/addrbk'

class EntryDataService {

    retrieveAllEntries() {
        return axios.post(`${ADDRBK_API_URL}/`);
    }

    retrieveCourse(name) {
        return axios.post(`${ADDRBK_API_URL}/search`, name);
    }

    deleteEntry(name, phoneNumber) {
        return axios.post(`${ADDRBK_API_URL}/delete`, name, phoneNumber);
    }

    updateEntry(name, phoneNumber) {
        return axios.post(`${ADDRBK_API_URL}/update`, name, phoneNumber);
    }

    createEntry(name, phoneNumber) {
        return axios.post(`${ADDRBK_API_URL}/`, name, phoneNumber);
    }
}

export default new EntryDataService()
