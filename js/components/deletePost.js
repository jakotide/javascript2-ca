import { postUrl } from "../utilities/consts.js";

async function deletePost(postData) {
    try {
        const token = localStorage.getItem("accessToken");
    const deletePostUrl = `${postUrl}/${postData.id}`;
    const fetchOptions = {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
     };
    const response = await fetch(deletePostUrl, fetchOptions);
    return await response.json();
    } catch(error) {
        console.log(error);
    };
}