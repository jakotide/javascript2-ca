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
};
