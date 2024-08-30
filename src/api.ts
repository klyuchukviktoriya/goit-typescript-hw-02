import axios from "axios";

const API_KEY = "a7-65JkW6wYXRX_w16CLjwBrow6ShdrnoA933s6cxLE";

axios.defaults.baseURL = "https://api.unsplash.com";
axios.defaults.headers.common["Authorization"] = `Client-ID ${API_KEY}`;
axios.defaults.headers.common["Accept-Version"] = "v1";

type Image = {
    id: string;
    urls: {
        small: string;
        regular: string;
    };
    description: string;
};

type ApiResponse = {
    results: Image[];
    total_pages: number;
};

type ApiRequest = {
    query: string;
    page: number;
};

const getImage = async ({ query, page }: ApiRequest): Promise<ApiResponse> => {
    const response = await axios.get("/search/photos", {
        params: {
            query: query,
            orientation: "landscape",
            per_page: 12,
            page: page,
        },
    });
    return response.data;
};

export default getImage;
