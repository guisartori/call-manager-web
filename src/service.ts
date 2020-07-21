import Axios from 'axios'

const api = Axios.create({
    baseURL: "http://localhost:3333/",
    timeout: 1000
})

export default api