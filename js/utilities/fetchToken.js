// const API_BASE_URL = "https://api.noroff.dev";
// const postUrl = `${API_BASE_URL}/api/v1/social/posts`;

// async function fetchToken(url) {
//     try {
//         const token = localStorage.getItem("accessToken")
//         const fetchOption = {
//             method: "GET",
//             headers: {
//                 "Content-Type" : "application/json",
//                 Authorization: `Bearer ${token}`,
//             },
//         };
//         const response = await fetch(url, fetchOption);
//         console.log(response);
//         const json = await response.json();
//         console.log(json);
//     } catch(error) {
//         console.log(error);
//     }
// }

// fetchToken(postUrl);


export async function fetchToken(url) {
    try {
        const token = localStorage.getItem("accessToken");
        const fetchOption = {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        };
        const response = await fetch(url, fetchOption);
        const json = await response.json();
        return json;
    } catch (error) {
        console.log(error);
        throw error; 
    }
}
