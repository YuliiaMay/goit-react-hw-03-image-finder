import axios from "axios";

const API_KEY = '33500508-b4271a177ba3ac813eaf35292';
axios.defaults.baseURL = "https://pixabay.com/api/";


// class ImgApiService {
//     constructor() {
//         this.page = 1;
//         this.query = ''
//     }

//     async fetchImages() {
//         try {
//             const response = await axios('', {
//                 params: {
//                     key: API_KEY,
//                     page,
//                     image_type: 'photo',
//                     orientation: 'horizontal',
//                     per_page: 12,
//                     q: query,
//                 },
//             });

//             this.incrementPage();
//             return response.data.hits;
//         } catch (error) {
//             console.log(error);
//         }
//     }

//     resetPage() {
//         this.page = 1;
//     }

//     incrementPage() {
//         this.page += 1;
//     }

//     get query() {
//         return this.query;
//     }

//     set query(newQuery) {
//         this.query = newQuery;
//     }
// };

// export default {
//     fetchImages,
// };


export async function fetchImages(query, page) {
    try {
        const response = await axios('', {
            params: {
                key: API_KEY,
                q: query,
                page,
                image_type: 'photo',
                orientation: 'horizontal',
                per_page: 12,
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