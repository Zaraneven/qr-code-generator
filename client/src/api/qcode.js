import axios from 'axios'
import config from '../config/config'

const apiUrl = config.apiPath;

const listQrcodes = async () => {
    const response = await axios.get(apiUrl + "/api/qrcodes");
    return response.data;
}

const insertQrcode = (title, url) => {
    return axios.post(apiUrl + "/api/qrcodes/", title, url)
}

const removeQrcode = (id) => {
    return axios.delete(apiUrl + "/api/qrcodes/" + id)
}

export {listQrcodes, insertQrcode, removeQrcode}