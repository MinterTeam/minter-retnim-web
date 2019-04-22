import axios from 'axios';
import {SNAPSHOT_API_URL} from "~/assets/variables";

const instance = axios.create({
    baseURL: SNAPSHOT_API_URL,
});


export default instance;

