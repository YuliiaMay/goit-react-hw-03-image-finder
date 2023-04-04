import axios from "axios";

const API_KEY = '33500508-b4271a177ba3ac813eaf35292';
axios.defaults.baseURL = "https://pixabay.com/api/";


export async function fetchImages(query, page) {
    try {
        const response = await axios('', {
            params: {
                key: API_KEY,
                q: query,
                page,
                image_type: 'photo',
                orientation: 'horizontal',
                per_page: 4,
            },
        });


        if (response.status === 200) {
            return response;
        }

        return Promise.reject(
            new Error('happened mistake')
        );
    } catch(error) {
        console.log(error.message);
    }

}