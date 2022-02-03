import axios from 'axios';

const channel = '1610857'

const thingSpeakApi = axios.create({
    baseURL: `https://api.thingspeak.com/channels/${channel}`
})

export default thingSpeakApi